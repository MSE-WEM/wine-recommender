from pathlib import Path
from scrapy.crawler import CrawlerProcess
import scrapy
from bs4 import BeautifulSoup


class MySpider(scrapy.Spider):
    name = "recipe_spider"
    start_urls = [
        'https://www.marmiton.org/recettes/index/categorie/plat-principal/'
    ]
    custom_settings = {
        'FEEDS': {
            'data/recipe_scrapped_data.json': {
                'format': 'json',
                'encoding': 'utf8',
                'overwrite': True,
            }
        },
        'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    }

    def parse(self, response):
        for recipe in response.css("div.recipe-card"):
            title = recipe.css("h4.recipe-card__title::text").get()
            link = recipe.css('a.recipe-card-link::attr(href)').get()
            tag = recipe.css('ul.recipe-card__tags li.mrtn-tag.mrtn-tag--dark::text').get()            
            yield response.follow(link, callback=self.parse_recipe, meta={'title': title, 'link': link, 'tag': tag})
        
        next_pages = response.css('nav.af-pagination a::attr(href)').getall()
        if next_pages is not None:
            for next_page in next_pages:
                yield response.follow(next_page, callback=self.parse)

    def parse_recipe(self, response):
        quantites_not_filtered = []
        quantites = []
        ingredients = []
        quantites_ingredients = []
        
        for span in response.css('span.SHRD__sc-10plygc-0.epviYI').getall():
            text = extract_span_text(span)
            quantites_not_filtered.append(text)

        for span in response.css('span.SHRD__sc-10plygc-0.kWuxfa').getall():
            text = extract_span_text(span)
            ingredients.append(text)

        # For each quantity, remove the \xa0 and append them to quantites, and remove the tag <sup> and </sup> and <sub> and </sub> and remove useless spaces
        for i in range(len(quantites_not_filtered)):
            quantites.append(quantites_not_filtered[i].replace('\xa0', '').replace('<sup>', '').replace('</sup>', '').replace('<sub>', '').replace('</sub>', ''))

        # Fore each quantity, if there is 2 spaces, remove the first one
        for i in range(len(quantites)):
            if quantites[i].count(' ') == 2:
                quantites[i] = quantites[i].replace(' ', '', 1)
            
        # For each quantity, remove '' and append them to quantites
        for i in range(len(quantites)):
            quantites[i] = list(filter(None, quantites[i]))

        # For each quantity, concatenate the quantity[0] with quantity[1] and append them to quantites
        for i in range(len(quantites)):
            quantites[i] = ''.join(quantites[i])

        # If the ingredients contains a space at the end, remove it
        for i in range(len(ingredients)):
            if ingredients[i].endswith(' '):
                ingredients[i] = ingredients[i][:-1]

        for i in range(len(quantites)):
            quantites_ingredients.append(quantites[i] + ' ' + ingredients[i])


        yield {
            'title': response.meta['title'],
            'link': response.meta['link'],
            'tag': response.meta['tag'],
            'quantite': str(quantites),
            'ingredient': str(ingredients),
            'quantite_ingredient': str(quantites_ingredients),
        }


def extract_span_text(html):
    soup = BeautifulSoup(html, 'html.parser')
    span = soup.find('span', class_='SHRD__sc-10plygc-0')
    span_text = ''
    for child in span.children:
        if child.name == 'span':
            span_text += child.text
        else:
            span_text += str(child)
    return span_text

if __name__ == "__main__":
    # create a scrapy project
    process = CrawlerProcess()
    # add spider to the project
    process.crawl(MySpider)
    # start the crawler
    process.start()
