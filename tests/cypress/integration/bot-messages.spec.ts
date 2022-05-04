describe("Bot messages application", () => {
 before(() => {
  cy.databaseDrop();
  cy.databaseMigrate();
 });

 it("Should register user", () => {
  cy.logoutCurrentUser();
  cy.databaseReset();
  cy.databaseSeed();

  cy.visit("/register");
  cy.get("form").within(() => {
   cy.findByPlaceholderText("Ingresa un usuario").type("test-user");
   cy.findByPlaceholderText("Ingresa tu contraseña").type("secret");
   cy.findByPlaceholderText("Repite la contraseña de arriba").type("secret");
   cy
    .root()
    .submit()
    .then(() => {
     cy.wait(2000);
     cy.url().should("to.match", /dashboard/);
    });
  });
 });

 it("Should login user", () => {
  cy.logoutCurrentUser();
  cy.databaseReset();
  cy.databaseSeed();

  cy
   .createUser({
    username: "one-user",
    password: "secret-password",
   })
   .then(() => {
    cy.visit("/signin");
    cy.get("form").within(() => {
     cy.findByPlaceholderText("Ingresa tu usuario").type("one-user");
     cy.findByPlaceholderText("Ingresa tu contraseña").type("secret-password");

     cy
      .root()
      .submit()
      .then(() => {
       cy.url().should("to.match", /dashboard/);
      });
    });
   });
 });

 /**
  *
  * This no reset database.
  */

 it("Should first contact", () => {
  cy.createUser({
   username: "test-user",
   login: true
  }).then(() => {
   cy.visit("/dashboard");
   cy.contains("Agregar contacto").click();
   cy.get("#form-add-contact").within(() => {
    cy.findByPlaceholderText("Ingresa el nombre del contacto").type("Quijote de la Mancha");
    cy.findByPlaceholderText("Ingresa el teléfono de contacto").type("0000000000");
    return cy.root().submit();
   }).then(() => {
    cy.contains("Quijote de la Mancha").should("be.visible");
    cy.url().should("to.match", /add-message\?last-created=true/);
   });
  });
 });

 it("Should add message to contact", () => {
 });
});
