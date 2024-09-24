import { test, expect } from '@playwright/test';

test('Drag criteria to add query box', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');
  await test.step('Drag criteria to add query box', async () => {
    await page.locator('[data-cy="criteria-droppable"]').first().hover()
    await page.locator('[data-cy="criteria-droppable"]').first().dragTo(page.locator('[data-cy="add-query-box"]').first())
  })

  // Expect a title "to contain" a substring.
});

test('Drag criteria to add query ', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');
  await test.step('Drag criteria to add query box', async () => {
    await page.locator('[data-cy="criteria-droppable"]').last().dragTo(page.locator('[data-cy="add-query-box"]').first())
    await page.getByRole('button', { name: 'New Query Field' }).click()
  })
});

