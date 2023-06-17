# Wine Recommender Backend

This is the backend for the wine recommender project. It is an API that serves the wine recommender data.
It uses Node.js and Express.js to serve the wines and recipes data. It also uses MongoDB to store the data paired with MongoExpress to manage the database.

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Build the docker image

    ```bash
    docker-compose build -t "node-app" .
    ```

2. Run the docker container using docker-compose

    ```bash
    docker-compose up
    ```

3. The API should be running on <http://localhost:8085/api>

## API Documentation

### Wines

#### Get all wines

```http
GET /api/wines/all
```

#### Get a wine by id

```http
GET /api/wines/:id
```

#### Create a wine

```http
POST /api/wines
data: {
        "name": "wine name",
        "winery": "wine winery",
        "vintage": wine vintage,
        "img_url": "wine image url",
        "country": "wine country",
        "region": "wine region",
        "type": "wine type",
        "grapes": ["grape 1", "grape 2"],
        "price": wine price,
        "pairings": ["pairing 1", "pairing 2"],
        "average_rating": wine average rating,
        "reviews": ["review 1", "review 2"],
        "url": "wine url",
        "pairings_embedding": [Number, Number],
        "sentiment": wine positive sentiment percentage,
        "emotion": "wine emotion"
}
```

#### Create multiple wines

```http
POST /api/wines/many
data: [
    {
        "name": "wine name",
        "winery": "wine winery",
        "vintage": wine vintage,
        "img_url": "wine image url",
        "country": "wine country",
        "region": "wine region",
        "type": "wine type",
        "grapes": ["grape 1", "grape 2"],
        "price": wine price,
        "pairings": ["pairing 1", "pairing 2"],
        "average_rating": wine average rating,
        "reviews": ["review 1", "review 2"],
        "url": "wine url",
        "pairings_embedding": [Number, Number],
        "sentiment": wine positive sentiment percentage,
        "emotion": "wine emotion"
    },
    {
        "name": "wine name",
        "winery": "wine winery",
        "vintage": wine vintage,
        "img_url": "wine image url",
        "country": "wine country",
        "region": "wine region",
        "type": "wine type",
        "grapes": ["grape 1", "grape 2"],
        "price": wine price,
        "pairings": ["pairing 1", "pairing 2"],
        "average_rating": wine average rating,
        "reviews": ["review 1", "review 2"],
        "url": "wine url",
        "pairings_embedding": [Number, Number],
        "sentiment": wine positive sentiment percentage,
        "emotion": "wine emotion"
    }
]
```

#### Get wines by type and countries

```http
GET /api/wines/type/:type?countries=country1,country2
```

#### Get all countries

```http
GET /api/wines/countries
```

#### Get wines by pairings

```http
GET /api/wines/pairing/type/:type?countries=country1,country2
```

#### Get the price range of wines

```http
GET /api/wines/price
```

#### Update a wine

```http
PUT /api/wines/:id
data: {
        "name": "wine name",
        "winery": "wine winery",
        "vintage": wine vintage,
        "img_url": "wine image url",
        "country": "wine country",
        "region": "wine region",
        "type": "wine type",
        "grapes": ["grape 1", "grape 2"],
        "price": wine price,
        "pairings": ["pairing 1", "pairing 2"],
        "average_rating": wine average rating,
        "reviews": ["review 1", "review 2"],
        "url": "wine url",
        "pairings_embedding": [Number, Number],
        "sentiment": wine positive sentiment percentage,
        "emotion": "wine emotion"
}
```

#### Delete a wine

```http
DELETE /api/wines/:id
```

#### Delete all wines

```http
DELETE /api/wines
```

### Recipes

#### Get all recipes

```http
GET /api/recipes/all
```

#### Get a recipe by id

```http
GET /api/recipes/:id
```

#### Create a recipe

```http
POST /api/recipes
data: {
        "name": "recipe name",
        "type": "recipe type",
        "ingredients": ["ingredient 1", "ingredient 2"],
        "url": "recipe url",
        "pairings_embedding": [Number, Number],
    }
```

#### Create multiple recipes

```http
POST /api/recipes/many
data: [
    {
        "name": "recipe name",
        "type": "recipe type",
        "ingredients": ["ingredient 1", "ingredient 2"],
        "url": "recipe url",
        "pairings_embedding": [Number, Number],
    },
    {
        "name": "recipe name",
        "type": "recipe type",
        "ingredients": ["ingredient 1", "ingredient 2"],
        "url": "recipe url",
        "pairings_embedding": [Number, Number],
    }
]
```

#### Get a recipe by name and ingredients

```http
GET /api/recipes/?name=name&ingredients=ingredient1,ingredient2
```

#### Get all ingredients

```http
GET /api/recipes/ingredients
```

#### Update a recipe

```http
PUT /api/recipes/:id
data: {
        "name": "recipe name",
        "type": "recipe type",
        "ingredients": ["ingredient 1", "ingredient 2"],
        "url": "recipe url",
        "pairings_embedding": [Number, Number],
    }
```

#### Delete a recipe

```http
DELETE /api/recipes/:id
```

#### Delete all recipes

```http
DELETE /api/recipes
```

## Test the API

### Test prerequisites

- [Curl](https://curl.se/download.html)

### Test requests

Send a POST request to <http://localhost:8085/api/wines> with the following data:

```json
{
    "name": "wine name",
    "cave": "wine cave",
    "year": 1998,
    "country": "wine country",
    "type": "wine type",
    "grapes": ["grape 1", "grape 2"],
    "price": 10.99,
    "matching_food": ["food 1", "food 2"],
    "reviews": ["review 1", "review 2"],
    "link": "wine link",
    "name": "wine name",
    "winery": "wine winery",
    "vintage": 1998,
    "img_url": "wine image url",
    "country": "wine country",
    "region": "wine region",
    "type": "wine type",
    "grapes": ["grape 1", "grape 2"],
    "price": 75.00,
    "pairings": ["pairing 1", "pairing 2"],
    "average_rating": 4.8,
    "reviews": ["review 1", "review 2"],
    "url": "wine url",
    "pairings_embedding": [-0.0960286483168602,0.2239583283662796],
    "sentiment": 0.86,
    "emotion": "wine emotion"
}
```

Send a GET request to <http://localhost:8085/api/wines> to see the wine you just created.
(You can also use a browser to see the data)
