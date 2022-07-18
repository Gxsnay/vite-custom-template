import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const {
    VITE_APP_PUBLIC_PATH,
    VITE_APP_BASE_API,
    VITE_APP_BUILD_BASE_API
  } = loadEnv(
    mode,
    process.cwd(),
  );
  const VITE_APP_IS_SERVE = command === 'serve';

  return {
    base: VITE_APP_IS_SERVE ? './' : VITE_APP_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'c@': path.resolve(__dirname, 'src/components'),
        'a@': path.resolve(__dirname, 'src/apis'),
        'v@': path.resolve(__dirname, 'src/views'),
        'u@': path.resolve(__dirname, 'src/utils'),
        's@': path.resolve(__dirname, 'src/styles'),
        'r@': path.resolve(__dirname, 'src/router'),
        'x@': path.resolve(__dirname, 'src/store'),
        't@': path.resolve(__dirname, 'src/types'),
        'h@': path.resolve(__dirname, 'src/hooks'),
        'm@': path.resolve(__dirname, 'mock'),
      },
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
    },
    plugins: [vue()],
    server: {
      // host: '',
      port: 3331,
      open: true,
      proxy: {
        [VITE_APP_BASE_API]: {
          target: VITE_APP_BUILD_BASE_API,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(new RegExp(`^${VITE_APP_BASE_API}`), ''),
        },
      },
    },
  }
});
