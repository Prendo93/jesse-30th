import { test, expect } from '@playwright/test'

test('ceremony tallies points and gift reveals the Cursed Child ticket', async ({
  page,
}) => {
  await page.goto('/?stage=ceremony')
  await expect(page.getByTestId('stage-name')).toHaveText('CEREMONY')

  await expect(page.getByTestId('house-row-Hufflepuff')).toContainText(
    'Hufflepuff',
  )
  await expect(page.getByTestId('house-row-Hufflepuff')).toContainText('3')

  await expect(page.getByTestId('ceremony-last-place')).toContainText(
    'HUFFLEPUFF',
    { timeout: 5_000 },
  )
  await expect(page.getByTestId('ceremony-twist')).toContainText(
    /unlocked a reward/i,
    { timeout: 5_000 },
  )

  await page.getByRole('button', { name: /claim reward/i }).click()
  await expect(page.getByTestId('stage-name')).toHaveText('REWARD')

  await page.getByTestId('gift-chest').click()
  const message = page.getByTestId('gift-message')
  await expect(message).toContainText('Jesse')
  await expect(message).toContainText('Cursed Child')
  await expect(page.getByTestId('gift-ticket')).toBeVisible()
})
