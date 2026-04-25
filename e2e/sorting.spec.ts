import { test, expect } from '@playwright/test'

const reachSortingStage = async (page: import('@playwright/test').Page) => {
  await page.goto('/')
  await page.getByTestId('letter-envelope').click()
  await page.getByTestId('letter-parchment').click()
  await page.getByRole('button', { name: /reluctantly accept/i }).click()
}

test.describe('sorting hat', () => {
  test('always lands on Hufflepuff regardless of answers', async ({ page }, testInfo) => {
    testInfo.setTimeout(60_000)
    await reachSortingStage(page)
    await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'sorting')

    // Click through every question — answers are ignored, so just pick
    // the first option each time.
    for (let i = 0; i < 42; i += 1) {
      const buttons = page.getByTestId('sorting-answer')
      await buttons.first().click()
    }

    await expect(page.getByTestId('sorting-thinking')).toBeVisible({
      timeout: 5_000,
    })
    await expect(page.getByTestId('sorting-reveal')).toContainText(
      'HUFFLEPUFF',
      { timeout: 20_000 },
    )

    await page.getByRole('button', { name: /proceed/i }).click()
    await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'potions')
  })
})
