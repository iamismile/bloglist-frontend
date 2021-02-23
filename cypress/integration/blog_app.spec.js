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

  describe.only('When logged in', function () {
    beforeEach(function () {
      // cy.get('#username').type('iamismile');
      // cy.get('#password').type('sekret');
      // cy.get('#login-button').click();
      // cy.contains('Ismile Hossain is logged-in');

      // cy.request('POST', 'http://localhost:3003/api/login', {
      //   username: 'iamismile',
      //   password: 'sekret',
      // }).then((response) => {
      //   localStorage.setItem('loggedUser', JSON.stringify(response.body));
      //   cy.visit('http://localhost:3000');
      // });

      cy.login({ username: 'iamismile', password: 'sekret' });
    });

    it('A blog can be created', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type('Cypress Test');
      cy.get('#author').type('Test Author');
      cy.get('#url').type('http://cypress.com');
      cy.get('#btn-create').click();
      cy.get('.success').should(
        'contain',
        'A new blog "Cypress Test" by Test Author added'
      );
    });

    describe('When a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'First blog',
          author: 'Anonymous 1',
          url: 'https://google.com',
          likes: 10,
        });
        cy.createBlog({
          title: 'Second blog',
          author: 'Anonymous 2',
          url: 'https://google.com',
          likes: 20,
        });
        cy.createBlog({
          title: 'Third blog',
          author: 'Anonymous 3',
          url: 'https://google.com',
          likes: 30,
        });
      });

      it('user can like a blog', function () {
        cy.contains('First blog').find('button').click();
        cy.contains('First blog')
          .parent()
          .find('.likes')
          .find('button')
          .click();
      });
    });
  });
});
