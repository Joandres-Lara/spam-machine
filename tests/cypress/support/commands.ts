import "@testing-library/cypress/add-commands";

declare global {
 // eslint-disable-next-line @typescript-eslint/no-namespace
 namespace Cypress {
  interface Chainable {
   databaseMigrate(): void;
   databaseReset(): void;
  }
 }
}

Cypress.Commands.add("databaseMigrate", () => {
 return cy.exec("npm run db:migrate -w src/graphql-server");
});

Cypress.Commands.add("databaseReset", () => {
 return cy.exec("npm run db:reset -w src/graphql-server");
});
