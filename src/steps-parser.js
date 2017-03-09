import pos from 'pos';
import { tools } from './phrases';

class StepParser {
  constructor(text, ingredients) {
    this.text = this.parseText(text);
    this.ingredients = ingredients;
  }

  parseText(text) {
    return text.toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  }

  get method() {
    const words = new pos.Lexer().lex(this.text);
    const taggedWords = new pos.Tagger().tag(words);
    return taggedWords.filter((tag) => tag[1] === 'VB').map((tag) => tag[0]);
  }

  get tools() {
    return tools.filter((tool) => this.text.includes(tool));
  }

  get ingredientsUsed() {
    return this.ingredients.filter((ingredient) => this.text.includes(ingredient.name));
  }
}

export default class StepsParser {
  constructor($, ingredients) {
    this.$ = $;
    this.ingredients = ingredients;
  }

  get steps() {
    return (this.$('.recipe-directions__list--item')).map((index, element) => {
      if (element.children.length > 0) {
        const text = element.children[0].data;
        const step = new StepParser(text, this.ingredients);
        return {
          method: step.method,
          tools: step.tools,
          ingredients: step.ingredientsUsed,
        };
      }
    }).toArray();
  }
}
