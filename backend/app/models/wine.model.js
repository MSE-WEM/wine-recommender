module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      winery: String,
      vintage: String,
      img_url: String,
      country: String,
      region: String,
      type: String,
      grapes: [String],
      price: Number,
      pairings: [String],
      average_rating: Number,
      reviews: [String],
      url: String,
      pairings_embedding: [Number],
      sentiment: Number,
      emotion: String
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