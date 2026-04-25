import { test, expect } from '@playwright/test'

test.describe('riddle', () => {
  test('wrong guess shows feedback, correct guess advances to maze', async ({ page }) => {
    await page.goto('/?stage=riddle')
    await expect(page.getByTestId('current-stage')).toHaveAttribute(
      'data-stage',
      'riddle',
    )

    await expect(page.getByTestId('riddle-clue')).toContainText(
      /Welsh estuary leads forth to kid enthusiast/i,
    )

    await page.getByTestId('riddle-input').fill('Snape')
    await page.getByTestId('riddle-submit').click()
    await expect(page.getByTestId('riddle-feedback')).toBeVisible()

    await page.getByTestId('riddle-input').fill('Aberforth')
    await page.getByTestId('riddle-submit').click()
    await page.getByRole('button', { name: /continue/i }).click()

    await expect(page.getByTestId('current-stage')).toHaveAttribute(
      'data-stage',
      'maze',
    )
  })
})
