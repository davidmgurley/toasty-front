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