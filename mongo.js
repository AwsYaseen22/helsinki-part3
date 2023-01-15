const mongoose = require("mongoose");

let create = false;

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

if (process.argv.length === 5) {
  create = true;
}

const password = process.argv[2];

const url = `mongodb+srv://AwsYaseen22:${password}@part3-c.13dowqj.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");
    if (create) {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    } else {
      return Person.find({});
    }
  })
  .then((result) => {
    if (create) {
      console.log(`added ${result.name} number ${result.number} to phonebook`);
    } else {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
    }
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
