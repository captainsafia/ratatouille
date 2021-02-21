import fs from 'fs'
import path from 'path'
import cheerio from 'cheerio'
import { parse } from '..'

const html = fs.readFileSync(path.resolve(__dirname, './example.html'), 'utf-8')
const dom = cheerio.load(html)

it('should scrape page as expected', () => {
  expect(parse(dom)).toEqual({
    name: 'Hearty Vegan Slow-Cooker Chili',
    cookTime: '5 hrs 10 mins',
    prepTime: '45 mins',
    readyInTime: '5 hrs 55 mins',
    servings: 15,
    steps: [
      'Heat olive oil in a large skillet over medium heat, and cook the green, red, and yellow bell peppers, onions, and garlic until the onions start to brown, 8 to 10 minutes. Place the mixture into a slow cooker. Stir in spinach, corn, zucchini, yellow squash, chili powder, cumin, oregano, parsley, salt, black pepper, tomatoes, black beans, garbanzo beans, kidney beans, and tomato paste until thoroughly mixed. Pour the tomato sauce and vegetable broth over the ingredients.',
      'Set the cooker on Low, and cook until all vegetables are tender, 4 to 5 hours. Check seasoning; if chili is too thick, add more tomato sauce and vegetable broth to desired thickness. Cook an additional 1 to 2 hours to blend the flavors.',
    ],
    ingredients: [
      '1 tablespoon olive oil',
      '1  green bell pepper, chopped',
      '1  red bell pepper, chopped',
      '1  yellow bell pepper, chopped',
      '2  onions, chopped',
      '4 cloves garlic, minced',
      '1 (10 ounce) package frozen chopped spinach, thawed and drained',
      '1 cup frozen corn kernels, thawed',
      '1  zucchini, chopped',
      '1  yellow squash, chopped',
      '6 tablespoons chili powder',
      '1 tablespoon ground cumin',
      '1 tablespoon dried oregano',
      '1 tablespoon dried parsley',
      '½ teaspoon salt',
      '½ teaspoon ground black pepper',
      '2 (14.5 ounce) cans diced tomatoes with juice',
      '1 (15 ounce) can black beans, rinsed and drained',
      '1 (15 ounce) can garbanzo beans, drained',
      '1 (15 ounce) can kidney beans, rinsed and drained',
      '2 (6 ounce) cans tomato paste',
      '1 (8 ounce) can tomato sauce, or more if needed',
      '1 cup vegetable broth, or more if needed',
    ],
    nutrition: {
      calories: '134',
      carbohydrates: '24.8g',
      fat: '2.4g',
      protein: '6.3g',
      sodium: '616.7mg',
    },
  })
})
