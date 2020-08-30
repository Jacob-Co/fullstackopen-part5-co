describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('should contain login page', function() {
    cy.contains('Log in to Application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('Login');
  });
});