import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  /**
   * dev -> mode_development -> command_serve // 默认
   * build -> mode_production -> command_build // 默认
   * mock -> mode_mock -> command_serve
   */
   console.log('command <-> mode', command, '<->', mode);

  const {
    VITE_APP_PUBLIC_PATH,
    VITE_APP_BASE_API,
    VITE_APP_BUILD_BASE_API
  } = loadEnv(
    mode,
    process.cwd(),
  );
  const VITE_APP_IS_SERVE = command === 'serve';

  function disModeConfig(mode, config) {
    if (mode === 'development') {
      config.server.proxy = {
        [VITE_APP_BASE_API]: {
          target: VITE_APP_BUILD_BASE_API,
          changeOrigin: true,
          rewrite: (url) => url.replace(new RegExp(`^${VITE_APP_BASE_API}`), '')
        }
      };
    } else if (mode === 'mock') { // mock -> mockPlugins
      const prodMock = true;
      config.plugins.push(
        viteMockServe({
          supportTs: false,
          mockPath: 'mock',
          localEnabled: command === 'serve',
          prodEnabled: command !== 'serve' && prodMock,
          injectCode: `
            import { setupProdMockServer } from './mockProdServer';
            setupProdMockServer();
          `
        })
      );
    }
    // prod -> 开发机配置代理
  };

  const configMode = {
    base: VITE_APP_IS_SERVE ? './' : VITE_APP_PUBLIC_PATH,
    plugins: [
      vue()
    ],
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
    define: {
      VITE_APP_IS_SERVE
    },
    server: {
      // host: '',
      port: 3331,
      open: true
    },
    build: {
      outDir: mode === 'build_prod' ? '../server/frontend' : 'dist'
    }
  };
  disModeConfig(mode, configMode);

  return configMode;
});
