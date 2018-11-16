import { workflowFinder, mapValidators } from "../utils";

describe("workflowFinder", () => {
  it("test pass function", () => {
    const mockValues = { field: "10" };
    const mockItem = { values: ["10"], key: "field" };

    const finder = workflowFinder(mockValues, mockItem);
    const fnTest = (values, item) => {
      expect(values).toBe(mockValues);
      expect(item).toMatchObject(mockItem);
    };

    finder(fnTest);
  });

  it("test pass a value", () => {
    const mockValues = { field: "10" };
    const mockItem = { values: ["10"], key: "field" };

    const finder = workflowFinder(mockValues, mockItem);

    expect(finder("10")).toBeTruthy();
  });

  it("test pass a value fail case", () => {
    const mockValues = { field: "10" };
    const mockItem = { values: ["10"], key: "field" };

    const finder = workflowFinder(mockValues, mockItem);

    expect(finder("1")).toBeFalsy();
  });
});

describe("mapValidators", () => {
  it("test pass a function", () => {
    const fn = jest.fn();
    expect(mapValidators({})(fn)).toBe(fn);
  });

  it("test pass an invalid object", () => {
    const mock = {};
    const fn = () => mapValidators({})(mock);
    expect(fn).toThrow("validator must have a prop name");

    mock.name = "test";
    expect(fn).toThrow("validator must have a prop message");

    mock.message = "Error";
    expect(fn).toThrow("the validator named test not exist");
  });

  it("test pass value diferent of object or function", () => {
    const fn = () => mapValidators({})(null);
    expect(fn).toThrow("validator should be a function or object");
  });
});
