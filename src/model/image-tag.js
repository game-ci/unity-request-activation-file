import { trimStart } from 'lodash-es';

class ImageTag {
  constructor({ version }) {
    if (!ImageTag.versionPattern.test(version)) {
      throw new Error(`Invalid version "${version}".`);
    }

    this.repository = 'gableroux';
    this.name = 'unity3d';
    this.version = version;
  }

  static get versionPattern() {
    return /^20\d{2}\.\d\.\w{3,4}|3$/;
  }

  get tag() {
    return this.version;
  }

  get image() {
    return trimStart(`${this.repository}/${this.name}`, '/');
  }

  toString() {
    return `${this.image}:${this.tag}`;
  }
}

export default ImageTag;
