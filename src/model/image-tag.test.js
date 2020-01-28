import ImageTag from './image-tag';

describe('UnityImageVersion', () => {
  describe('constructor', () => {
    const some = {
      version: '2020.0.00f0',
    };

    it('can be called', () => {
      expect(() => new ImageTag(some)).not.toThrow();
    });

    it('accepts parameters and sets the right properties', () => {
      const image = new ImageTag(some);

      expect(image.repository).toStrictEqual('gableroux');
      expect(image.name).toStrictEqual('unity3d');
      expect(image.version).toStrictEqual(some.version);
    });

    test.each(['2000.0.0f0', '2011.1.11f1'])('accepts %p version format', version => {
      expect(() => new ImageTag({ version })).not.toThrow();
    });

    test.each(['some version', '', 1, null])('throws for incorrect versions %p', version => {
      expect(() => new ImageTag({ version })).toThrow();
    });
  });

  describe('toString', () => {
    it('returns the correct version', () => {
      const image = new ImageTag({ version: '2099.1.1111' });

      expect(image.toString()).toStrictEqual(`gableroux/unity3d:2099.1.1111`);
    });
  });
});
