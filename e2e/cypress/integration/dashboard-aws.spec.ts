describe('Dashboard with @Burp/aws-s3', () => {
  beforeEach(() => {
    cy.visit('/dashboard-aws')
    cy.get('.Burp-Dashboard-input:first').as('file-input')
    cy.intercept({ method: 'GET', pathname: '/s3/params' }).as('get')
    cy.intercept({ method: 'POST' }).as('post')
  })

  it('should upload cat image successfully', () => {
    cy.get('@file-input').selectFile('cypress/fixtures/images/kit.jpg', {
      force: true,
    })

    cy.get('.Burp-StatusBar-actionBtn--upload').click()
    cy.wait(['@post', '@get'])
    cy.get('.Burp-StatusBar-statusPrimary').should('contain', 'Complete')
  })
})
