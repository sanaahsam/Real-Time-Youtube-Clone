const SubscriberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AppUser",
    required: true,
  },
  name: {
    type: String,
  },
  handle: {
    type: String,
  },
});

export const Subschema = mongoose.model("Subscriber", UserSchema);
