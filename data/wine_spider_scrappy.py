from pathlib import Path
from scrapy.crawler import CrawlerProcess
import scrapy
import time

class MySpider(scrapy.Spider):
    name = "wine_spider"
    start_urls = [
        'https://www.vivino.com/explore?e=eJzLLbI1VMvNzLM1UMtNrLA1NTBQS660dfZQSwYSbmoFQNn0NNuyxKLM1JLEHLX8ohRbtfykSlu18pLoWKAkmDIC6ikG0mlFUEZmCZSRnAFlpBZDGYlFAFK8JlE%3D'
    ]
    custom_settings = {
        'FEEDS': {
            'data/wine_scrapped_data.json': {
                'format': 'json',
                'encoding': 'utf8',
                'overwrite': True,
            }
        },
        #'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    }

    def parse(self, response):
        print(response.css('h2::text').getall())
        for wine in response.css('div.card__card--2R5Wh').getall():
            # get title from div class "wineInfoVintage__vintage--VvWlU wineInfoVintage__truncate--3QAtw" and return the text
            print('hello')
            title = wine.css('div.wineInfoVintage__vintage--VvWlU.wineInfoVintage__truncate--3QAtw::text').get()
            print(title)
            yield {
                'title': title,
            }
            break

        
if __name__ == "__main__":
    # create a scrapy project
    process = CrawlerProcess()
    # add spider to the project
    process.crawl(MySpider)
    # start the crawler
    process.start()
