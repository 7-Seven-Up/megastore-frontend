import {
  assertSizeUpdatedSuccessfully,
  clearAndTypeSizeDescription,
  clearAndTypeSizeName,
  visitSizesPage,
} from "../../utils/sizes.utilities";

import { submitForm } from "../../../cypress-utilities";

describe("Update size", () => {
  beforeEach(() => {
    cy.login();
    visitSizesPage();
    cy.dataCy("table-edit-button").first().click();
  });

  it("should show an error if size name is less than one character", () => {
    cy.dataCy("size-name").clear();
    submitForm();
    cy.dataCy("size-name").should("have.attr", "aria-invalid", "true");
  });

  it("should update the size if name is more or equal than one character", () => {
    clearAndTypeSizeName("aaa");
    submitForm();
    assertSizeUpdatedSuccessfully();
  });

  it("should update the size if name is more or equal than twenty characters", () => {
    clearAndTypeSizeName("aaaaaaa");
    submitForm();
    assertSizeUpdatedSuccessfully();
  });

  it("should show an error if the size description is less than five characters", () => {
    clearAndTypeSizeDescription("aa");
    submitForm();
    cy.contains("Description must be at least 5 characters");
  });

  it("should update the size if description is more or equal than five characters", () => {
    clearAndTypeSizeDescription("aaaaaaaaaaaaaaaaaaaaaaaa");
    submitForm();
    assertSizeUpdatedSuccessfully();
  });

  it.only("should show an error if the size description is more than fifty characters", () => {
    clearAndTypeSizeDescription(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    );
    submitForm();
    cy.contains("Description must be less than 50 characters");
  });
});
