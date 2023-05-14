import createMpaPlugin from "./plugin_mpa";

import type { PluginOption } from "vite";

const plugins: PluginOption[] = [createMpaPlugin()];

export { plugins };
