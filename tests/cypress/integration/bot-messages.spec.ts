describe("Bot messages application", () => {
 before(() => {
  cy.databaseDrop();
  cy.databaseMigrate();
 });

 describe("Register and login", () => {
  beforeEach(() => {
   cy.logoutCurrentUser();
   cy.databaseReset();
  });
  it("Should register user", () => {
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
 });

 describe("Dashboard", () => {
  before(() => {
   cy.databaseReset();
   cy.databaseSeed();
   cy.createUser({
    username: "user-test",
    login: true,
   });
   return cy.visit("/dashboard");
  });

  it("Should first contact", () => {
   cy.contains("Agregar contacto").click();
   cy
    .get("#form-add-contact")
    .within(() => {
     cy
      .findByPlaceholderText("Ingresa el nombre del contacto")
      .type("Quijote de la Mancha");
     cy
      .findByPlaceholderText("Ingresa el teléfono de contacto")
      .type("0000000000");
     return cy.root().submit();
    })
    .then(() => {
     cy.wait(1000);
     cy.contains("Quijote de la Mancha").should("be.visible");
     cy
      .contains(/Este contacto todavía no tiene ningún mensaje/)
      .should("be.visible");
     cy.url().should("to.match", /add-message\?last-created=true/);
    });
  });

  it("Should add message to contact with custom content and select default label `Cordiales`", () => {
   cy.intercept("POST", "/messages/create").as("create-message");
   cy.intercept("POST", "/tags/create").as("create-tag");
   cy.intercept("POST", "/tags/find").as("find-tags");

   cy.get("form").as("form-add-message");

   cy.get("@form-add-message").within(() => {
    cy.contains("Inmediatamente").click();
    return cy.root().submit();
   });

   // Add message content and label
   cy.get("@form-add-message").within(() => {
    cy.contains("Sin etiquetas para mostrar");
    cy.get("textarea").type("This message is for my grandmother");

    cy
     .findByPlaceholderText("Busca alguna etiqueta o crea una nueva")
     .as("input-add-label")
     .type("Cord");

    cy.get("@input-add-label").root().as("root-input-add-label-and-labels");

    cy
     .get("@root-input-add-label-and-labels")
     .find("nav")
     .contains("Cordiales")
     .click();

    return cy.root().submit();
   });

   cy.get("@form-add-message").within(() => {
    cy.contains(/This message is for my grandmother/).should("be.visible");
    cy.contains(/inmediatamente/).should("be.visible");
    return cy.root().submit();
   });
  });
 });
});
