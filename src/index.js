import cheerio from 'cheerio';
import request from 'sync-request';
import moment from 'moment';

import IngredientsParser from './ingredients-parser.js';
import StepsParser from './steps-parser.js';

export default class Ratatouille {
  constructor(url) {
    if (this.isValidURL(url)) {
      this.url = url;
      const html = request('GET', url).getBody('utf8');
      this.$ = cheerio.load(html);
    } else {
      throw new Error(`URL ${url} is invalid!`);
    }
  }

  isValidURL(url) {
    return url.includes('allrecipes.com');
  }

  get servings() {
    const rawString = this.$('.adjustServings .subtext').text();
    const numServings = rawString.match(/\d+/g)
    return numServings ? numServings[0] : 0;
  }

  get readyInTime() {
    const duration = this.$('[itemProp="totalTime"]').attr('datetime');
    return moment.duration(duration).humanize();
  }

  get prepTime() {
    const duration = this.$('[itemProp="prepTime"]').attr('datetime');
    return moment.duration(duration).humanize();
  }

  get cookTime() {
    const duration = this.$('[itemProp="cookTime"]').attr('datetime');
    return moment.duration(duration).humanize();
  }

  get calories() {
    return this.$('.calorie-count span:first-child').text();
  }

  get ingredients() {
    const ingredientsParser = new IngredientsParser(this.$);
    return ingredientsParser.ingredients;
  }

  get steps() {
    const stepsParser = new StepsParser(this.$, this.ingredients);
    return stepsParser.steps;
  }
}
