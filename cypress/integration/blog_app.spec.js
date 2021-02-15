describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'iamismile',
      name: 'Ismile Hossain',
      password: 'sekret',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login from shown', function () {
    cy.contains('Login to Application');
    cy.get('#username').parent().should('contain', 'username');
    cy.get('#password').parent().should('contain', 'password');
    cy.get('#login-button').contains('Login');
  });

  describe('Login', function () {
    it('succeds with correct credentials', function () {
      cy.get('#username').type('iamismile');
      cy.get('#password').type('sekret');
      cy.get('#login-button').click();
      cy.contains('Ismile Hossain is logged-in');
    });

    it('fails with worng credentials', function () {
      cy.get('#username').type('iamismile');
      cy.get('#password').type('wrong-credentials');
      cy.get('#login-button').click();
      cy.get('.error').should('contain', 'Wrong Credentials');
    });
  });
});
