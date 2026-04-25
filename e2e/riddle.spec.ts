import { test, expect } from '@playwright/test'

const ANSWERS = ['Aberforth', 'Diagon Alley', 'Worple', 'Snitch']

test.describe('riddle gauntlet', () => {
  test('solve all four cryptic clues to advance to maze', async ({ page }) => {
    await page.goto('/?stage=riddle')
    await expect(page.getByTestId('current-stage')).toHaveAttribute(
      'data-stage',
      'riddle',
    )

    await expect(page.getByTestId('riddle-clue')).toContainText(
      /Welsh estuary leads forth to kid enthusiast/i,
    )

    // Wrong guess gets feedback
    await page.getByTestId('riddle-input').fill('wronganswer')
    await page.getByTestId('riddle-submit').click()
    await expect(page.getByTestId('riddle-feedback')).toBeVisible()

    // Walk every clue
    for (const answer of ANSWERS) {
      await page.getByTestId('riddle-input').fill(answer)
      await page.getByTestId('riddle-submit').click()
    }

    await page.getByRole('button', { name: /continue/i }).click()
    await expect(page.getByTestId('current-stage')).toHaveAttribute(
      'data-stage',
      'maze',
    )
  })
})
