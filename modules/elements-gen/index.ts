import { addTemplate, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';
import { string2DoubleStrucks } from '#root/lib/string2double-struck';
import ELEMENTS from './elements.source';

/**
 * ELEMENTS から「元素名 -> ダブルストラック体」のマップを作成する。
 * @returns 元素名 -> ダブルストラック体 のマップ。
 */
const buildMap = () => {
  if (!Array.isArray(ELEMENTS)) {
    throw new Error(`[elements-gen] ELEMENTS must be an array.`);
  }
  const map: Record<string, string> = {};

  // 配列の各要素を変換してマップへ格納
  for (const [_, name] of ELEMENTS as [string, string][]) {
    const res = string2DoubleStrucks(name);
    if (!res.ok) {
      throw new Error(`[elements-gen] ELEMENTS must be an alphabet!`);
    }
    map[name] = res.value;
  }
  return map;
};

/**
 * Nuxt モジュールとして登録。
 */
export default defineNuxtModule({
  meta: {
    name: 'elements-gen',
    configKey: 'elementsGen',
  },
  defaults: {},
  /**
   * モジュールの初期化処理。
   * @param _ ユーザー設定（未使用）。
   * @param nuxt Nuxt のランタイムコンテキスト。
   */
  setup(_, nuxt) {
    // モジュール用のロガーと resolver を準備
    const logger = useLogger('elements-gen');
    const { resolve } = createResolver(import.meta.url);

    /**
     * ビルド時に JSON を生成して .nuxt 配下へ出力する。
     */
    addTemplate({
      filename: 'elements/elements.generated.json',
      /**
       * 生成する JSON の内容を返す。
       * @returns JSON 文字列。
       */
      getContents: async () => {
        const map = buildMap();
        const json = JSON.stringify(map, null, 2);
        logger.info(`generated JSON: ${Object.keys(map).length} entries`);
        return json;
      },
    });

    // #elements エイリアスで生成済み JSON を参照できるようにする
    nuxt.options.alias = nuxt.options.alias || {};
    nuxt.options.alias['#elements'] = resolve(
      nuxt.options.buildDir,
      'elements/elements.generated.json',
    );
  },
});
