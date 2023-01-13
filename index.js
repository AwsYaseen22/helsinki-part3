const express = require("express");
var morgan = require("morgan");

const app = express();
app.use(express.json());
// app.use(morgan("tiny"));
morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };
// app.use(requestLogger);

app.get("/", (request, response) => {
  response.send("<h1>Phone Book</h1>");
});

app.get("/info", (request, response) => {
  response.send(`
    <h3>Phonebook has infor for ${persons.length} people</h3>
    <h3>${new Date()}</h3>
  `);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const person = persons.filter((p) => p.id === id);
  if (person.length) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const name = request.body.name;
  const number = request.body.number;
  const found = persons.find((p) => p.name === name);
  console.log(found);
  if (!name || !number) {
    return response.status(400).json({
      error: "Please provide name and number",
    });
  }
  if (found) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  const id = Math.ceil(Math.random() * 1000000);
  const person = {
    id: id,
    name: name,
    number: number,
  };
  persons = persons.concat(person);
  return response.json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
