import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, browser }) => {
  test.setTimeout(30000); // Increase timeout to 30 seconds
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

    await page.getByRole('button', { name: 'Run Query' }).click();

    // Wait for added Query to populate in the list
    await page.waitForTimeout(3000);
    await page.locator('xpath=//*[contains(text(),"Return to Query Builder")]').click();
    await page.waitForTimeout(3000);
    await page.locator('xpath=(//*[@data-testid="DeleteForeverIcon"])[1]').click();
    await page.locator('xpath=//button[contains(text(),"Delete")]').click();

    await page.waitForTimeout(3000);
  });
});


test('Create Operator Query using Query Builder', async ({ page }) => {
  await test.step('Drag criteria to add query box', async () => {
     // Wait for the criteria droppable element to be visible
     await page.waitForSelector('[data-cy="criteria-droppable"]', { state: 'visible' });

     // Hover over the sixth criteria droppable element
     await page.locator('[data-cy="criteria-droppable"]').nth(6).hover();
     
     // Wait for the add query box to be visible before dragging
     await page.waitForSelector('[data-cy="add-query-box"]', { state: 'visible' });
 
     // Drag the criteria to the add query box
     await page.locator('[data-cy="criteria-droppable"]').nth(6).dragTo(page.locator('[data-cy="add-query-box"]').first());

     // Click Operator option to expand
     await page.locator('xpath=//div[contains(text(), "Operators")]').click();

     // Drag the operator to the add query box
     await page.locator('//li[@role="menuitem"]/descendant::div').first().dragTo(page.locator('xpath=//div[@class="my-auto flex"]').first());

     // Enter value
     await page.locator('xpath=//div[@class="my-auto flex"]/input').fill("125");
 
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

     // Drag the criteria to the add query box
     await page.locator('[data-cy="criteria-droppable"]').nth(20).dragTo(page.locator('[data-cy="add-query-box"]').first());

     // Click Operator option to expand
     await page.locator('xpath=//div[contains(text(), "Operators")]').click();

     // Drag the operator to the add query box
     await page.locator('//li[@role="menuitem"]/descendant::div').nth(2).dragTo(page.locator('xpath=//div[@class="my-auto flex"]').nth(1));

     // Enter value
     await page.locator('xpath=//div[@class="my-auto flex"]/input').nth(1).fill("18");

     // Wait for the new query field to be visible before dragging another element to it
     await page.getByRole('button', { name: 'New Query Field' }).click();
 
     // Wait for the add query box to be visible before dragging
     await page.waitForSelector('[data-cy="add-query-box"]', { state: 'visible' });

     // And operator locator
    await page.locator('xpath=//div[contains(text(), "And")]').hover();

    // Drag the operator to the add query box
    await page.locator('xpath=//div[contains(text(), "And")]').first().dragTo(page.locator('[data-cy="add-query-box"]').first());

    // Wait for the new query field to be visible before dragging another element to it
    await page.getByRole('button', { name: 'New Query Field' }).click();
 
    // Wait for the add query box to be visible before dragging
    await page.waitForSelector('[data-cy="add-query-box"]', { state: 'visible' });

    // Drag the criteria to the add query box
    await page.locator('[data-cy="criteria-droppable"]').first().dragTo(page.locator('[data-cy="add-query-box"]').first());

    // Enter query name
    await page.locator('xpath=//div[@data-slot="inner-wrapper"]//input').nth(1).fill("Demo1")

    await page.getByRole('button', { name: 'Run Query' }).click();

    // Wait for added Query to populate in the list
    await page.waitForTimeout(3000);
    await page.locator('xpath=//*[contains(text(),"Return to Query Builder")]').click();
    await page.waitForTimeout(3000);
    await page.locator('xpath=(//*[@data-testid="DeleteForeverIcon"])[1]').click();
    await page.locator('xpath=//button[contains(text(),"Delete")]').click();

    await page.waitForTimeout(3000);
  });
});