import axios from "axios";

import { useAuthStore } from "../../src/modules/auth/hooks/useAuthStore";

Cypress.Commands.add("login", async ({ username, password }) => {
  const authStore = useAuthStore.getState();

  async function login() {
    const response = await axios.post(
      "http://localhost:8080/auth/signin",
      null,
      {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      },
    );

    authStore.login(response.data);
  }

  return await login();
});

Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});
