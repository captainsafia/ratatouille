import pos from 'pos';
import { tools } from './phrases';

class StepParser {
  constructor(text) {
    this.strings = this.parseText(text);
  }

  parseText(text) {
    return text.toLowerCase()
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
                .split(' ');
  }

  get method() {
    const words = new pos.Lexer().lex(this.strings.join(' '));
    const taggedWords = new pos.Tagger().tag(words);
    return taggedWords.filter((tag) => tag[1] === 'VB').map((tag) => tag[0]);
  }

  get tools() {
    return null;
  }

  get ingredients() {
    return null;
  }
}

export default class StepsParser {
  constructor($) {
    this.$ = $;
  }

  get steps() {
    return (this.$('.recipe-directions__list--item')).map((index, element) => {
      if (element.children.length > 0) {
        const text = element.children[0].data;
        const step = new StepParser(text);
        return {
          method: step.method,
          tools: step.tools,
          ingredients: step.ingredients,
        };
      }
    }).toArray();
  }
}
