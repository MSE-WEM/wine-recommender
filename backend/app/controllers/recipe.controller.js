const db = require("../models");
const Recipe = db.recipes;

// Create and Save a new Recipe
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Recipe
    const recipe = new Recipe({
        name: req.body.name,
        type: req.body.type,
        ingredients: req.body.ingredients,
        url: req.body.url,
        pairings_embedding: req.body.pairings_embedding
    });

    // Save Recipe in the database
    recipe
        .save(recipe)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Recipe."
            });
        });
};

// Create many new Recipes
exports.createMany = (req, res) => {
    // Validate request
    if (!req.body.recipes) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Recipe
    const recipes = req.body.recipes.map(recipe => {
        return new Recipe({
            name: recipe.name,
            type: recipe.type,
            ingredients: recipe.ingredients,
            url: recipe.url,
            pairings_embedding: recipe.pairings_embedding
        });
    });

    // Save Recipe in the database
    Recipe.insertMany(recipes)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Recipe."
            });
        });
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Recipe.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Recipes."
            });
        });
};

// Find a single Recipe with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Recipe.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Recipe with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Recipe with id=" + id });
        });
};

// Update a Recipe by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Recipe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found!`
                });
            } else res.send({ message: "Recipe was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Recipe with id=" + id
            });
        });
};

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Recipe.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`
                });
            } else {
                res.send({
                    message: "Recipe was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Recipe with id=" + id
            });
        });
};

// Delete all Recipes from the database.
exports.deleteAll = (req, res) => {
    Recipe.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Recipes were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Recipes."
            });
        });
};

// Find by name and/or ingredients
exports.findByNameAndIngredients = (req, res) => {
    const name = req.query.name;
    const ingredients = req.query.ingredients;

    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    if (ingredients) {
        condition.ingredients = { $all: ingredients.split(',') };
    }

    Recipe.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Recipes."
            });
        });
}

// Find all ingredients
exports.findAllIngredients = (req, res) => {
    // ingredients are stored as an array of strings in each recipe
    // we need to get all ingredients from all recipes and then remove duplicates
    Recipe.find({})
        .then(data => {
            const ingredients = data.reduce((acc, recipe) => {
                return acc.concat(recipe.ingredients);
            }, []);
            const uniqueIngredients = [...new Set(ingredients)];
            res.send(uniqueIngredients);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Recipes."
            });
        });
}

