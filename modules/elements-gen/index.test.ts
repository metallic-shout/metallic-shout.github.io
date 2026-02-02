import assert from 'node:assert/strict';
import test, { mock } from 'node:test';
import path from 'node:path';

type Template = { filename: string; getContents: () => Promise<string> | string };
type NuxtLike = { options: { buildDir: string; alias: Record<string, string> } };
type ModuleDef = { setup: (options: unknown, nuxt: NuxtLike) => void };

test('elements-gen モジュールは JSON を生成し、#elements を登録する', async () => {
  let capturedTemplate: Template | undefined;

  mock.module('@nuxt/kit', {
    namedExports: {
      addTemplate: (template: Template) => {
        capturedTemplate = template;
      },
      createResolver: () => ({
        resolve: (...parts: string[]) => path.join(...parts),
      }),
      defineNuxtModule: (moduleDef: unknown) => moduleDef,
      useLogger: () => ({ info: () => {} }),
    },
  });

  const mod = await import('./index');
  const moduleDef = mod.default as unknown as ModuleDef;

  const nuxt: NuxtLike = { options: { buildDir: '.nuxt', alias: {} } };
  moduleDef.setup({}, nuxt);

  if (!capturedTemplate) {
    throw new Error('template should be registered');
  }
  assert.equal(capturedTemplate.filename, 'elements/elements.generated.json');

  const json = await capturedTemplate.getContents();
  const map = JSON.parse(json);
  assert.equal(map.Lithium, '\u{1D543}\u{1D55A}\u{1D565}\u{1D559}\u{1D55A}\u{1D566}\u{1D55E}');

  assert.equal(
    nuxt.options.alias['#elements'],
    path.join('.nuxt', 'elements/elements.generated.json'),
  );
});
