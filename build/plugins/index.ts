import createMpaPlugin from './plugin_mpa';
import viteImagemin from './plugin_imagemin';
import viteRestart from './plugin_restart';

import type { PluginOption } from 'vite';

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: PluginOption[] = [];

  vitePlugins.push(createMpaPlugin());

  if (isBuild) vitePlugins.push(viteImagemin());

  vitePlugins.push(viteRestart());

  return vitePlugins;
}
