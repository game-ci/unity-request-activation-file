import * as core from '@actions/core';

import Input from './input';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Input', () => {
  describe('getFromUser', () => {
    it('does not throw', () => {
      expect(() => Input.getFromUser()).not.toThrow();
    });

    it('returns an object', () => {
      expect(typeof Input.getFromUser()).toStrictEqual('object');
    });
  });

  describe('unityVersion', () => {
    it('returns the default value', () => {
      expect(Input.getFromUser().unityVersion).toStrictEqual('2019.2.11f1');
    });

    it('takes input from the users workflow', () => {
      const mockValue = '2020.4.99f9';
      jest.spyOn(core, 'getInput').mockReturnValue(mockValue);
      expect(Input.getFromUser().unityVersion).toStrictEqual(mockValue);
    });
  });
  describe('customImage', () => {
    it('returns the default value', () => {
      expect(Input.getFromUser().customImage).toStrictEqual('');
    });

    it('takes input from the users workflow', () => {
      const mockValue = 'owner/image:2020.4.99f9';
      jest.spyOn(core, 'getInput').mockReturnValue(mockValue);
      expect(Input.getFromUser().customImage).toStrictEqual(mockValue);
    });
  });
});
