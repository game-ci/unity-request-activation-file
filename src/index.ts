import * as core from '@actions/core';
import { Action, Docker, ImageTag, Input } from './model';

async function run() {
  try {
    Action.checkCompatibility();

    const { dockerfile, workspace, actionFolder } = Action;
    const unityVersion = Input.unityVersion;
    const baseImage = new ImageTag(unityVersion, Input.customImage);

    // Build docker image
    const actionImage = await Docker.build({ path: actionFolder, dockerfile, baseImage });

    // Run docker image
    await Docker.run(actionImage, { workspace, unityVersion });
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
