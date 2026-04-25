import { test, expect } from '@playwright/test'

test('canary: app boots and renders the title', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('canary')).toContainText(/Hogwarts/i)
})
