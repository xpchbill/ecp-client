const faker = require("faker");

module.exports = Array.from(new Array(15), (_, i) => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  editable: faker.random.boolean(),
  updatedAt: faker.date.past(10),
  status: faker.random.number({ min:5, max:10 }),
  callNo: faker.random.number({ min:100, max:999 }),
  description: '这是一段描述',
  no: `No ${i + 1}`,
  key: i + 1,
  id: i + 111
}));
