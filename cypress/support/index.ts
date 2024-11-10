import { mount } from "cypress/react18";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
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
}
