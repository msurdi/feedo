// Custom cypress commands
Cypress.Commands.add("isNotInViewport", { prevSubject: true }, (element) => {
  const message = `Did not expect to find ${element[0].outerHTML} in viewport`;

  cy.get(element).should(($el) => {
    const bottom = Cypress.$(cy.state("window")).height();
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).to.be.greaterThan(bottom, message);
    expect(rect.bottom).to.be.greaterThan(bottom, message);
    expect(rect.top).to.be.greaterThan(bottom, message);
    expect(rect.bottom).to.be.greaterThan(bottom, message);
  });
});

Cypress.Commands.add("isInViewport", { prevSubject: true }, (element) => {
  const message = `Expected to find ${element[0].outerHTML} in viewport`;

  cy.get(element).should(($el) => {
    const bottom = Cypress.$(cy.state("window")).height();
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).not.to.be.greaterThan(bottom, message);
    expect(rect.bottom).not.to.be.greaterThan(bottom, message);
    expect(rect.top).not.to.be.greaterThan(bottom, message);
    expect(rect.bottom).not.to.be.greaterThan(bottom, message);
  });
});
