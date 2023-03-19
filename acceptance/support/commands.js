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

Cypress.Commands.add("isInViewport", { prevSubject: true }, (subject) => {
  const windowInnerWidth = Cypress.config(`viewportWidth`);
  const windowInnerHeight = Cypress.config(`viewportHeight`);

  const bounding = subject[0].getBoundingClientRect();

  const rightBoundOfWindow = windowInnerWidth;
  const bottomBoundOfWindow = windowInnerHeight;

  expect(bounding.top).to.be.at.least(0);
  expect(bounding.left).to.be.at.least(0);
  expect(bounding.right).to.be.lessThan(rightBoundOfWindow);
  expect(bounding.bottom).to.be.lessThan(bottomBoundOfWindow);

  return subject;
});
