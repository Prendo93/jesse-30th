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

  test('four wrong submissions still advance to riddle', async ({ page }) => {
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
      'Incomplete',
    )
    await page.getByRole('button', { name: /continue/i }).click()
    await expect(page.getByTestId('current-stage')).toHaveAttribute(
      'data-stage',
      'riddle',
    )
  })
})
