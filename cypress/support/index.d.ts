/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login({
      username,
      password,
    }: {
      username: string;
      password: string;
    }): Promise<void>;
    dataCy(value: string): Chainable<JQuery<HTMLElement>>;
  }
}
