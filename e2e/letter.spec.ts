import { test, expect } from '@playwright/test'

test('letter: open envelope, accept, advance to sorting', async ({ page }) => {
  await page.goto('/')

  // The HUD shell renders on every stage.
  await expect(page.getByTestId('hud-bolt')).toBeVisible()
  await expect(page.getByTestId('hud-pause')).toBeVisible()

  // Letter stage: envelope visible, no dialogue yet.
  await expect(page.getByTestId('letter-envelope')).toBeVisible()
  await expect(page.getByTestId('dialogue-box')).toHaveCount(0)

  // Click envelope: dialogue band appears with HOGWARTS speaker.
  await page.getByTestId('letter-envelope').click()
  await expect(page.getByTestId('dialogue-box')).toBeVisible()
  await expect(page.getByTestId('dialogue-speaker')).toHaveText('HOGWARTS')

  // Skip the typewriter, then accept.
  await page.getByTestId('dialogue-box').click()
  await page.getByRole('button', { name: /reluctantly accept/i }).click()

  // Lands on the sorting stage placeholder for now.
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'sorting')
})
