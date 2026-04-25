import { test, expect } from '@playwright/test'

test.describe('connections', () => {
  test('solving all four categories advances to riddle', async ({ page }) => {
    await page.goto('/?stage=potions')
    await expect(page.getByTestId('current-stage')).toHaveAttribute(
      'data-stage',
      'potions',
    )

    const groups: string[][] = [
      ['SIRIUS', 'BELLATRIX', 'ANDROMEDA', 'REGULUS'],
      ['LILY', 'NARCISSA', 'PETUNIA', 'POPPY'],
      ['DRACO', 'SCORPIUS', 'LUNA', 'MEROPE'],
      ['MINERVA', 'POMONA', 'ARGUS', 'AURORA'],
    ]

    for (const group of groups) {
      for (const word of group) {
        await page.getByTestId(`connections-word-${word}`).click()
      }
      await page.getByTestId('connections-submit').click()
    }

    await expect(page.getByTestId('connections-outcome')).toContainText(
      'All four groups solved',
    )
    await page.getByRole('button', { name: /continue/i }).click()
    await expect(page.getByTestId('current-stage')).toHaveAttribute(
      'data-stage',
      'riddle',
    )
  })

  test('four wrong submissions show game over with a time-turner retry', async ({ page }) => {
    await page.goto('/?stage=potions')

    // Pick four words that span different categories.
    const wrong = ['SIRIUS', 'LILY', 'DRACO', 'MINERVA']
    for (let i = 0; i < 4; i += 1) {
      for (const word of wrong) {
        await page.getByTestId(`connections-word-${word}`).click()
      }
      await page.getByTestId('connections-submit').click()
    }

    await expect(page.getByTestId('connections-outcome')).toContainText(
      /Game Over/i,
    )
    // Stays on potions — does not auto-advance.
    await expect(page.getByTestId('current-stage')).toHaveAttribute(
      'data-stage',
      'potions',
    )
    // Time-Turner resets the puzzle.
    await page.getByTestId('connections-retry').click()
    await expect(page.getByTestId('connections-mistakes')).toContainText('0/4')
    await expect(page.getByTestId('connections-submit')).toBeVisible()
  })
})
