import {
  fillCategoryDescription,
  fillCategoryName,
  visitCreateCategoryPage,
} from "./categories-utilities.cy";

import { submitForm } from "../../../cypress-utilities";

describe("Create category", () => {
  beforeEach(() => {
    cy.login();
    visitCreateCategoryPage();
  });

  it("should display an error if the category name is null", () => {
    submitForm();
    cy.dataCy("category-name").should("have.attr", "aria-invalid", "true");
  });

  it("should display an error message if the category name is one character less than the minimum length", () => {
    fillCategoryName("aa");
    submitForm();

    cy.contains("Name must be at least 3 characters");
  });

  it("should create a new category if the category name is one character more than the minimum length", () => {
    fillCategoryName("aaaa");
    submitForm();

    cy.url().should("include", "/admin/categories");
  });

  it("should create a new category if the category name is one character less than the maximum length", () => {
    fillCategoryName("Ropa de Moda");
    submitForm();

    cy.url().should("include", "/admin/categories");
  });

  it("should show an error if the category name is one character more than the maximum length", () => {
    fillCategoryName("Ropa de Moda Exclusiv");
    submitForm();

    cy.contains("Name must be less than 20 characters");
  });

  it("should create a new category if the category description is one character less than the maximum length", () => {
    fillCategoryName("Ropa de Moda 2");
    fillCategoryDescription("aa");
    submitForm();

    cy.url().should("include", "/admin/categories");
  });

  it("should create a new category if the category description is one character less than the maximum length", () => {
    fillCategoryName("Ropa de Moda 3");
    fillCategoryDescription(
      "Prendas de vestir con diseño exclusivo, comodidad",
    );
    submitForm();

    cy.url().should("include", "/admin/categories");
  });

  it("should show an error if the category description is one character more than the maximum length", () => {
    fillCategoryName("Ropa de Moda 4");
    fillCategoryDescription(
      "Prendas de vestir con diseño exclusivo, comodidad e",
    );
    submitForm();

    cy.contains("Description must be less than 50 characters");
  });
});
