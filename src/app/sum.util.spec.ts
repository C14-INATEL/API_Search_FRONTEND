import { sum } from './sum.util';

describe('Sum Util', () => {

  it('should sum two numbers', () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
  });

});