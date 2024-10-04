import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, browser }) => {
  const context = await browser.newContext({ viewport: { width: 1920, height: 1020 } });
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(5000);
});

test('Drag criteria to add query box and build query', async ({ page }) => {
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

    // Drag the operator to the add query box
    await page.locator('xpath=//div[contains(text(), "And")]').first().dragTo(page.locator('[data-cy="add-query-box"]').first());

    await page.getByRole('button', { name: 'New Query Field' }).click();

    // Wait for the add query box to be visible before dragging
    await page.waitForSelector('[data-cy="add-query-box"]', { state: 'visible' });

    // Formula operator locator
    /*await page.locator('xpath=//div[contains(text(), "Formula")]').hover();

    await page.locator('xpath=//div[contains(text(), "Formula")]').first().dragTo(page.locator('[data-cy="add-query-box"]').first());

    await page.locator('xpath=(//div[@class="flex items-center"]//input)[1]').nth(0).fill("25");*/

    // Hover over the first criteria droppable element
    await page.locator('[data-cy="criteria-droppable"]').nth(1).hover();

    // Drag the criteria to the add query box
    await page.locator('[data-cy="criteria-droppable"]').nth(1).dragTo(page.locator('[data-cy="add-query-box"]').first());

    await page.getByRole('button', { name: 'New Query Field' }).click();

    // Or operator locator
    await page.locator('xpath=//div[contains(text(), "Or")]').hover();

    // Drag the operator to the add query box
    await page.locator('xpath=//div[contains(text(), "Or")]').first().dragTo(page.locator('[data-cy="add-query-box"]').first());

    await page.getByRole('button', { name: 'New Query Field' }).click();

    // Hover over the first criteria droppable element
    await page.locator('[data-cy="criteria-droppable"]').nth(2).hover();

    // Drag the criteria to the add query box
    await page.locator('[data-cy="criteria-droppable"]').nth(2).dragTo(page.locator('[data-cy="add-query-box"]').first());

    // Enter query name
    await page.locator('xpath=//div[@data-slot="inner-wrapper"]//input').nth(1).fill("Demo1")

    await page.getByRole('button', { name: 'Save Query' }).click();

    // Wait for added Query to populate in the list
    // await page.locator('xpath=(//*[@data-testid="DeleteForeverIcon"])[1]', { state: 'visible' });

    await page.waitForTimeout(5000);
  });
});