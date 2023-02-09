/// <reference types="Cypress" />

describe("Home view", () => {
  beforeEach(() => {
    cy.visit("/", {
      auth: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
    });
  });

  it("Shows application name", () => {
    cy.contains("Feedo");
  });
});
