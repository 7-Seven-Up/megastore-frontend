import {
  assertCategoryCreatedSuccessfully,
  fillCategoryDescription,
  fillCategoryName,
} from "../utils/categories.utilities";

import { submitForm } from "../../cypress-utilities";

describe("Create category", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/admin/categories/create");
  });

  it("should show an error if the category name and description are null", () => {
    submitForm();
    cy.dataCy("category-name").should("have.attr", "aria-invalid", "true");
  });

  it("should show an error if category name is less than three characters and description is more or equal than fifty characters", () => {
    fillCategoryName("aa");
    fillCategoryDescription("aa");
    submitForm();
    cy.contains("Name must be at least 3 characters");
  });

  it("should show an error if category name is less than three characters and description is more than fifty characters", () => {
    fillCategoryName("aa");
    fillCategoryDescription(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    );
    submitForm();
    cy.contains("Name must be at least 3 characters");
    cy.contains("Description must be less than 50 characters");
  });

  it("should show an error if category name is between three and twenty characters and description is more or equal than fifty characters", () => {
    fillCategoryName("aaa");
    fillCategoryDescription(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    );
    submitForm();
    cy.contains("Description must be less than 50 characters");
  });

  it("should create a category if name is between three and twenty characters and description is less or equal than fifty characters", () => {
    fillCategoryName("aaaa");
    fillCategoryDescription("aaaa");
    assertCategoryCreatedSuccessfully();
  });

  it("should show an error if category name is between three and twenty characters and description is more than fifty characters", () => {
    fillCategoryName("aaa");
    fillCategoryDescription(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    );
    submitForm();
    cy.contains("Description must be less than 50 characters");
  });

  it("should show an error if the category name is between three and twenty characters and description is more than fifty characters", () => {
    fillCategoryName("aaaa");
    fillCategoryDescription(
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

  it("should show an error if the category name is more than twenty characters and description is less than fifty characters", () => {
    fillCategoryName("aaaaaaaaaaaaaaaaaaaaaa");
    fillCategoryDescription(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    );
    submitForm();
    cy.contains("Name must be less than 20 characters");
  });
});
