describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('Login from shown', function () {
    cy.contains('Login to Application');
    cy.get('#username').parent().should('contain', 'username');
    cy.get('#password').parent().should('contain', 'password');
    cy.get('#login-button').contains('Login');
  });
});
