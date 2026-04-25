import { test, expect } from '@playwright/test'

test('maze: instant-win mode auto-advances to ceremony', async ({ page }) => {
  await page.goto('/?stage=maze&maze=instant')
  await expect(page.getByTestId('current-stage')).toHaveAttribute(
    'data-stage',
    'ceremony',
    { timeout: 5_000 },
  )
})

test('maze: real game renders board and HUD', async ({ page }) => {
  await page.goto('/?stage=maze')
  await expect(page.getByTestId('current-stage')).toHaveAttribute(
    'data-stage',
    'maze',
  )
  await expect(page.getByTestId('maze-board')).toBeVisible()
  await expect(page.getByTestId('maze-player')).toBeVisible()
  await expect(page.getByTestId('maze-hud')).toBeVisible()
})
