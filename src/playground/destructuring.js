const person = {
    name: 'ahmad',
    age: '35',
    location: {
        city: 'lahore',
        temp: '27'
    }
}

const {name = 'Anonymous', age} = person;

console.log(`${name} is ${age} years old.`);

const {city, temp: temperature = '0'} = person.location;

console.log(`Temperature is ${temperature} in ${city}`);