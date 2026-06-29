import type { Element, Root } from 'hast';

// Astro's markdown pipeline defaults all content-collection images to loading="lazy" via
// internal.js (`resolvedOptions.loading ??= "lazy"`). This runs AFTER custom rehype plugins,
// but BEFORE rehype-images.js serialises node.properties into the __ASTRO_IMAGE_ JSON that is
// passed to getImage(). Setting loading="eager" here wins because `??=` only assigns when the
// value is null/undefined — so an explicit "eager" from node.properties is preserved.
// Fixes: Astro Audit "above-fold lazy image" + Chrome/Edge "[Intervention] Images loaded lazily
// and replaced with placeholders" that fire for book-cover and GIF images at the top of posts.
export default function rehypeEagerImages() {
  return function (tree: Root) {
    function walk(node: Root | Element) {
      if (node.type === 'element' && node.tagName === 'img') {
        const el = node;
        if (!el.properties) el.properties = {};
        el.properties['loading'] = 'eager';
      }
      if ('children' in node) {
        for (const child of node.children) {
          walk(child as Root | Element);
        }
      }
    }
    walk(tree);
  };
}
