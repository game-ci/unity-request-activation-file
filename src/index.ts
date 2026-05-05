import * as core from '@actions/core';

/**
 * The action used to request a Unity manual activation file. It has been
 * replaced by the `unity-activate` action with auto-renewing credentials;
 * see the URL below for migration instructions.
 */
export const DEPRECATION_MESSAGE =
  'This action is no longer supported. Please use the updated activation instructions found at https://game.ci/docs/github/activation';

export const main = (): void => {
  core.setFailed(DEPRECATION_MESSAGE);
};

// Skip auto-run during unit tests; the test calls `main()` directly.
if (process.env.NODE_ENV !== 'test') {
  main();
}
