export const POTION_INGREDIENTS = [
  'Slimy Leaf',
  'Dusty Rock',
  'Questionable Liquid',
  'Hair (source unclear)',
  'Something Glowing',
  'A Bean',
] as const

export type Ingredient = (typeof POTION_INGREDIENTS)[number]

export const CORRECT_RECIPE: readonly Ingredient[] = [
  'Hair (source unclear)',
  'A Bean',
  'Dusty Rock',
]

export function arePotionIngredientsCorrect(
  order: readonly Ingredient[],
): boolean {
  if (order.length !== CORRECT_RECIPE.length) return false
  for (let i = 0; i < order.length; i += 1) {
    if (order[i] !== CORRECT_RECIPE[i]) return false
  }
  return true
}
