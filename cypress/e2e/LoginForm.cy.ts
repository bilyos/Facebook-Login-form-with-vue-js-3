describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display login form', () => {
    cy.get('form').should('be.visible')
    cy.get('[data-testid="email"]').should('be.visible')
    cy.get('[data-testid="password"]').should('be.visible')
    cy.get('[data-testid="submit"]').should('be.visible')
  })

  it('should redirect to welcome page on successful login', () => {
    const users = {
      'existing@user.com': { email: 'existing@user.com', password: 'correctPassword1!' }
    }
    localStorage.setItem('users', JSON.stringify(users))

    cy.get('[data-testid="email"]').as('emailInput')
    cy.get('[data-testid="password"]').as('passwordInput')
    cy.get('@emailInput').type('existing@user.com')
    cy.get('@passwordInput').type('correctPassword1!')
    cy.get('[data-testid="submit"]').first().click()
    cy.url({ timeout: 10000 }).should('include', '/welcome')
  })
})

describe('display error validation', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should display errors when clicking "Se connecter" without filling the fields', () => {
    cy.get('[data-testid="submit"]').first().click()
    cy.get('[data-testid="error-message-0"]').should('exist')
    cy.get('[data-testid="error-message-1"]').should('exist')
  })

  it('should display error when email is filled but password is empty', () => {
    cy.get('[data-testid="email"]').type('test@example.com')
    cy.get('[data-testid="submit"]').first().click()
    cy.get('[data-testid="error-message-1"]').should('exist')
  })

  it('should display error when password is filled but email is empty', () => {
    cy.get('[data-testid="password"]').type('password123')
    cy.get('[data-testid="submit"]').first().click()
    cy.get('[data-testid="error-message-0"]').should('exist')
  })

  it('should display error for invalid email format', () => {
    cy.get('[data-testid="email"]').type('invalid_email')
    cy.get('[data-testid="password"]').type('password123')
    cy.get('[data-testid="submit"]').first().click()
    cy.get('[data-testid="error-message-0"]').should('exist')
  })

  it('should display error for password not meeting requirements', () => {
    cy.get('[data-testid="email"]').type('valid@example.com')
    cy.get('[data-testid="password"]').type('short')
    cy.get('[data-testid="submit"]').first().click()
    cy.get('[data-testid="error-message-1"]').should('exist')
  })

  it('should redirect to forgot password page when clicking "Mot de passe oublié"', () => {
    cy.get('[data-testid="forgot-password"]').first().click()
    cy.url().should('include', '/forgot-password')
  })
})
