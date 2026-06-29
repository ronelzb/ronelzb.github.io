import { describe, expect, it } from 'vitest';
import type { Element, Properties, Root } from 'hast';
import rehypeEagerImages from '../src/plugins/rehype-eager-images';

function root(...children: Element[]): Root {
  return { type: 'root', children };
}

function el(tag: string, props: Properties = {}, children: Element[] = []): Element {
  return { type: 'element', tagName: tag, properties: { ...props }, children };
}

describe('rehypeEagerImages', () => {
  it('sets loading=eager on a top-level img', () => {
    const tree = root(el('img', { src: '/a.webp', alt: 'cover' }));
    rehypeEagerImages()(tree);
    expect((tree.children[0] as Element).properties?.loading).toBe('eager');
  });

  it('sets loading=eager on a deeply nested img', () => {
    const img = el('img', { src: '/b.webp' });
    const tree = root(el('section', {}, [el('p', {}, [img])]));
    rehypeEagerImages()(tree);
    const section = tree.children[0] as Element;
    const p = section.children[0] as Element;
    expect((p.children[0] as Element).properties?.loading).toBe('eager');
  });

  it('overwrites an existing loading=lazy attribute', () => {
    const tree = root(el('img', { src: '/c.webp', loading: 'lazy' }));
    rehypeEagerImages()(tree);
    expect((tree.children[0] as Element).properties?.loading).toBe('eager');
  });

  it('does not add loading to non-img elements', () => {
    const tree = root(el('div', { class: 'wrapper' }));
    rehypeEagerImages()(tree);
    expect((tree.children[0] as Element).properties?.loading).toBeUndefined();
  });

  it('handles multiple img elements in one tree', () => {
    const tree = root(el('img', { src: '/1.webp' }), el('img', { src: '/2.webp' }));
    rehypeEagerImages()(tree);
    for (const child of tree.children) {
      expect((child as Element).properties?.loading).toBe('eager');
    }
  });

  it('initialises a missing properties object before setting loading', () => {
    const img = {
      type: 'element',
      tagName: 'img',
      properties: undefined,
      children: [],
    } as unknown as Element;
    const tree = root(img);
    expect(() => rehypeEagerImages()(tree)).not.toThrow();
    expect(img.properties?.loading).toBe('eager');
  });
});
