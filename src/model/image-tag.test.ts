import ImageTag from './image-tag';

describe('ImageTag', () => {
  describe('constructor', () => {
    const unityVersion = '2020.0.00f0';

    it('can be called', () => {
      expect(() => new ImageTag(unityVersion, '')).not.toThrow();
    });

    test.each(['2000.0.0f0', '2011.1.11f1'])('accepts %p version format', (version) => {
      expect(() => new ImageTag(version, '')).not.toThrow();
    });
  });
  describe('toString', () => {
    it('returns the correct version', () => {
      const image = new ImageTag('2099.1.1111', '');

      expect(image.toString()).toStrictEqual(`unityci/editor:ubuntu-2099.1.1111-linux-il2cpp-1`);
    });
  });
});
