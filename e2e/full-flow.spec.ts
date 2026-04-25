import { test, expect } from '@playwright/test'
import { sortingQuestions } from '../src/data/sortingQuestions'

test('happy path: letter → sorting → potions → riddle → maze → ceremony → gift', async ({
  page,
}, testInfo) => {
  // 42 sorting questions + a 13s deliberation push the full happy-path
  // past Playwright's 30s default. Bump timeout for this single spec.
  testInfo.setTimeout(90_000)

  // ?maze=instant short-circuits the arcade play so the e2e doesn't
  // depend on RNG/timing of the Pac-Man-style maze.
  await page.goto('/?maze=instant')

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
    timeout: 20_000,
  })
  await page.getByRole('button', { name: /proceed/i }).click()

  // Connections — solve all four wizarding-world categories.
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'potions')
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
  await page.getByRole('button', { name: /continue/i }).click()

  // Riddle — Peeves's cryptic clue. Answer is ABERFORTH.
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'riddle')
  await page.getByTestId('riddle-input').fill('Aberforth')
  await page.getByTestId('riddle-submit').click()
  await page.getByRole('button', { name: /continue/i }).click()

  // Maze — instant-win mode auto-advances.
  await expect(page.getByTestId('current-stage')).toHaveAttribute('data-stage', 'maze')

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
