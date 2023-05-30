module.exports = app => {
    const wines = require("../controllers/wine.controller.js");

    var router = require("express").Router();

    // WINES

    // Create a new Wine
    router.post("/wines", wines.create);

    // Create many new Wines
    router.post("/wines/many", wines.createMany);

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

    app.use("/api", router);
};
