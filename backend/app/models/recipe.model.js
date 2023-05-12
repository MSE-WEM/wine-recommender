const { v4: uuidv4 } = require('uuid');
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            id: { type: String, default: uuidv4 },
            name: String,
            type: String,
            ingredients: [String],
            link: String,
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
