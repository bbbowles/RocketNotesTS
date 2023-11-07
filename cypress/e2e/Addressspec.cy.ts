const tmp = String(Math.random())

const randomNumber = (tmp.replace(".","")).replace("0","1").substring(0,4)

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    cy.get('#basic_email').type("typescript")

    cy.get('#basic_password').type("typescript")

    cy.get('.ant-form-item-control-input-content > .ant-btn').click()

    cy.visit('http://localhost:3000/criarendereco')

    cy.get('#cep').type("12345678")
  
    cy.get('#nome').type("testenome")

    cy.get('#cidade').type("testecidade")

    cy.get('#bairro').type("testebairro")

    cy.get('#estado').type("te")

    cy.get("#numero").type(randomNumber)

    cy.get('#user_id').type("typescript")

    cy.get('.ant-select-item-option-content').click()

    cy.get('.ant-form > .ant-btn').click()

    cy.contains("sucesso").should("be.visible")

    cy.visit('http://localhost:3000/listarendereco')

    cy.get('#numero').type(randomNumber)

    cy.get('[style="width: 100%; display: inline-block; background-color: rgb(17, 26, 44);"] > .ant-btn').click()

    cy.get('#numero').clear()

    cy.contains(randomNumber).should("be.visible")


  })
})