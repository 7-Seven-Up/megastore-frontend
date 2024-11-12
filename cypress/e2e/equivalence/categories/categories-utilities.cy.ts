export function visitCreateCategoryPage() {
  cy.visit("/admin/categories/create");
}

export function fillCategoryName(name: string) {
  cy.dataCy("category-name").type(name);
}

export function fillCategoryDescription(description: string) {
  cy.dataCy("category-description").type(description);
}

export function submitForm() {
  cy.get("button[type=submit]").click();
}

export function visitCategoriesPage() {
  cy.visit("/admin/categories");
}

export function clearAndType(selector: string, text: string) {
  cy.dataCy(selector).clear();
  cy.dataCy(selector).type(text);
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
