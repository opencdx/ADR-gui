//import Page from '@/app/page'
/// <reference types="cypress" />


describe('New Query-builder E2E Test', () => {
    beforeEach(() => {
     
      cy.visit('http://localhost:3000/query-builder')
    })

    it('should display the query builder', () => {
        cy.get('h1').should('contain', 'Available Criteria')
    })
  
   
  })
  