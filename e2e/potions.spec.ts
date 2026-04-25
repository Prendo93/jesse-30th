import { test, expect } from '@playwright/test'

test.describe('potions', () => {
  test('correct recipe brews the Mild Disappointment and continues', async ({
    page,
  }) => {
    await page.goto('/?stage=potions')
    await expect(page.getByTestId('stage-name')).toHaveText('POTIONS')

    await page.getByTestId('ingredient-Hair (source unclear)').click()
    await page.getByTestId('ingredient-A Bean').click()
    await page.getByTestId('ingredient-Dusty Rock').click()

    await page.getByRole('button', { name: /brew/i }).click()

    await expect(page.getByTestId('potion-outcome')).toContainText(
      'Mild Disappointment',
    )
    await expect(page.getByTestId('snape-line')).toContainText('Correct')

    await page.getByRole('button', { name: /continue/i }).click()
    await expect(page.getByTestId('stage-name')).toHaveText('CHARMS')
  })

  test('wrong recipe still advances after Snape\'s scorn', async ({ page }) => {
    await page.goto('/?stage=potions')
    await page.getByTestId('ingredient-Slimy Leaf').click()
    await page.getByTestId('ingredient-Something Glowing').click()
    await page.getByTestId('ingredient-Questionable Liquid').click()
    await page.getByRole('button', { name: /brew/i }).click()

    await expect(page.getByTestId('potion-outcome')).toContainText(
      'Slightly Different Disappointment',
    )
    await expect(page.getByTestId('snape-line')).toContainText('Incorrect')
    await page.getByRole('button', { name: /continue/i }).click()
    await expect(page.getByTestId('stage-name')).toHaveText('CHARMS')
  })
})
