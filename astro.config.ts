import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import type { Root, Element } from 'hast';

// Astro's markdown pipeline defaults all content-collection images to loading="lazy" via
// internal.js (`resolvedOptions.loading ??= "lazy"`). This runs AFTER custom rehype plugins,
// but BEFORE rehype-images.js serialises node.properties into the __ASTRO_IMAGE_ JSON that is
// passed to getImage(). Setting loading="eager" here wins because `??=` only assigns when the
// value is null/undefined — so an explicit "eager" from node.properties is preserved.
// Fixes: Astro Audit "above-fold lazy image" + Chrome/Edge "[Intervention] Images loaded lazily
// and replaced with placeholders" that fire for book-cover and GIF images at the top of posts.
function rehypeEagerImages() {
  return function (tree: Root) {
    function walk(node: Root | Element) {
      if (node.type === 'element' && (node as Element).tagName === 'img') {
        const el = node as Element;
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

export default defineConfig({
  site: process.env.SITE_URL,
  vite: {
    optimizeDeps: {
      include: ['bootstrap'],
    },
    plugins: [
      {
        name: 'astro-toolbar-virtual-module',
        enforce: 'pre',
        apply: 'serve',
        // Serve astro:toolbar:internal as HTTP middleware because Vite 8's module graph
        // lookup key mismatch ('\0astro:toolbar:internal' vs '/@id/__x00__astro:toolbar:internal')
        // prevents the load hook from being reached via the normal transform pipeline.
        // Workaround: Vite 8 module-graph URL mismatch prevents load hook from firing for this virtual module
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url?.includes('__x00__astro:toolbar:internal')) {
              res.setHeader('Content-Type', 'application/javascript');
              res.end('export const loadDevToolbarApps = async () => [];');
              return;
            }
            next();
          });
        },
        resolveId(id) {
          if (id === 'astro:toolbar:internal') return '\0astro:toolbar:internal';
        },
        load(id) {
          if (id === '\0astro:toolbar:internal') {
            return 'export const loadDevToolbarApps = async () => [];';
          }
        },
      },
    ],
  },
  integrations: [sitemap(), mdx()],
  markdown: {
    processor: unified({ rehypePlugins: [rehypeEagerImages] }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
