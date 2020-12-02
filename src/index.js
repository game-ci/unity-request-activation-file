import { Action, Docker, Input, ImageTag } from './model';

const core = require('@actions/core');

async function action() {
  Action.checkCompatibility();

  const { dockerfile, workspace, actionFolder } = Action;
  const { unityVersion, customImage } = Input.getFromUser();
  const baseImage = ImageTag.createForBase({ version: unityVersion, customImage });

  // Build docker image
  const actionImage = await Docker.build({ path: actionFolder, dockerfile, baseImage });

  // Run docker image
  await Docker.run(actionImage, { workspace, unityVersion });
}

action().catch(error => {
  core.setFailed(error.message);
});
