import ValueObject from "../value-object";

class StubValueObject extends ValueObject {

}

describe('ValueObject Unit Test', () => {
  test('should set value', () => {
    let vo = new StubValueObject('string value')
    expect(vo.value).toBe('string value')

    vo = new StubValueObject({ prop1: 'string value'})
    expect(vo.value).toStrictEqual({prop1: 'string value'})
  })

  test('should convert to a string', () => { 
    const date = new Date()

    const arrange = [
      { value: 'string value', expected: 'string value' },
      { value: { prop1: 'string value' }, expected: '{"prop1":"string value"}' },
      { value: 1, expected: '1' },
      { value: true, expected: 'true' },
      { value: false, expected: 'false' },
      { value: [1, 2, 3], expected: '1,2,3' },
      { value: date, expected: date.toString() },
    ]

    arrange.forEach(({ value, expected }) => {
      const vo = new StubValueObject(value)
      expect(vo.toString()).toBe(expected)
    })
   })

  test('should be a immutable object', () => {
    const obj = { prop1: 'string value', prop2: { prop3: 'string value'} };
    const vo = new StubValueObject(obj);

    expect(() => {
      (vo as any).value.prop1 = 'new value';
    }).toThrowError();

    expect(() => {
      vo.value.prop2.prop3 = 'new value';
    }).toThrowError();
  })

})
