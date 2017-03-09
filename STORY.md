Ratatouille is a very hacky Node.js scrapper for [AllRecipes.com](http://allrecipes.com/).
When I say very hacky, I mean very hacky.

Ratatouille is the first open source project I've released that spun directly
off of a school project. I'm currently enrolled in a Natural Language Processing
class with a final project that involves scraping the popular recipes website
and applying some transformations to the recipes, for example transforming a
non-vegeterian recipe to a vegeterian recipe.

Web scraping has a special place in my heart. In my early days of tinkering with
search engines and information retrieval systems, I built quite a few web scrapers.
As it just so happens, that I cannot resist a good web scraping challenge. Scraping
AllRecipes.com was particularly tricky, the website uses an Angular front-end and can be
particularly messy to parse. Not to mention the requirements of the project demanded
a high level of precision. It was necessary to extract information like the quantity, the
unit of the quantity, the name, and the preparation method of each ingredient. It also
required that each step in the recipe be parsed to extract the step involved, the ingredients
involved, and the tools involved. You guessed right, natural language processing is a tough task.

Extracting some of the information was quite easy. For example, extracting the
preparation time and the cook time was trivial. It involved using `cheerio` to pull
out attribute in a `time` element. It was only my second time seeing the `<time>` element
used in a page and my first seeing it with a duration as the `datetime` attribute.
This ended up being pretty easy to parse out using `moment.js`.

Parsing out the ingredients list was a little bit trickier. I started off by creating
a list of potential units that would be used in the ingredients list and used that to
find the unit in each ingredient item. The rest of my approach involved a lot
heuristic extraction of the components in each ingredient. Data extraction is an
unsexy process.

The third part of the data extraction involved pulling information about the
steps involved in the recipe. As of now, this is the most in progress part
of the project. Currently, the method is extracted from each step in the recipe
using a simple parts of speech tagger. My plan is to extract the tools used in each
step by correlated the tokens in each sentence with a set of predetermined list
of tools and correlating the ingredients in each step of the recipe with the
ingredients extract in the prior step.

At this point, I should probably sleep and see what ideas float around in my
noggin while I fight the Romulans in my dreams.

