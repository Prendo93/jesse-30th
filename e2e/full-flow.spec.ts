import { test, expect } from '@playwright/test'
import { sortingQuestions } from '../src/data/sortingQuestions'

test('happy path: letter → sorting → potions → charms → flying → ceremony → gift', async ({
  page,
}) => {
  await page.goto('/')

  // Letter
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'letter')
  await page.getByTestId('letter-envelope').click()
  await page.getByTestId('letter-parchment').click()
  await page.getByRole('button', { name: /reluctantly accept/i }).click()

  // Sorting — answer every question, then wait for the Hufflepuff reveal.
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'sorting')
  for (let i = 0; i < sortingQuestions.length; i += 1) {
    await page.getByTestId('sorting-answer').first().click()
  }
  await expect(page.getByTestId('sorting-reveal')).toContainText('HUFFLEPUFF', {
    timeout: 5_000,
  })
  await page.getByRole('button', { name: /proceed/i }).click()

  // Potions — pick the correct recipe so we exercise the Snape "correct" line.
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'potions')
  await page.getByTestId('ingredient-Hair (source unclear)').click()
  await page.getByTestId('ingredient-A Bean').click()
  await page.getByTestId('ingredient-Dusty Rock').click()
  await page.getByRole('button', { name: /brew/i }).click()
  await page.getByRole('button', { name: /continue/i }).click()

  // Charms — fail twice through to the result screen.
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'charms')
  await expect(page.getByTestId('charms-state')).toHaveAttribute(
    'data-phase',
    'input',
    { timeout: 5_000 },
  )
  for (let i = 0; i < 2; i += 1) {
    const seq = await page
      .getByTestId('charms-state')
      .getAttribute('data-sequence')
    const expected = Number(seq!.split(',')[0])
    const wrong = (expected + 1) % 4
    await page.getByTestId(`charm-button-${wrong}`).click()
    await page.waitForFunction(() => {
      const el = document.querySelector('[data-testid="charms-state"]')
      const phase = el?.getAttribute('data-phase')
      return phase === 'input' || phase === 'result'
    })
    if (
      (await page
        .getByTestId('charms-state')
        .getAttribute('data-phase')) === 'result'
    ) {
      break
    }
  }
  await page.getByRole('button', { name: /continue/i }).click()

  // Flying — single click is enough.
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'flying')
  await page.getByRole('button', { name: /mount broom/i }).click()
  await page.getByRole('button', { name: /continue/i }).click()

  // Maze — placeholder for now; skip via the dev affordance.
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'maze')
  await page.getByTestId('maze-skip').click()

  // Ceremony — wait for twist, then claim reward.
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'ceremony')
  await expect(page.getByTestId('ceremony-twist')).toBeVisible({
    timeout: 5_000,
  })
  await page.getByRole('button', { name: /claim reward/i }).click()

  // Gift — open chest, confirm Jesse + Cursed Child.
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'gift')
  await page.getByTestId('gift-chest').click()
  const message = page.getByTestId('gift-message')
  await expect(message).toContainText('Jesse')
  await expect(message).toContainText('Cursed Child')
  await expect(page.getByTestId('gift-ticket')).toBeVisible()
})
