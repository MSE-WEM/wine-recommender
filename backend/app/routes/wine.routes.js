module.exports = app => {
    const wines = require("../controllers/wine.controller.js");

    var router = require("express").Router();

    // WINES

    // Create a new Wine
    router.post("/wines", wines.create);

    // Create many new Wines
    router.post("/wines/many", wines.createMany);

    // Retrieve all Wines
    router.get("/wines/all", wines.findAll);

    // Retrieve a single Wine with id
    router.get("/wine/:id", wines.findOne);

    // Retrieve wines by type and/or countries
    router.get("/wines/type/:type", wines.findByTypeAndCountries);

    // Retrieve all countries
    router.get("/wines/countries", wines.findAllCountries);

    // Retrieve wines by pairing
    router.get("/wines/pairing/type/:type", wines.findByPairing);

    // Retrieve price range
    router.get("/wines/price", wines.findPriceRange);

    // Update a Wine with id
    router.put("/wines/:id", wines.update);

    // Delete a Wine with id
    router.delete("/wines/:id", wines.delete);

    // Delete all Wines
    router.delete("/", wines.deleteAll);

    app.use("/api", router);
};
