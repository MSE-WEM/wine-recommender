# Wine Recommender Backend
This is the backend for the wine recommender project. It is an API that serves the wine recommender data.
It uses Node.js and Express.js to serve the wines and recipes data. It also uses MongoDB to store the data.

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
3. The API should be running on http://localhost:8085/api

## API Documentation
### Wines
#### Get all wines
```http
GET /api/wines
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
        "cave": "wine cave",
        "year": wine year,
        "country": "wine country",
        "type": "wine type",
        "grapes": ["grape 1", "grape 2"],
        "price": wine price,
        "matching_food": ["food 1", "food 2"],
        "reviews": ["review 1", "review 2"],
        "link": "wine link"
    }
```

#### Update a wine
```http
PUT /api/wines/:id
data: {
        "name": "wine name",
        "cave": "wine cave",
        "year": wine year,
        "country": "wine country",
        "type": "wine type",
        "grapes": ["grape 1", "grape 2"],
        "price": wine price,
        "matching_food": ["food 1", "food 2"],
        "reviews": ["review 1", "review 2"],
        "link": "wine link"
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
GET /api/recipes
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
        "link": "recipe link"
    }
```

#### Update a recipe
```http
PUT /api/recipes/:id
data: {
        "name": "recipe name",
        "type": "recipe type",
        "ingredients": ["ingredient 1", "ingredient 2"],
        "link": "recipe link"
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
### Prerequisites
- [Curl](https://curl.se/download.html)

### Test the API
Send a POST request to http://localhost:8085/api/wines with the following data:
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
    "link": "wine link"
}
```

Send a GET request to http://localhost:8085/api/wines to see the wine you just created.
(You can also use a browser to see the data)