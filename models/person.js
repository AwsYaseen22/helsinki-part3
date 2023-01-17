const mongoose = require("mongoose");

const personSchema = mongoose.Schema({
  name: { type: String, minLength: 3, required: true, unique: true },
  number: {
    type: String,
    minLength: 8,
    required: [true, "Phone number required"],
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{1,}/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! shoudl be formated as 123-456789*`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
