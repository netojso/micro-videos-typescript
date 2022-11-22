import { InvalidUuidError } from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";
import { validate as validateUuid } from "uuid";

describe("UniqueEntityId Unit Test", () => {
  it("should throw error if uuid is invalid", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

    expect(() => new UniqueEntityId("invalid id")).toThrow(
      new InvalidUuidError()
    );
    expect(validateSpy).toHaveBeenCalled();
  });

  test("should pass if uuid is valid", () => {
    const uuid = "f855c9eb-8550-4dea-be4b-e1e7c4596521";
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
  });

  test("should create a valid uuid on constructor", () => {
    const vo = new UniqueEntityId();
    expect(vo.value).not.toBeNull();
    expect(validateUuid(vo.value)).toBeTruthy();
  });
});
