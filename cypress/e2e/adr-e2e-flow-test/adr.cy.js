//import Page from '@/app/page'
/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('ADR - Query Builder E2E flow automation script', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000/query-builder')
      // cy.request({
      //   method: 'GET',
      //   url: 'http://localhost:3000/query-builder',
      //   failOnStatusCode: false
      // }).then((response) => {
      //   expect(response.status).to.eq(500)
      // })
    })
  
    it('Build Query using Query Builder from scratch', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      
      cy.xpath('(//text()[contains(., "Age")])[1]')
        .realType('dragstart')
        .realType('dragend')

      cy.get('[role="QueryBox"]')
        .realType('drop')
    })
  })