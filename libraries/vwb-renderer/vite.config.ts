import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { visualizer } from 'rollup-plugin-visualizer';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { builtinModules } from 'node:module';
import { fileURLToPath, URL } from 'node:url';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      outDir: 'types',
    }),
    react({
      jsxRuntime: 'classic',
    }),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        icon: true,
      },
    }),
    AutoImport({
      imports: ['react', 'react-i18next'],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './src/.eslintrc-auto-import.json',
      },
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
          extension: 'jsx',
        }),
      ],
    }),
    Icons({
      // experimental
      autoInstall: true,
      compiler: 'jsx',
      jsx: 'react',
    }),
    visualizer(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@compass-aiden/styles/dist/static/bem.scss";
          @import "src/assets/styles/variables.scss";
        `,
      },
    },
  },
  build: {
    rollupOptions: {
      external: builtinModules.concat(Object.keys(pkg.peerDependencies)),
    },
    lib: {
      entry: path.resolve(__dirname, './src/main.ts'),
      name: 'VWBRenderer',
      fileName: (format) => `vwb-renderer.${format}.js`,
      formats: ['umd', 'es'],
    },
  },
});
