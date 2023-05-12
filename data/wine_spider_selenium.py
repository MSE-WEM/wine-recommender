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
driver.get("https://www.vivino.com/explore?e=eJzLLbI1VMvNzLM1UMtNrLA1NTBQS660dfZQSwYSbmoFQNn0NNuyxKLM1JLEHLX8ohRbtfykSlu18pLoWKAkmDIC6ikG0olFANRdGVE%3D")

# Wait for the page to load and the div to be present
wait = WebDriverWait(driver, 10)

scroll_down(driver)

divs = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.wineInfo__wineInfo--Sx0T0")))

wines_info = {}

# Loop through the divs and print the title
for div in divs:
    cave = div.find_element(By.CSS_SELECTOR, "div.wineInfoVintage__truncate--3QAtw").text
    name = div.find_element(By.CSS_SELECTOR, "div.wineInfoVintage__vintage--VvWlU").text
    location = div.find_element(By.CSS_SELECTOR, "div.wineInfoLocation__regionAndCountry--1nEJz").text
    wines_info[str(uuid.uuid4())] = {
        "cave": cave,
        "name": name,
        "location": location
    }

print(len(wines_info.keys()))
driver.quit()

# save the json
with open("data/wine_scrapped_data.json", "w") as f:
    f.write(json.dumps(wines_info, indent=4))

