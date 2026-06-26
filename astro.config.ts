import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: process.env.SITE_URL,
  vite: {
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
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
