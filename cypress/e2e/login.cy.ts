describe("Login Page", () => {
  xit("should authenticate on PersonAut", () => {
    cy.visit("http://localhost:3000");

    cy.get("#email-input").type("usuario2@hotmail.com");
    cy.get("#email-input").should("have.value", "usuario2@hotmail.com");

    cy.get("#outlined-adornment-password").type("asdqwe123");
    cy.get("#outlined-adornment-password").should("have.value", "asdqwe123");

    cy.get("#logar-button").click();

    cy.get("#loading-modal").should("exist");

    cy.url().should("not.contain", "/login");
  });

  xit('should navigate to "Sign Up" page', () => {
    cy.visit("http://localhost:3000");

    cy.get("#sem-conta-button").click();

    cy.url().should("include", "/signup");
  });

  xit('should navigate to "Forgot Password" page', () => {
    cy.visit("http://localhost:3000");

    cy.get("#esqueci-senha-button").click();

    cy.url().should("include", "/forgot-password");
  });
});
