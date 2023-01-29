/// <reference types="Cypress" />

describe("Home view", () => {
  beforeEach(() => {
    cy.visit("/", {
      auth: {
        username: "testuser",
        password: "testpassword",
      },
    });
  });

  it("Shows application name", () => {
    cy.contains("Feedo");
  });
});
