describe('Forgot Password Page - Valid Email Scenario', () => {
  beforeEach(() => {
    cy.visit('/forgot-password')
  })

  it('should redirect to the homepage upon entering a valid email', () => {
    cy.get('[data-testid="email"]').type('test@example.com')
    cy.get('[data-testid="submit"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})

describe('Forgot Password Page - Validation Errors', () => {
  beforeEach(() => {
    cy.visit('/forgot-password')
  })

  it('should display an error for an empty email field', () => {
    cy.get('[data-testid="submit"]').click()
    cy.get('[data-testid="error-message-0"]').should('exist')
  })

  it('should display error for invalid email format', () => {
    cy.get('[data-testid="email"]').type('invalid@email')
    cy.get('[data-testid="submit"]').click()
    cy.get('[data-testid="error-message-0"]').should('exist')
  })
})
