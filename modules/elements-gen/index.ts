// modules/elements-gen/module.ts
import { addTemplate, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';
import { string2DoubleStrucks } from './string2double-struck';
import ELEMENTS from './elements.soruce';

export default defineNuxtModule({
  meta: {
    name: 'elements-gen',
    configKey: 'elementsGen',
  },
  defaults: {},
  setup(_, nuxt) {
    const logger = useLogger('elements-gen');
    const { resolve } = createResolver(import.meta.url);

    const sourcePath = resolve(nuxt.options.rootDir, 'data/elements.source.ts');
    nuxt.options.watch.push(sourcePath);

    const buildMap = async () => {
      if (!Array.isArray(ELEMENTS)) {
        throw new Error(`[elements-gen] ELEMENTS must be an array in ${sourcePath}`);
      }
      const map: Record<string, string> = {};

      for (const [_, name] of ELEMENTS as [string, string][]) {
        const res = string2DoubleStrucks(name);
        if (!res.ok) {
          throw new Error(`[elements-gen] ELEMENTS must be an alphabet! in ${sourcePath}`);
        }
        map[name] = res.value;
      }
      return map;
    };

    // (A) JSON を生成：Vite/Nitro が import 時にバンドルへ埋め込むので「通信不要」
    addTemplate({
      filename: 'elements/elements.generated.json',
      getContents: async () => {
        const map = await buildMap();
        const json = JSON.stringify(map, null, 2);
        logger.info(`generated JSON: ${Object.keys(map).length} entries`);
        return json;
      },
    });

    // 使いやすい import パスを提供（#elements で引けるようにする）
    nuxt.options.alias = nuxt.options.alias || {};
    nuxt.options.alias['#elements'] = resolve(
      nuxt.options.buildDir,
      'elements/elements.generated.json',
    );
  },
});
