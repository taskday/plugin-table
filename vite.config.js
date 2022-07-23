import { defineConfig } from "vite";
import path from "path";
import { viteExternalsPlugin } from "vite-plugin-externals";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'resources/js/plugin.ts'),
      name: 'plugin-table',
      formats: ['esm'],
    },
    // rollupOptions: {
    //   // make sure to externalize deps that shouldn't be bundled
    //   // into your library
    //   external: ['vue'],
    //   output: {
    //     // Provide global variables to use in the UMD build
    //     // for externalized deps
    //     globals: {
    //       vue: 'Vue'
    //     }
    //   }
    // },
    minify: 'esbuild',
  },
  plugins: [
    vue(),
    vueJsx(),
    viteExternalsPlugin({
      taskday: "Components",
      vue: "Vue",
    }),
  ]
});
