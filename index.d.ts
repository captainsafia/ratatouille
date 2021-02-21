declare module 'ratatouille' {
  export interface Step {
    quantity: string
    unit: string
    preparation: string
    name: string
  }

  export interface Nutrition {
    calories: string
    carbohydrates: string
    fat: string
    protein: string
    sodium: string
  }

  export interface Recipie {
    url: string
    name: string
    servings: number
    readyInTime: string
    prepTime: string
    cookTime: string
    nutrition: Partial<Nutrition>
    steps: string[]
    ingredients: string[]
  }

  export default function (url: string): Promise<Recipie>
}
