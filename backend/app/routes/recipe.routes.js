module.exports = app => {
    const recipes = require("../controllers/recipe.controller.js");

    var router = require("express").Router();
    
    // RECIPES

    // Create a new Recipe
    router.post("/recipes", recipes.create);

    // Create many new Recipes
    router.post("/recipes/many", recipes.createMany);

    // Retrieve all Recipes
    router.get("/recipes/all", recipes.findAll);

    // Retrieve a single Recipe with id
    router.get("/recipe/:id", recipes.findOne);

    // Retrieve recipes by name and/or ingredients
    router.get("/recipes", recipes.findByNameAndIngredients);

    // Retrieve all ingredients
    router.get("/recipes/ingredients", recipes.findAllIngredients);

    // Update a Recipe with id
    router.put("/recipe/:id", recipes.update);

    // Delete a Recipe with id
    router.delete("/recipe/:id", recipes.delete);

    // Delete all Recipes
    router.delete("/", recipes.deleteAll);

    app.use("/api", router);
};
