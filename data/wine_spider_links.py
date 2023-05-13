from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import uuid
import time
import json

def scroll_down(driver):
    """A method for scrolling the page."""

    # Get scroll height.
    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:

        # Scroll down to the bottom.
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # Wait to load the page.
        time.sleep(3.5)

        # Calculate new scroll height and compare with last scroll height.
        new_height = driver.execute_script("return document.body.scrollHeight")

        if new_height == last_height:
            break

        last_height = new_height


# Set up the webdriver
driver = webdriver.Firefox()
driver.maximize_window()

# Navigate to the URL
driver.get("https://www.vivino.com/explore?e=eJzLLbI11rNQy83MszU3UMtNrLA1NDRQS660dfZQSwYSbmoFtoZq6Wm2ZYlFmakliTlq-UUptmr5SZW2auUl0bFAyeTKYiCdnAEAW1sXrQ%3D%3D")

# Wait for the page to load and the div to be present
wait = WebDriverWait(driver, 10)

scroll_down(driver)

a_tags = driver.find_elements(By.CLASS_NAME, 'wineCard__cardLink--3F_uB')
# get the href attribute for each a tag
hrefs = [a_tag.get_attribute('href') for a_tag in a_tags]
print(len(hrefs))
# save the hrefs to a file
with open('wine_links.json', 'w') as f:
    json.dump(hrefs, f)
driver.quit()

