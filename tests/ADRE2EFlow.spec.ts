// import { test, expect } from '@playwright/test';

// test('Drag criteria to add query box', async ({ page }) => {
//   await page.goto('http://localhost:3000/');
//   await test.step('Drag criteria to add query box', async () => {
//     await page.locator('[data-cy="criteria-droppable"]').first().hover()
//     await page.locator('[data-cy="criteria-droppable"]').first().dragTo(page.locator('[data-cy="add-query-box"]').first())
//   })

//   // Expect a title "to contain" a substring.
// });

// test('Add add new query field', async ({ page }) => {
//   await page.goto('XXXXXXXXXXXXXXXXXXXXXX');
//   await test.step('Add add new query field', async () => {
//     await page.getByRole('button', { name: 'New Query Field' }).click()
//   })
// });

// test('Drag criteria to add query ', async ({ page }) => {
//   await page.goto('http://127.0.0.1:3000');
//   await test.step('Drag criteria to add query box', async () => {
//     await page.locator('[data-cy="criteria-droppable"]').last().dragTo(page.locator('[data-cy="add-query-box"]').first())
//     await page.getByRole('button', { name: 'New Query Field' }).click()
//   })
// });

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(5000);
});

// test('Drag criteria to add query box', async ({ page }) => {
//   await test.step('Drag criteria to add query box', async () => {
//     await page.locator('[data-cy="criteria-droppable"]').first().hover();
//     await page.locator('[data-cy="criteria-droppable"]').first().dragTo(page.locator('[data-cy="add-query-box"]').first());
//   });
// });

test('Drag criteria to add query box', async ({ page }) => {
  await test.step('Drag criteria to add query box', async () => {
    // Wait for the criteria droppable element to be visible
    await page.waitForSelector('[data-cy="criteria-droppable"]', { state: 'visible' });

    // Hover over the first criteria droppable element
    await page.locator('[data-cy="criteria-droppable"]').first().hover();
    
    // Wait for the add query box to be visible before dragging
    await page.waitForSelector('[data-cy="add-query-box"]', { state: 'visible' });

    // Drag the criteria to the add query box
    await page.locator('[data-cy="criteria-droppable"]').first().dragTo(page.locator('[data-cy="add-query-box"]').first());

    // Wait for the new query field to be visible before dragging another element to it
    await page.getByRole('button', { name: 'New Query Field' }).click();

    // Wait for the add query box to be visible before dragging
    await page.waitForSelector('[data-cy="add-query-box"]', { state: 'visible' });

    // And operator locator
    await page.locator('xpath=//div[contains(text(), "And")]').hover();

    // Drag the criteria to the add query box
    await page.locator('xpath=//div[contains(text(), "And")]').first().dragTo(page.locator('[data-cy="add-query-box"]').first());

    await page.getByRole('button', { name: 'New Query Field' }).click();

    // Wait for the add query box to be visible before dragging
    await page.waitForSelector('[data-cy="add-query-box"]', { state: 'visible' });

    // Formula operator locator
    await page.locator('xpath=//div[contains(text(), "Formula")]').hover();

    await page.locator('xpath=//div[contains(text(), "Formula")]').first().dragTo(page.locator('[data-cy="add-query-box"]').first());

    await page.waitForTimeout(10000);
  });
});

// test('Drag criteria to add query', async ({ page }) => {
//   await page.locator('[data-cy="criteria-droppable"]').last().dragTo(page.locator('[data-cy="add-query-box"]').first());
//   await page.getByRole('button', { name: 'New Query Field' }).click();
// });