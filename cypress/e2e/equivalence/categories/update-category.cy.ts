import {
  assertCategoryUpdatedSuccessfully,
  clearAndTypeCategoryDescription,
  clearAndTypeCategoryName,
  submitForm,
  visitCategoriesPage,
} from "./categories-utilities.cy";

describe("Update category", () => {
  beforeEach(() => {
    cy.login();
    visitCategoriesPage();
    cy.dataCy("table-edit-button").first().click();
  });

  it("should show an error if the category name is less than three characters", () => {
    clearAndTypeCategoryName("a");
    submitForm();
    cy.contains("Name must be at least 3 characters");
  });

  it("should update the category if the name is more or equal than three characters", () => {
    clearAndTypeCategoryName("aaaa");
    submitForm();
    assertCategoryUpdatedSuccessfully();
  });

  it("should update the category if the name is less or equal than twenty characters", () => {
    clearAndTypeCategoryName("aaaaaaa");
    submitForm();
    assertCategoryUpdatedSuccessfully();
  });

  it("should show an error if the category name is more than twenty characters", () => {
    clearAndTypeCategoryName("aaaaaaaaaaaaaaaaaaaaaaaa");
    submitForm();
    cy.contains("Name must be less than 20 characters");
  });

  it("should update the category if the name is less or equal than fifty characters", () => {
    clearAndTypeCategoryDescription("aaaaaaaaaaaaaaaaaaaaaaaa");
    submitForm();
    assertCategoryUpdatedSuccessfully();
  });

  it("should show an error if the category name is more than fifty characters", () => {
    clearAndTypeCategoryDescription(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    );
    submitForm();
    cy.contains("Description must be less than 50 characters");
  });
});
