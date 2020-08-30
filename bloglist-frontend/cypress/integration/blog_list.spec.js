describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'Test',
      password: '1234',
      name: 'Tester',
    });
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function() {
    cy.contains('Log in to Application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('Login');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Test');
      cy.get('#password').type('1234');
      cy.contains('Login').click();

      cy.get('.success').should('contain', 'Successfully signed in');
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('failure with wrong credentials', function() {
      cy.get('#username').type('Test1');
      cy.get('#password').type('12345');
      cy.contains('Login').click();

      cy.get('.warning').should('contain', 'Invalid username or password');
      cy.get('.warning').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'Test',
        password: '1234'
      }).then((res) => {
        window.localStorage.setItem('localBloggAppUser', JSON.stringify(res.body));
      });

      cy.visit('http://localhost:3000');
    });

    it.only('A blog can be created', function() {
      cy.contains('create a new blog').click();
      cy.get('#title').type('Test Blog');
      cy.get('#author').type('Me');
      cy.get('#url').type('Test.com');
      cy.get('#blog-create-button').click();
      cy.contains('Test Blog Me');
    });

    // describe('With a few notes created', function() {
    //   beforeEach(function() {
    //     cy.request({
    //       url: 'http://localhost:3001/api/blogs'
    //     })
    //   });
    // })
  });
});