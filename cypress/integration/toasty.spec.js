describe('The Page Loads', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
})

describe('The list loads and number in header is accurate', () => {
  it('the list elements exist', () => {
    cy.get('.todoList').then(($list) => {
      const listNumber = $list.length.toString()
      cy.get('.countText').should(($countText)=> {
        expect($countText).to.have.text('You have' + ' ' + listNumber + ' ' + 'items on your list')
      })
    })
  })
})

describe('Ability to add to your list', () => {
  it('updates the value', () => {
    cy.get('#todoTitle').type('New Test To Do From Cypress')
    cy.get('#todoTitle').should('have.value', 'New Test To Do From Cypress')
  })

  it('is able to submit and then clears value', () => {
    cy.get('#addToListButton').click()
    cy.get('#todoTitle').should('have.value', '')
  })

  it('has added the item to the bottom of the list', () => {
    cy.wait(1000)
    cy.get('.todoList').then(($list) => {
      const lastListItem = $list[$list.length - 1]
      expect(lastListItem).to.have.text('New Test To Do From CypressI DID IT!EditX')
    })
  })
})

describe('you can delete a list item', () => {
  it('has a delete button to click', () => {
    cy.get('.todoList').then(($list) => {
      const lastListItem = $list[$list.length - 1]
      cy.get(lastListItem).within(() => {
        cy.get('.deleteButton').click()
      })
    })
  })
  it('has removed the item', () => {
    cy.wait(1000)
    cy.get('.todoList').then(($list) => {
      const lastListItem = $list[$list.length - 1]
      expect(lastListItem).to.not.have.text('New Test To Do From CypressI DID IT!EditX')
    })
  })
})