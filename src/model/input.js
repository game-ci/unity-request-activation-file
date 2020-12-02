const core = require('@actions/core');

class Input {
  static getFromUser() {
    // Input variables specified in workflow using "with" prop.
    const unityVersion = core.getInput('unityVersion') || '2019.2.11f1';
    const customImage = core.getInput('customImage') || '';

    // Return sanitised input
    return {
      unityVersion,
      customImage,
    };
  }
}

export default Input;
