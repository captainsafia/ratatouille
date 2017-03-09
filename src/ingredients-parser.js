import cheerio from 'cheerio';

class IngredientParser {
  constructor(text) {
    this.strings = this.parseText(text);
    this.units = ['cup', 'cups', 'ounce'];
  }

  parseText(text) {
    return text.replace(/[()]/g, '').split(' ');
  }

  get unit() {
    const unit = this.strings.filter((string) => {
      return this.units.indexOf(string) >= 0;
    })[0];
    return unit;
  }

  get quantity() {
    const unitIndex = this.strings.indexOf(this.unit);
    return this.strings[unitIndex - 1];
  }

  get preparation() {
    const delimiter = this.strings.filter((value) => {
      return value.endsWith(',');
    })[0];
    const delimiterIndex = this.strings.indexOf(delimiter);
    if (delimiterIndex >= 0) {
      return this.strings[delimiterIndex + 1];
    } else {
      return '';
    }
  }

  get name() {
    const unitIndex = this.strings.indexOf(this.unit);
    const delimiter = this.strings.filter((value) => {
      return value.endsWith(',');
    })[0];
    const delimiterIndex = this.strings.indexOf(delimiter);
    const end = delimiterIndex >= 0 ? delimiterIndex + 1: this.strings.length;
    const name = this.strings.slice(unitIndex + 1, end);
    return name.join(' ').replace(',', '');
  }
}

export default class IngredientsParser {
  constructor($) {
    this.$ = $;
  }

  get ingredients() {
    return (this.$('span.recipe-ingred_txt[itemprop="ingredients"]')).map((index, element) => {
      const text = element.children[0].data;
      const ingredient = new IngredientParser(text);
      return {
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        preparation: ingredient.preparation,
        name: ingredient.name,
      };
    }).toArray();
  }
}
