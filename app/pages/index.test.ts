// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';

const makeShoutMock = vi.fn();

vi.mock('#elements', () => ({
  default: {
    H: 'Hydrogen',
    He: 'Helium',
  },
}));

vi.mock('~~/lib/make-shout', () => ({
  makeShout: makeShoutMock,
}));

describe('pages/index.vue', () => {
  const randomSpy = vi.spyOn(Math, 'random');

  beforeEach(() => {
    makeShoutMock.mockReturnValue('SHOUT');
    randomSpy.mockReturnValue(0);
  });

  afterEach(() => {
    makeShoutMock.mockReset();
    randomSpy.mockReset();
  });

  it('textareaにmakeShoutの返り値を表示する', async () => {
    const { default: IndexPage } = await import('./index.vue');
    const wrapper = mount(IndexPage);

    expect(makeShoutMock).toHaveBeenCalledWith('Hydrogen', 1);
    const textarea = wrapper.find('textarea').element as HTMLTextAreaElement;
    expect(textarea.value).toBe('SHOUT');
  });
});
