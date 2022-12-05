import addslot from '../../support/pageObjects/addslot.js'
import emrologin from '../../support/pageObjects/emrologin.js'
import bookapp from '../../support/pageObjects/bookapp.js'

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
/// <reference types="Cypress" />
before(function() {
  // runs once before all tests in the block
  cy.fixture('emrodata').then(function(data)
  {
  this.data=data
  })
})
describe('Emro - Test Case 2 and 3', function(){ 
it('Emro - Impersonate and add slot',function() {
cy.visit(Cypress.env('url'))
const a = new emrologin()
const b = new addslot()
const c = new bookapp()
a.getemail()
a.getpass('123qwe')
a.getcheckbox()
a.getcaptcha()
cy.wait(10000)
a.getloginbutton()
cy.get('[data-index="1"] > .side-menu > .side-menu__title').click()
cy.get('tr.mat-row').each(($e1, index, $list) => {

  const a = $e1.text()
  if(a.includes(this.data.consultant))
  {
     cy.get($e1).children('td:nth-child(8)').children('.flaticon-user').click()
  }
})
//cy.get('tr:first-child span[title="Impersonate"]').click()
cy.wait(15000)
//cy.get('button.mr-2').click()
cy.get('.mat-dialog-container').if('visible').then(() => {
  cy.get('.submit-button').click();
})
cy.get('button span.text-white').click()
cy.get('div.mat-menu-content button:first-of-type').click()
b.getslot('N')

  if(cy.contains('overlapping'))
  {
    cy.log('Slots overlapping')
    cy.wait(10000)
    b.getslot('Y')
  }
  else if(cy.get('.mb- ul').children().should('exist'))
  {
    cy.log('Slot added')
  }
else
  {
    cy.log('No slot added')
  }
cy.get('button span.text-white').click()
cy.contains('Stop Impersonation').click()
cy.wait(5000)

c.bookappointment()
// cy.get('a.side-menu span.flaticon-patient').click()
// cy.get('tbody tr:nth-child(2) td.mat-column-action .flaticon-user').click()
// cy.wait(5000)
// cy.get('span .mt-3').click()
// cy.get('.mat-select-value').click()
// cy.get('.mat-select-value').contains('Radiologist').click()
// cy.get("mat-radio-button[value='consultant'] .mat-radio-input").click()
// cy.get('.mat-input-element').type('Abhilash')
// cy.get('.submit-button').click()
// cy.get('.view-profile-btn').click()
// cy.get('.col-12 button').click()
// cy.get('tbody tr:first-child input').type('Test booking')
// cy.get('tr:nth-child(3) div button:nth-child(2)').click()
// cy.get('.mt-lg-0 button').click()
// cy.get('button.ml-3').click()
// cy.get('.w-100 button.ml-3').click()
// cy.get('canvas[style="touch-action: none;"]').trigger("mousemove")
//       .trigger("mousedown", { which: 1 })
//       .trigger("mousemove", {
//         clientX: 100,
//         clientY: 30,
//         screenX: 100,
//         screenY: 30,
//         pageX: 800,
//         pageY: 130,
//       })
//       .trigger("mouseup", { force: true });
})
})