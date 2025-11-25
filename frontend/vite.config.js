import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { transformSync } from '@babel/core';

export default defineConfig({
  plugins: [
    react({
      include: ['**/*.js', '**/*.jsx'],
      jsxRuntime: 'automatic',
    }),
    {
      name: 'treat-js-as-jsx',
      transform(code, id) {
        if (id.endsWith('.js')) {
          const result = transformSync(code, {
            presets: ['@babel/preset-react'],
            sourceMaps: true,
            filename: id,
          });
          return {
            code: result.code,
            map: result.map,
          };
        }
      },
    },
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
