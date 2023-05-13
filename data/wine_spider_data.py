from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import uuid
import time
import json
import traceback

# load json file "wine_links.json" into a list
with open('wine_links.json', 'r') as f:
    hrefs = json.load(f)

def scroll_down(driver):
    """A method for scrolling the page."""

    # Get scroll height.
    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        # Scroll down to the bottom.
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        # Wait to load the page.
        time.sleep(2)
        # Calculate new scroll height and compare with last scroll height.
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break

        last_height = new_height

def parse_wine_page(driver):
    # picture class (class name begins with "bottleShot" and may have more classes)
    picture_class = driver.find_element(By.CSS_SELECTOR, "picture[class^='bottleShot']")
    # get pairings div
    driver.execute_script("window.scrollBy(0, window.innerHeight * 1);")
    WebDriverWait(driver, 1.5).until(EC.presence_of_element_located((By.CSS_SELECTOR, "div[class='foodPairing__foodContainer--1bvxM']")))
    pairing_div = driver.find_element(By.CSS_SELECTOR, "div[class='foodPairing__foodContainer--1bvxM']")
    # get text from all divs with no class in the pairings div
    pairings = [div.text.strip() for div in pairing_div.find_elements(By.CSS_SELECTOR, "div:not([class])")]
    WebDriverWait(driver, 1.5).until(EC.presence_of_element_located((By.CSS_SELECTOR, "a[class='anchor_anchor__m8Qi- reviewAnchor__anchor--2NKFw communityReview__reviewContent--3xA5s']")))
    reviews = driver.find_elements(By.CSS_SELECTOR, "a[class='anchor_anchor__m8Qi- reviewAnchor__anchor--2NKFw communityReview__reviewContent--3xA5s']")
    # Wait for the page to load and the div to be present
    scroll_down(driver)
    return {
        'name': driver.find_element(By.CLASS_NAME, 'wine').text.strip(),
        'winery': driver.find_element(By.CLASS_NAME, 'winery').text.strip(),
        'vintage': driver.current_url.split('year=')[1].split('&')[0],
        'img_url': picture_class.find_element(By.TAG_NAME, 'img').get_attribute('src'),
        'country': driver.find_element(By.CSS_SELECTOR, "a[data-cy='breadcrumb-country']").text,
        'region': driver.find_element(By.CSS_SELECTOR, "a[data-cy='breadcrumb-region']").text,
        'type': driver.find_element(By.CSS_SELECTOR, "a[data-cy='breadcrumb-winetype']").text,
        'grapes': [a_tag.text for a_tag in driver.find_elements(By.CSS_SELECTOR, "a[href^='/grapes/']")],
        # get the price only as a number
        'price': driver.find_element(By.CSS_SELECTOR, "span.purchaseAvailability__currentPrice--3mO4u").text.split(' ')[0],
        'pairings': pairings,
        'reviews': [
            {
                'rating': review.find_element(By.CSS_SELECTOR, "span[class='userRating_ratingNumber__cMtKU']").text.replace(',', '.'),
                'text': review.find_element(By.CSS_SELECTOR, "span[class='communityReview__reviewText--2bfLj']").text
            }
            for review in reviews
        ],
        'average_rating': driver.find_element(By.CSS_SELECTOR, "div[class='vivinoRating_averageValue__uDdPM']").text.replace(',', '.'),
        'url': driver.current_url,
    }

data = []

# create a new Firefox session
driver = webdriver.Firefox()
# get a random first page
driver.get("https://google.ch")
# maximize the browser window
driver.maximize_window()

error_links = []

# For each href in the list
for href in hrefs:
    # open new tab
    driver.execute_script("window.open('');")
    # switch to the new window
    driver.switch_to.window(driver.window_handles[1])
    # navigate to the page
    driver.get(href)
    # parse the page
    try:
        data.append(parse_wine_page(driver))
    except:
        # print stack trace
        traceback.print_exc()
        print('Missing data for: ' + href)
        error_links.append(href)
    # close the tab
    driver.close()
    # switch back to the first tab
    driver.switch_to.window(driver.window_handles[0])

# close the browser window
driver.quit()

print('Missing data for ' + str(len(error_links)) + ' links on ' + str(len(hrefs)) + ' links')
print('The missing links are: ')
print(error_links)

# save the hrefs to a file
with open('selenium_wine_scrapped_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

