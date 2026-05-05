import { describe, expect, it, vi } from 'vitest';

import * as core from '@actions/core';

import { DEPRECATION_MESSAGE, main } from './index';

vi.mock('@actions/core', () => ({
  setFailed: vi.fn(),
}));

describe('unity-request-activation-file action', () => {
  it('exposes a deprecation message that points users at the updated docs', () => {
    expect(DEPRECATION_MESSAGE).toContain('no longer supported');
    expect(DEPRECATION_MESSAGE).toContain('https://game.ci/docs/github/activation');
  });

  it('calls core.setFailed with the deprecation message when invoked', () => {
    const setFailedSpy = vi.mocked(core.setFailed);
    setFailedSpy.mockClear();
    main();
    expect(setFailedSpy).toHaveBeenCalledTimes(1);
    expect(setFailedSpy).toHaveBeenCalledWith(DEPRECATION_MESSAGE);
  });
});
