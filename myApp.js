require("dotenv").config();

// Solution 1

const mongoose = require("mongoose");
const { Schema, model } = require('mongoose');


const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected to", mongoURI);
  })
  .catch((error) => {
    console.error("Error", error);
  });

// Solution 2

const personSchema = new Schema({
    name: {
      type: String,
      unique: true
    },
    age: Number,
    favoriteFoods: [String]
});
  
const Person = model('Person', personSchema)
  

// Solution 3

const createAndSavePerson = async (done) => {
  const document = new Person({
    name: "Juan",
    age: 18,
    favoriteFoods: ["hambuger", "eggs"]
  });

  await document.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

// Solution 4

const arrayOfPeople = [
  {
    name: "Red",
    age: 17,
    favoriteFoods: ["eggs", "tomato"]
  },
  {
    name: "Blue",
    age: 19,
    favoriteFoods: ["chicken", "apple"]
  },
  {
    name: "Green",
    age: 17,
    favoriteFoods: ["noodles"]
  }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
      if (err) return console.log(err);
      done(null, people);   
    });
};

// Solution 5

const findPeopleByName = async (personName, done) => {
  await Person.find({name: personName}, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);  
  });
};

// Solution 6

const findOneByFood = async (food, done) => {
  await Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

// Solution 7

const findPersonById = async (personId, done) => {
  await Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

// Solution 8

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";

  await Person.findById(personId, (err, person) => {
    if(err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson);
    })
  })
};

// Solution 9

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;

  await Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

// Solution 10

const removeById = async (personId, done) => {
  await Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if(err) return console.log(err);
    done(null, removedDoc);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
