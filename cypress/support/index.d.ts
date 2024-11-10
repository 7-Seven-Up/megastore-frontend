/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(): Chainable<JQuery<HTMLElement>>;
    dataCy(value: string): Chainable<JQuery<HTMLElement>>;
  }
}
