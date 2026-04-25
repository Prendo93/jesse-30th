import { test, expect } from '@playwright/test'

test('charms: failing twice still advances to flying', async ({ page }) => {
  await page.goto('/?stage=charms')
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'charms')

  // Wait for the first show phase to finish (3 steps × 600ms + buffer).
  await expect(page.locator('[data-testid="charms-state"]')).toHaveAttribute(
    'data-phase',
    'input',
    { timeout: 5_000 },
  )

  // Pick the wrong button twice. We can read the expected first index of each
  // sequence from the state element and click any other button.
  for (let i = 0; i < 2; i += 1) {
    const seq = await page
      .getByTestId('charms-state')
      .getAttribute('data-sequence')
    const expected = Number(seq!.split(',')[0])
    const wrong = (expected + 1) % 4
    await page.getByTestId(`charm-button-${wrong}`).click()
    // Either we're still going (next show), or we landed in the result phase.
    await page.waitForFunction(() => {
      const el = document.querySelector('[data-testid="charms-state"]')
      const phase = el?.getAttribute('data-phase')
      const failures = Number(el?.getAttribute('data-failures') ?? '0')
      return phase === 'input' || phase === 'result' || failures >= 2
    })
    if (
      (await page
        .getByTestId('charms-state')
        .getAttribute('data-phase')) === 'result'
    ) {
      break
    }
    await expect(page.locator('[data-testid="charms-state"]')).toHaveAttribute(
      'data-phase',
      'input',
      { timeout: 5_000 },
    )
  }

  await expect(page.getByTestId('charms-result')).toContainText(
    /We're choosing to move on/i,
  )
  await page.getByRole('button', { name: /continue/i }).click()
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'flying')
})
