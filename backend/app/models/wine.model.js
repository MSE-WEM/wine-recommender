const { v4: uuidv4 } = require('uuid');
module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      id: { type: String, default: uuidv4 },
      name: String,
      cave: String,
      year: Number,
      country: String,
      type: String,
      grapes: [String],
      price: Number,
      matching_food: [String],
      reviews: [String],
      link: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Wine = mongoose.model("wine", schema);
  return Wine;
};