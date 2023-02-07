/// <reference types="Cypress" />

describe("Authentication", () => {
  it("Returns 401 when credentials are missing", () => {
    cy.request({ url: "/", failOnStatusCode: false })
      .its("status")
      .should("eq", 401);
  });

  it("Returns 401 when credentials are wrong", () => {
    cy.request({
      url: "/",
      failOnStatusCode: false,
      auth: { username: "wronguser", password: "wrongpassword" },
    })
      .its("status")
      .should("eq", 401);
  });

  it("Returns 200 when credentials are correct", () => {
    cy.request({
      url: "/",
      auth: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
    })
      .its("status")
      .should("eq", 200);
  });

  it("Returns 200 for /status even when there are no credentials provided", () => {
    cy.request({
      url: "/status",
    })
      .its("status")
      .should("eq", 200);
  });
});
