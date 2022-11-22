import { deepFreeze } from "./object";

describe('Object Unit Test', () => {
  test('should not freeze if value isnt a object', () => { 
    const value = 1;
    const result = deepFreeze(value);
    expect(result).toBe(value);

    const value2 = 'test';
    const result2 = deepFreeze(value2);
    expect(result2).toBe(value2);

    const value3 = true;
    const result3 = deepFreeze(value3);
    expect(result3).toBe(value3);
    
   })

  test('should must be a immutable object', () => {
    const obj = { prop1: 'string value', prop2: { prop3: 'string value'} };
    const frozenObj = deepFreeze(obj);

    expect(() => {
      (frozenObj as any)['prop1'] = 'new value';
    }).toThrowError();

    expect(() => {
      frozenObj.prop2.prop3 = 'new value';
    }).toThrowError();
  })
})
