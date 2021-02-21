import cheerio from 'cheerio'
import fetch from 'node-fetch'

function getName($: cheerio.Root) {
  return $("meta[property='og:title']").attr('content')
}

function getServings($: cheerio.Root) {
  const rawString = $('.recipe-adjust-servings__size-quantity').text()
  const numServings = rawString.match(/\d+/g)
  return numServings ? parseInt(numServings[0], 10) : 0
}

function getReadyInTime($: cheerio.Root) {
  return $(
    '.two-subcol-content-wrapper:nth-of-type(1) > .recipe-meta-item:nth-of-type(3) > .recipe-meta-item-body'
  )
    .text()
    .trim()
}

function getPrepTime($: cheerio.Root) {
  return $(
    '.two-subcol-content-wrapper:nth-of-type(1) > .recipe-meta-item:nth-of-type(1) > .recipe-meta-item-body'
  )
    .text()
    .trim()
}

function getCookTime($: cheerio.Root) {
  return $(
    '.two-subcol-content-wrapper:nth-of-type(1) > .recipe-meta-item:nth-of-type(2) > .recipe-meta-item-body'
  )
    .text()
    .trim()
}

function getNutrition($: cheerio.Root) {
  return Object.fromEntries(
    $('.recipe-nutrition-section > div:nth-child(2)')
      .text()
      .trim()
      .split(';')
      .map(pair => pair.split(' ').filter(Boolean))
      .map(([key, val], i, arr) =>
        /\d/.test(key)
          ? [val, key]
          : [key, i === arr.length - 1 ? val.slice(0, arr.length + 2) : val]
      )
  )
}

function getIngredients($: cheerio.Root) {
  return Array.from($('.ingredients-item-name')).map(({ children }: any) =>
    children[0].data.trim()
  )
}

function getSteps($: cheerio.Root) {
  return Array.from(
    $('.instructions-section-item p')
  ).map(({ children }: any) => children[0].data.trim())
}

export function parse($: cheerio.Root) {
  return {
    name: getName($),
    servings: getServings($),
    readyInTime: getReadyInTime($),
    prepTime: getPrepTime($),
    cookTime: getCookTime($),
    nutrition: getNutrition($),
    ingredients: getIngredients($),
    steps: getSteps($),
  }
}

export default function scrape(url: string) {
  return fetch(url)
    .then(res => res.text())
    .then(cheerio.load)
    .then(parse)
    .then(recipie => Object.assign(recipie, { url }))
}
