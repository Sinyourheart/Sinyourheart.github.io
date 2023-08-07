const fs = require("fs");
const csv = require("csv-parser");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("CarbonFootprint", "root", "Monash23##", {
  dialect: "mysql", // or another dialect
});

// Import the Postcodes model from its module.
const Postcodes = require("./models/postCodes")(sequelize, Sequelize.DataTypes);

async function populateDataFromCsv() {
  const results = [];
  fs.createReadStream("./sqldata/suburb.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      // Assuming your CSV has columns named 'postcode' and 'suburb'
      for (const item of results) {
        try {
          await Postcodes.create({
            postcode: item.postcode,
            suburb: item.suburb,
          });
          console.log(`Inserted ${item.postcode} - ${item.suburb}`);
        } catch (error) {
          console.error(
            `Failed to insert ${item.postcode} - ${item.suburb}: ${error.message}`
          );
        }
      }
      console.log("Data population completed!");
      sequelize.close();
    });
}

populateDataFromCsv();
