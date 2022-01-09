import * as core from '@actions/core';

import Input from './input';

describe('Input', () => {
  describe('unityVersion', () => {
    it('returns the default value', () => {
      expect(Input.unityVersion).toStrictEqual('2019.2.11f1');
    });

    it('takes input from the users workflow', () => {
      const mockValue = '2020.4.99f9';
      const spy = jest.spyOn(core, 'getInput').mockReturnValue(mockValue);
      expect(Input.unityVersion).toStrictEqual(mockValue);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
