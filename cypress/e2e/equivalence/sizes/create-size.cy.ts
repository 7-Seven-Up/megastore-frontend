import {
  assertSizeCreatedSuccessfully,
  fillSizeDescription,
  fillSizeName,
  visitCreateSizePage,
} from "./sizes.utilities.cy";

import { submitForm } from "../../../cypress-utilities";

describe("Create size", () => {
  beforeEach(() => {
    cy.login();
    visitCreateSizePage();
  });

  it("should show an error if size name is less than one character", () => {
    submitForm();
    cy.dataCy("size-name").should("have.attr", "aria-invalid", "true");
  });

  it("should create a size if name is more or equal than one character", () => {
    fillSizeName("aaa");
    submitForm();
    assertSizeCreatedSuccessfully();
  });

  it("should create a size if name is less or equal than twenty characters", () => {
    fillSizeName("aaaaaaa");
    submitForm();
    assertSizeCreatedSuccessfully();
  });

  it("should show an error if size name is more than twenty characters", () => {
    fillSizeName("aaaaaaaaaaaaaaaaaaaaaaaa");
    submitForm();
    cy.contains("Name must be less than 20 character");
  });

  it("should create a size if description is more or equal than five characters", () => {
    fillSizeName("aaaa");
    fillSizeDescription("aaaaaaaaaaaaaaaaaaaaaaaa");
    submitForm();
    assertSizeCreatedSuccessfully();
  });

  it("should create a size if description is les or equal than fifty characters", () => {
    fillSizeName("aaaaa");
    fillSizeDescription("aaaaaaaaaaaaaaaaaaaaaaaa");
    submitForm();
    assertSizeCreatedSuccessfully();
  });

  it("should show an error if size description is more than fifty characters", () => {
    fillSizeName("aaaaaa");
    fillSizeDescription(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    );
    submitForm();
    cy.contains("Description must be less than 50 characters");
  });
});
