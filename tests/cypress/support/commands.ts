import "@testing-library/cypress/add-commands";

declare global {
 // eslint-disable-next-line @typescript-eslint/no-namespace
 namespace Cypress {
  interface Chainable {
   databaseMigrate(): Cypress.Chainable;

   databaseDrop(): Cypress.Chainable;

   databaseReset(): Cypress.Chainable;

   databaseSeed(): Cypress.Chainable;

   logoutCurrentUser(): Cypress.Chainable;

   loginUser(user?: {
    username: string;
    password: string;
   }): Cypress.Chainable<{ authenticated: boolean }>;

   createUser(config: {
    username: string;
    password?: string;
    login?: boolean;
   }): Cypress.Chainable<{ username: string; password: string }>;
  }
 }
}

Cypress.Commands.add("databaseMigrate", () => {
 return cy.exec("npm run db:migrate -w src/database-server");
});

Cypress.Commands.add("databaseDrop", () => {
 return cy.exec("npm run db:drop -w src/database-server");
});

Cypress.Commands.add("databaseReset", () => {
 return cy.exec("npm run db:reset -w src/database-server");
});

Cypress.Commands.add("databaseSeed", () => {
 return cy.exec("npm run db:seed:all -w src/database-server");
});

Cypress.Commands.add("logoutCurrentUser", () => {
 return cy.request({
  url: "/api/auth/logout",
  method: "POST",
  log: false,
  followRedirect: false,
 });
});

Cypress.Commands.add("loginUser", (user) => {
 const { username, password } = user;

 return cy
  .request({
   url: "/api/auth/login",
   body: {
    username,
    password,
   },
   log: false,
  })
  .then((response) => {
   if (response.status === 200) {
    return { authenticated: true };
   }
   cy.log(
    `Sorry but can't authenticated user with credentials ${JSON.stringify({
     username,
     password,
    })}`
   );
   return { authenticated: false };
  });
});

Cypress.Commands.add(
 "createUser",
 ({ username, password = "secret", login = false }) => {
  const user = { username, password };
  // Register user and logout by create new session
  Cypress.log({
   message: `Creating user with ${JSON.stringify(user)}`,
  });

  const logCreatedUser = Cypress.log({
   end: false,
   message: `Created user with ${JSON.stringify(user)}`,
  });

  return cy
   .request({
    url: "/api/auth/register",
    followRedirect: false,
    log: false,
    method: "POST",
    body: {
     username,
     password,
     password_confirm: password,
    },
   })
   .then(() => cy.logoutCurrentUser())
   .then(() => {
    if (login) return cy.loginUser({ username, password });
    return true;
   })
   .then(() => {
    logCreatedUser.end();
    return user;
   });
 }
);
