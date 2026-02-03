import { describe, it, expect, vi, beforeEach } from 'vitest';
import path from 'node:path';

type Template = { filename: string; getContents: () => Promise<string> | string };
type NuxtLike = { options: { buildDir: string; alias: Record<string, string> } };
type ModuleDef = { setup: (options: unknown, nuxt: NuxtLike) => void };

let capturedTemplate: Template | undefined;

vi.mock('@nuxt/kit', () => ({
  addTemplate: (template: Template) => {
    capturedTemplate = template;
  },
  createResolver: () => ({
    resolve: (...parts: string[]) => path.join(...parts),
  }),
  defineNuxtModule: (moduleDef: unknown) => moduleDef,
  useLogger: () => ({ info: () => {} }),
}));

describe('elements-gen module', () => {
  beforeEach(() => {
    capturedTemplate = undefined;
    vi.resetModules();
  });

  it('elements-gen モジュールは JSON を生成し、#elements を登録する', async () => {
    const mod = await import('./index');
    const moduleDef = mod.default as unknown as ModuleDef;

    const nuxt: NuxtLike = { options: { buildDir: '.nuxt', alias: {} } };
    moduleDef.setup({}, nuxt);

    if (!capturedTemplate) {
      throw new Error('template should be registered');
    }
    expect(capturedTemplate.filename).toBe('elements/elements.generated.json');

    const json = await capturedTemplate.getContents();
    const map = JSON.parse(json);
    expect(map.Lithium).toBe(
      '\u{1D543}\u{1D55A}\u{1D565}\u{1D559}\u{1D55A}\u{1D566}\u{1D55E}',
    );

    expect(nuxt.options.alias['#elements']).toBe(
      path.join('.nuxt', 'elements/elements.generated.json'),
    );
  });
});
