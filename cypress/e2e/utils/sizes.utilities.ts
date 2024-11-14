import { clearAndType, fillInput } from "../../cypress-utilities";

export function fillSizeName(name: string) {
  fillInput("size-name", name);
}

export function fillSizeDescription(description: string) {
  fillInput("size-description", description);
}

export function assertSizeCreatedSuccessfully() {
  cy.url().should("include", "/admin/sizes");
}

export function assertSizeUpdatedSuccessfully() {
  cy.url().should("include", "/admin/sizes");
}

export function visitSizesPage() {
  cy.visit("/admin/sizes");
}

export function visitCreateSizePage() {
  cy.visit("/admin/sizes/create");
}

export function clearAndTypeSizeName(name: string) {
  clearAndType("size-name", name);
}

export function clearAndTypeSizeDescription(description: string) {
  clearAndType("size-description", description);
}
