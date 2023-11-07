const visitUrl = "http://localhost:3000"
const randomNumber = (Math.random()*26)
const randomNumber2 = (Math.random()*4)


describe('template spec', () => {
  it('passes', () => {
    cy.visit(visitUrl)

    cy.get('#basic_email').type("typescript")
    cy.get('#basic_password').type("typescript")

    cy.get('.ant-form-item-control-input-content > .ant-btn').click()

    cy.get(':nth-child(1) > .ant-menu-submenu-title').trigger('mouseover')
    
    cy.wait(10)

    cy.visit("http://localhost:3000/criarcarro")

    cy.get('#name').type("nome"+randomNumber2)

    cy.get('#brand').type("nome"+randomNumber2)

    cy.get('#year').click()

    cy.get('[title="2021"]').click()

    cy.get('#user_id').type("typescript")

    cy.get('.ant-select-item-option-content').click()

    cy.get('.ant-form > .ant-btn').click()

    cy.contains("Carro criado com sucesso").should("be.visible")

    cy.get('.swal2-confirm').click()

    cy.visit("http://localhost:3000/listarcarro")



  })

})