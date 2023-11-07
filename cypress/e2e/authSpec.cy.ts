const visitUrl = "http://localhost:3000"
const randomNumber = (Math.random()*26)


describe('template spec', () => {
  it('passes', () => {
    cy.visit(visitUrl)
    cy.get('.bottomPartAuthButtons > :nth-child(2) > span').click()

    cy.get('#basic_username').type("login"+randomNumber)
    cy.get('#basic_email').type("email"+randomNumber)
    cy.get('#basic_password').type("password"+randomNumber)

    cy.get('.ant-form-item-control-input-content > .ant-btn').click()

    cy.contains('Sucesso!').should('be.visible')

    cy.get('.swal2-confirm').click()

    cy.get('#basic_email').type("email"+randomNumber)
    cy.get('#basic_password').type("password"+randomNumber)

    cy.get('.ant-form-item-control-input-content > .ant-btn').click()

    cy.contains(`Bem Vindo login${randomNumber}`).should('be.visible')


  })
})