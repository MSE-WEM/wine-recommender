const db = require("../models");
const Wine = db.wines;

// Dot product
const dotProduct = (vecA, vecB) => {
    let product = 0;
    for (let i = 0; i < vecA.length; i++) {
        product += vecA[i] * vecB[i];
    }
    return product;
};

// Cosine similarity
const cosineSimilarity = (vecA, vecB) => {
    let dotProd = dotProduct(vecA, vecB);
    let magA = Math.sqrt(dotProduct(vecA, vecA));
    let magB = Math.sqrt(dotProduct(vecB, vecB));
    return dotProd / (magA * magB);
};

// Create and Save a new Wine
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Wine
    const wine = new Wine({
        name: req.body.name,
        winery: req.body.winery,
        vintage: req.body.vintage,
        img_url: req.body.img_url,
        country: req.body.country,
        region: req.body.region,
        type: req.body.type,
        grapes: req.body.grapes,
        price: req.body.price,
        pairings: req.body.pairings,
        average_rating: req.body.average_rating,
        reviews: req.body.reviews,
        url: req.body.url,
        pairings_embedding: req.body.pairings_embedding,
        sentiment: req.body.sentiment,
        emotion: req.body.emotion
    });

    // Save Wine in the database
    wine
        .save(wine)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Wine."
            });
        });
};

// Create many new Wines
exports.createMany = (req, res) => {
    // Validate request
    if (!req.body.wines) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Wine
    const wines = req.body.wines.map(wine => {
        return new Wine({
            name: wine.name,
            winery: wine.winery,
            vintage: wine.vintage,
            img_url: wine.img_url,
            country: wine.country,
            region: wine.region,
            type: wine.type,
            grapes: wine.grapes,
            price: wine.price,
            pairings: wine.pairings,
            average_rating: wine.average_rating,
            reviews: wine.reviews,
            url: wine.url,
            pairings_embedding: wine.pairings_embedding,
            sentiment: wine.sentiment,
            emotion: wine.emotion
        });
    });

    // Save Wine in the database
    Wine.insertMany(wines)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Wine."
            });
        });
};

// Retrieve all Wines from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Wine.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Wines."
            });
        });
};

// Find a single Wine with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Wine.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Wine with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Wine with id=" + id });
        });
};

// Update a Wine by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Wine.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Wine with id=${id}. Maybe Wine was not found!`
                });
            } else res.send({ message: "Wine was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Wine with id=" + id
            });
        });
};

// Delete a Wine with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Wine.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Wine with id=${id}. Maybe Wine was not found!`
                });
            } else {
                res.send({
                    message: "Wine was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Wine with id=" + id
            });
        });
};

// Delete all Wines from the database.
exports.deleteAll = (req, res) => {
    Wine.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Wines were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all wines."
            });
        });
};

// Find all Wines by type and/or countries
exports.findByTypeAndCountries = (req, res) => {
    const type = req.params.type;
    const countries = req.query.countries;
    const priceMin = req.query.priceMin;
    const priceMax = req.query.priceMax;
    var condition = {};
    if (type) {
        condition.type = type === "red" ? "Vin rouge" : "Vin blanc";
    }
    if (countries) {
        condition.country = { $in: countries.split(',') };
    }
    if (priceMin && priceMax) {
        condition.price = { $gte: priceMin, $lte: priceMax };
    } else if (priceMin) {
        condition.price = { $gte: priceMin };
    } else if (priceMax) {
        condition.price = { $lte: priceMax };
    }

    Wine.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving Wines with type ${type} and countries ${countries}.`
            });
        });
}

// Find all countries
exports.findAllCountries = (req, res) => {
    const type = req.query.type;
    var condition = {};
    if (type) {
        condition.type = type === "red" ? "Vin rouge" : "Vin blanc";
    }

    Wine.find(condition)
        .distinct('country')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving countries with type ${type}.`
            });
        });
}

// Get the wines price range
exports.findPriceRange = (req, res) => {
    Wine.find({})
        .then(data => {
            const prices = data.map(wine => wine.price);
            res.send({
                min: Math.min(...prices),
                max: Math.max(...prices)
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving price range with type ${type}.`
            });
        });
}

// Get wines that has most similar pairing as current recipe
exports.findByPairing = (req, res) => {
    let recipePairingEmbedding = req.query.pairing.split(',').map(Number);
    const type = req.params.type;
    const countries = req.query.countries;
    const priceMin = req.query.priceMin;
    const priceMax = req.query.priceMax;
    const nbWines = req.query.nbWines;
    var condition = {};
    if (type) {
        condition.type = type === "red" ? "Vin rouge" : "Vin blanc";
    }
    if (countries) {
        condition.country = { $in: countries.split(',') };
    }
    if (priceMin && priceMax) {
        condition.price = { $gte: priceMin, $lte: priceMax };
    } else if (priceMin) {
        condition.price = { $gte: priceMin };
    } else if (priceMax) {
        condition.price = { $lte: priceMax };
    }
    Wine.find(condition)
        .then(data => {
            const wines = data.map(wine => {
                wineObject = wine.toObject();
                return {
                    // return wine object but add similarity field
                    ...wineObject,
                    similarity: cosineSimilarity(wineObject.pairings_embedding, recipePairingEmbedding)
                }
            });
            wines.sort((a, b) => b.similarity - a.similarity);
            res.send(wines.slice(0, nbWines));
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving wines with pairing ${recipePairingEmbedding}.`
            });
        });
}
