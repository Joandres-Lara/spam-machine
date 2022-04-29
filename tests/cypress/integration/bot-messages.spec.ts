describe("Bot messages application", () => {

 before(() => {
  cy.databaseReset();
  cy.databaseMigrate();
 });
 it("Should register user", () => {
  cy.visit("/register");
  cy.get("form").within(() => {
   cy.findByPlaceholderText("Ingresa un usuario").type("test-user");
   cy.findByPlaceholderText("Ingresa tu contraseña").type("secret");
   cy.findByPlaceholderText("Repite la contraseña de arriba").type("secret");
   cy.root().submit().then(() => {
    cy.url().should("to.match", /dashboard/);
   });
  });
 });
});
