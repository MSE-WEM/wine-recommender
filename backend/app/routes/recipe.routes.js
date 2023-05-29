module.exports = app => {
    const recipes = require("../controllers/recipe.controller.js");

    var router = require("express").Router();
    
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
