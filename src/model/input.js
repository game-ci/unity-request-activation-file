const core = require('@actions/core');

class Input {
  static getFromUser() {
    // Input variables specified in workflow using "with" prop.
    const unityVersion = core.getInput('unityVersion') || '2019.2.11f1';

    // Return sanitised input
    return {
      unityVersion,
    };
  }
}

export default Input;
