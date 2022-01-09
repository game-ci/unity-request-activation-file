import ImageTag from './image-tag';
import { exec } from '@actions/exec';

const Docker = {
  async build(buildParameters, silent = false) {
    const { path, dockerfile, baseImage } = buildParameters;
    const { version, customImage } = baseImage;

    const tag = new ImageTag(version, customImage);
    const command = `docker build ${path} \
      --file ${dockerfile} \
      --build-arg IMAGE=${baseImage} \
      --tag ${tag}`;

    await exec(command, undefined, { silent });

    return tag;
  },

  async run(image, parameters, silent = false) {
    const { unityVersion, workspace } = parameters;

    const command = `docker run \
        --workdir /github/workspace \
        --rm \
        --env UNITY_VERSION=${unityVersion} \
        --env HOME=/github/home \
        --env GITHUB_REF \
        --env GITHUB_SHA \
        --env GITHUB_REPOSITORY \
        --env GITHUB_ACTOR \
        --env GITHUB_WORKFLOW \
        --env GITHUB_HEAD_REF \
        --env GITHUB_BASE_REF \
        --env GITHUB_EVENT_NAME \
        --env GITHUB_WORKSPACE=/github/workspace \
        --env GITHUB_ACTION \
        --env GITHUB_EVENT_PATH \
        --env RUNNER_OS \
        --env RUNNER_TOOL_CACHE \
        --env RUNNER_TEMP \
        --env RUNNER_WORKSPACE \
        --volume "/var/run/docker.sock":"/var/run/docker.sock" \
        --volume "/home/runner/work/_temp/_github_home":"/github/home" \
        --volume "/home/runner/work/_temp/_github_workflow":"/github/workflow" \
        --volume "${workspace}":"/github/workspace" \
        ${image}`;

    await exec(command, undefined, { silent });
  },
};

export default Docker;
