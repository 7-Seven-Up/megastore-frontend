import { clearAndType, fillInput } from "../../../cypress-utilities";

export function visitCreateCategoryPage() {
  cy.visit("/admin/categories/create");
}

export function visitCategoriesPage() {
  cy.visit("/admin/categories");
}

export function fillCategoryName(name: string) {
  fillInput("category-name", name);
}

export function fillCategoryDescription(description: string) {
  fillInput("category-description", description);
}

export function clearAndTypeCategoryName(name: string) {
  clearAndType("category-name", name);
}

export function clearAndTypeCategoryDescription(description: string) {
  clearAndType("category-description", description);
}

export function assertCategoryUpdatedSuccessfully() {
  cy.url().should("include", "/admin/categories");
}
