/// <reference types="Cypress" />

describe("Authentication", () => {
  it("Returns 401 when credentials are missing", () => {
    cy.request({ url: "/", failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("Returns 401 when credentials are wrong", () => {
    cy.request({
      url: "/",
      failOnStatusCode: false,
      auth: { username: "wronguser", password: "wrongpassword" },
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("Returns 200 when credentials are correct", () => {
    cy.request({
      url: "/",
      auth: { username: "testuser", password: "testpassword" },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Returns 200 for /status even when there are no credentials provided", () => {
    cy.request({
      url: "/status",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
