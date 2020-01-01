const faker = require("faker");

module.exports = Array.from(new Array(85), (_, i) => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  editable: faker.random.boolean(),
  updatedAt: faker.date.past(10),
  status: faker.random.number({ min:0, max:3 }),
  updated_at: faker.date.recent(),
  description: '这是一段描述',
  call_no: faker.random.number({ min:100, max:999 }),
  no: `No ${i + 1}`,
  key: i + 1,
  id: i + 1
}));
