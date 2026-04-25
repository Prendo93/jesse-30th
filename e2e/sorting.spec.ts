import { test, expect } from '@playwright/test'

const reachSortingStage = async (page: import('@playwright/test').Page) => {
  await page.goto('/')
  await page.getByTestId('letter-envelope').click()
  await page.getByTestId('dialogue-box').click()
  await page.getByRole('button', { name: /reluctantly accept/i }).click()
}

test.describe('sorting hat', () => {
  test('always lands on Hufflepuff regardless of answers', async ({ page }) => {
    await reachSortingStage(page)
    await expect(page.getByTestId('stage-name')).toHaveText('SORTING')

    // Pick a different answer index for each question to prove answers are ignored.
    const picks = [0, 1, 2, 3, 0]
    for (const pick of picks) {
      const buttons = page.getByTestId('sorting-answer')
      await buttons.nth(pick).click()
    }

    await expect(page.getByTestId('sorting-thinking')).toBeVisible()
    await expect(page.getByTestId('sorting-reveal')).toContainText(
      'HUFFLEPUFF',
      { timeout: 5_000 },
    )

    await page.getByRole('button', { name: /proceed/i }).click()
    await expect(page.getByTestId('stage-name')).toHaveText('POTIONS')
  })
})
