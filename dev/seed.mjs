/**
 * This file is used to seed the database with data
 * based on the Customer model.
 *
 */
import { fakerNL as faker } from "@faker-js/faker";
import fs from "fs";

function seedDatabase() {
  // Construct initials (1-3)
  const initials = Array.from({ length: faker.number.int({ min: 1, max: 3 }) })
    .map(() => faker.string.alpha({ length: 1, casing: "upper" }))
    .join(".");

  return {
    id: faker.string.uuid(),
    initials,
    surname: faker.person.lastName(),
    sex: faker.person.sexType(),
    birthDate: faker.date.past({ years: 80 }).toLocaleDateString("nl-NL"),
    streetName: faker.location.street(),
    postalCode: faker.location.zipCode(),
    houseNumber: faker.number.int({ min: 1, max: 100 }).toString(),
    houseNumberExtension:
      Math.random() > 0.95 ? faker.string.alphanumeric({ length: 1 }) : null,
  };
}

fs.open("customers.json", "w", (err, fd) => {
  if (err) throw err;
  fs.write(
    fd,
    JSON.stringify(Array.from({ length: 1000 }).map(seedDatabase), null, 2),
    (err) => {
      if (err) throw err;
      fs.close(fd, (err) => {
        if (err) throw err;
      });
    }
  );
});
