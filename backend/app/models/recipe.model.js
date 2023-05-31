module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            type: String,
            ingredients: [String],
            url: String,
            embedding: [Number]
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Recipe = mongoose.model("recipe", schema);
    return Recipe;
};
