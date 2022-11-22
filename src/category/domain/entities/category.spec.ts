import { omit } from "lodash";
import { Category, CategoryProps } from "./category";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

describe("Category Unit Test", () => {
  test("should create a constructor of category", () => {
    let category = new Category({ name: "Movie" });

    const props = omit(category.props, "created_at");

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });

    expect(category.props.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
    });

    let created_at = new Date();

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "another description",
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      description: "another description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("id field", () => {
    type CategoryMockData = {
      props: CategoryProps;
      id?: UniqueEntityId;
    };

    const mockData: CategoryMockData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    mockData.forEach(({ props, id }) => {
      const category = new Category(props, id);
      expect(category.id).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter an setter of name prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");

    category["name"] = "Movie 2";
    expect(category.name).toBe("Movie 2");
  });

  test("getter and setter of description prop", () => {
    let category = new Category({
      name: "Movie",
      description: "some description",
    });
    expect(category.description).toBe("some description");

    category = new Category({ name: "Movie" });

    category["description"] = "another description";
    expect(category.description).toBe("another description");

    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["description"] = null;
    expect(category.description).toBeNull();
  });

  test("getter and setter is_active field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();
  });

  test('should activate a category', () => { 
    const category = new Category({ name: 'Movie' });
    category.activate();
    expect(category.is_active).toBeTruthy();
   })

  test('should deactivate a category', () => {
    const category = new Category({ name: 'Movie' });
    category.deactivate();
    expect(category.is_active).toBeFalsy();
  })

  test("getter of created_at prop", () => {
    let category = new Category({ name: "Movie" });

    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();

    category = new Category({ name: "Movie", created_at });

    expect(category.created_at).toEqual(created_at);
  });

  test('should update a category', () => { 
    const category = new Category({ name: 'Movie' });
    category.update('Movie 2', 'some description');

    expect(category.name).toBe('Movie 2');
    expect(category.description).toBe('some description');
   })
});
