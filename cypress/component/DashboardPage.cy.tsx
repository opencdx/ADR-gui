import React from 'react';

import DashboardPage from '@/app/dashboard/page';

import '@/styles/globals.css';

describe('<DashboardPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DashboardPage />);
    // write cypress test for button
    cy.get('button').contains('Small').click();
    cy.get('button').contains('Medium').click();
    cy.get('button').contains('Large').click();
  });
});
