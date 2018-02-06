import { getSrcSetString } from './pic';

describe('pic', () => {
  describe('getSrcSetString', () => {
    it('should return valid src set string for valid prototype', () => {
      const string = getSrcSetString([
        ['https://example.com/base.jpg', '1x'],
        ['https://example.com/big.jpg', '2x'],
      ]);

      expect(string).toEqual('https://example.com/base.jpg 1x, https://example.com/big.jpg 2x');
    });
  });
});
