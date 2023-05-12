module.exports = app => {
    const wines = require("../controllers/wine.controller.js");
    const recipes = require("../controllers/recipe.controller.js");

    var router = require("express").Router();

    // WINES

    // Create a new Wine
    router.post("/wines", wines.create);

    // Retrieve all Wines
    router.get("/wines", wines.findAll);

    // Retrieve a single Wine with id
    router.get("/wines/:id", wines.findOne);

    // Update a Wine with id
    router.put("/wines:id", wines.update);

    // Delete a Wine with id
    router.delete("/wines/:id", wines.delete);

    // Delete all Wines
    router.delete("/", wines.deleteAll);

    // RECIPES

    // Create a new Recipe
    router.post("/recipes", recipes.create);

    // Retrieve all Recipes
    router.get("/recipes", recipes.findAll);

    // Retrieve a single Recipe with id
    router.get("/recipes/:id", recipes.findOne);

    // Update a Recipe with id
    router.put("/recipes:id", recipes.update);

    // Delete a Recipe with id
    router.delete("/recipes/:id", recipes.delete);

    // Delete all Recipes
    router.delete("/", recipes.deleteAll);

    app.use("/api", router);
};
