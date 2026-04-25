import { test, expect } from '@playwright/test'

test('flying: any single attempt advances to ceremony', async ({ page }) => {
  await page.goto('/?stage=flying')
  await expect(page.getByTestId('stage-name')).toHaveText('FLYING')

  await page.getByRole('button', { name: /mount broom/i }).click()
  await expect(page.getByTestId('flying-result')).toBeVisible()

  await page.getByRole('button', { name: /continue/i }).click()
  await expect(page.getByTestId('stage-name')).toHaveText('CEREMONY')
})
