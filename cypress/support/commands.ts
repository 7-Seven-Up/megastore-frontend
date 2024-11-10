Cypress.Commands.add("login", () => {
  const { BACKEND, USER } = Cypress.env();

  cy.intercept("POST", `${BACKEND.URL}/auth/signin`).as("loginRequest");

  cy.visit("/auth/signin");
  cy.dataCy("username").type(USER.USERNAME);
  cy.dataCy("password").type(USER.PASSWORD);
  cy.get("button[type=submit]").click();

  cy.wait("@loginRequest");
});

Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});
