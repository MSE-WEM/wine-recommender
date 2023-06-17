from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import uuid
import time
import json
import time

links = {
    'suisse': 'https://www.vivino.com/explore?e=eJzLLbI11rNQy83MszVQy02ssDU0NVBLrrR19lBLBhJuagW2hmrpabZliUWZqSWJOWr5RSm2avlJlbZq5SXRsUBJMGUE1FMMpJMzAPZAGbI%3D',
    'amerique': 'https://www.vivino.com/explore?e=eJzLLbI11rNQy83MszVQy02ssDU0NVBLrrR19lBLBhJuagW2hmrpabZliUWZqSWJOWr5RSm2avlJlbZq5SXRsUBJMGUE1FMMpBOLoIzSYgDtnR0M',
    'fr_blanc': 'https://www.vivino.com/explore?e=eJzLLbI11rNQy83MszVQy02ssDU0NVBLrrR19lBLBhJuagW2hmrpabZliUWZqSWJOWr5RSm2avlJlbZq5SXRsbZGQMXFQDqtCABLOBeI',
    'fr_rouge_50': 'https://www.vivino.com/explore?e=eJzLLbI11rNQy83MszVQy02ssDU1UEuutHX2UEsGEm5qBbaGaulptmWJRZmpJYk5avlFKbZq-UmVtmrlJdGxQMnkymIgnVYEADsPF1Y%3D',
    'fr_rouge_150': 'https://www.vivino.com/explore?e=eJzLLbI11rNQy83MszU1UMtNrLA1BNLJlbbOHmrJQMJNrcDWUC09zbYssSgztSQxRy2_KMVWLT-p0latvCQ6FiiZXFkMpNOKAFvLF7w%3D',
    'it_rouge': 'https://www.vivino.com/explore?e=eJzLLbI11rNQy83MszVQy02ssDU0NVBLrrR19lBLBhJuagW2hmrpabZliUWZqSWJOWr5RSm2avlJlbZq5SXRsUDJ5MpiIJ1ZAgBLNheM',
    'it_blanc': 'https://www.vivino.com/explore?e=eJzLLbI11rNQy83MszVQy02ssDU0NVBLrrR19lBLBhJuagW2hmrpabZliUWZqSWJOWr5RSm2avlJlbZq5SXRsbZGQMXFQDqzBABLQBeN',
    'espagne': 'https://www.vivino.com/explore?e=eJzLLbI11rNQy83MszVQy02ssDU0NVBLrrR19lBLBhJuagW2hmrpabZliUWZqSWJOWr5RSm2avlJlbZq5SXRsbZGEMoQqKcYSKcWAwD2Vhm_',
}

def get_links(driver,  items_to_fetch=100):
    """A method for scrolling the page.
    param driver: selenium driver
    param items_to_fetch: number of items to fetch
    """
    hrefs = []

    while len(hrefs) < items_to_fetch:
        # Scroll down to the bottom.
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)

        # every five minutes, check if we there are 2184 links
        a_tags = driver.find_elements(By.CLASS_NAME, 'wineCard__cardLink--3F_uB')
        # get the href attribute for each a tag
        hrefs = [a_tag.get_attribute('href') for a_tag in a_tags]

    return hrefs

# Set up the webdriver
driver = webdriver.Firefox()
driver.maximize_window()

# Wait for the page to load and the div to be present
wait = WebDriverWait(driver, 5)

hrefs = []

for link in links.keys():
    print("Getting links for {}".format(link))
    driver.get(links[link])
    wait = WebDriverWait(driver, 5)
    hrefs.extend(get_links(driver,  items_to_fetch=250))

print("Got {} links".format(len(hrefs)))

# save the hrefs to a file
with open('data/wine_links.json', 'w') as f:
    # append the hrefs to the file
    json.dump(hrefs, f, indent=4)
driver.quit()

