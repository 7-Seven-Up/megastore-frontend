import {
  assertCategoryUpdatedSuccessfully,
  clearAndTypeCategoryDescription,
  clearAndTypeCategoryName,
  fillCategoryDescription,
  fillCategoryName,
} from "../utils/categories.utilities";

import { submitForm } from "../../cypress-utilities";

describe("Update category", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/admin/categories");
    cy.dataCy("table-edit-button").first().click();
  });

  it("should show an error if category name and description are null", () => {
    cy.dataCy("category-name").clear();
    cy.dataCy("category-description").clear();
    submitForm();
    cy.dataCy("category-name").should("have.attr", "aria-invalid", "true");
  });

  it("should show an error if category name is less than three characters and category description is more or equal than fifty characters", () => {
    clearAndTypeCategoryName("aa");
    clearAndTypeCategoryDescription("aa");
    submitForm();
    cy.contains("Name must be at least 3 characters");
  });

  it("should show an error if category name is less than three characters and category description is more than fifty characters", () => {
    clearAndTypeCategoryName("aa");
    clearAndTypeCategoryDescription(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    );
    submitForm();
    cy.contains("Name must be at least 3 characters");
    cy.contains("Description must be less than 50 characters");
  });

  it("should update the category if name is between three and twenty characters and description is more or equal than fifty characters", () => {
    clearAndTypeCategoryName("Category 1");
    clearAndTypeCategoryDescription("aaaa");
    submitForm();
    assertCategoryUpdatedSuccessfully();
  });

  it("should show an error if the category name is between three and twenty characters and description is more than fifty characters", () => {
    clearAndTypeCategoryName("Category 2");
    clearAndTypeCategoryDescription(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    );
    submitForm();
    cy.contains("Description must be less than 50 characters");
  });

  it("should show an error if the category name is more than twenty characters and description is less or equal than fifty characters", () => {
    fillCategoryName("aaaaaaaaaaaaaaaaaaaaaa");
    fillCategoryDescription("aaaa");
    submitForm();
    cy.contains("Name must be less than 20 characters");
  });

  it("should show an error if the category name is more than twenty characters and description is more than fifty characters", () => {
    fillCategoryName("aaaaaaaaaaaaaaaaaaaaaa");
    fillCategoryDescription(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    );
    submitForm();
    cy.contains("Name must be less than 20 characters");
    cy.contains("Description must be less than 50 characters");
  });
});
