import { forIn } from 'lodash';
import path from 'path-browserify';
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

const mockModulesImport = import.meta.globEager('../mock/*.js');
const mockModel = {};
function mockFiles() {
  for (const itemPath in mockModulesImport) {
    const name = path.basename(itemPath, '.js');
    if (name === 'index') return;
    const { default: itemModel = {} } = mockModulesImport[itemPath];
    mockModel[name] = itemModel;
  }
}
mockFiles();

export function setupProdMockServer() {
  let mockList: any[] = [];
  forIn(mockModel, (value) => {
    mockList = [...mockList, ...value];
  });
  createProdMockServer(mockList);
}
