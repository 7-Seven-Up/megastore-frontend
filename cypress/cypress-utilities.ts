export function submitForm() {
  cy.get("button[type='submit']").click();
}

export function fillInput(selector: string, value: string) {
  cy.dataCy(selector).type(value);
}

export function clearAndType(selector: string, value: string) {
  cy.dataCy(selector).clear();
  fillInput(selector, value);
}
