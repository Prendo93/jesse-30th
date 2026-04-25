import { test, expect } from '@playwright/test'

test('letter: open envelope, read parchment, accept, advance to sorting', async ({
  page,
}) => {
  await page.goto('/')

  // The HUD shell renders on every stage.
  await expect(page.getByTestId('hud-bolt')).toBeVisible()
  await expect(page.getByTestId('hud-pause')).toBeVisible()

  // Letter stage: sealed envelope visible, no parchment yet.
  await expect(page.getByTestId('letter-envelope')).toBeVisible()
  await expect(page.getByTestId('letter-parchment')).toHaveCount(0)

  // Click envelope: parchment unfolds with handwritten content.
  await page.getByTestId('letter-envelope').click()
  await expect(page.getByTestId('letter-parchment')).toBeVisible()
  await expect(page.getByTestId('letter-content')).toContainText(/Jesse/i)

  // Skip the handwriting reveal, then accept.
  await page.getByTestId('letter-parchment').click()
  await page.getByRole('button', { name: /reluctantly accept/i }).click()

  // Lands on the sorting stage.
  await expect(page.getByTestId('current-stage')).toHaveAttribute(
    'data-stage',
    'sorting',
  )
})
