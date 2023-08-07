const fs = require("fs");
const csv = require("csv-parser");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("CarbonFootprint", "root", "Monash23##", {
  dialect: "mysql", // or another dialect
});

// Import the Electricity model from its module.
const Electricity = require("./models/electricity")(
  sequelize,
  Sequelize.DataTypes
);

async function populateElectricityDataFromCsv() {
  const results = [];
  fs.createReadStream("./sqldata/new_ele.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      // Assuming your CSV has columns named 'year', 'postcode', 'suburb', and 'emissionPerYear'
      for (const item of results) {
        try {
          await Electricity.create({
            year: item.year,
            postcode: item.postcode,
            suburb: item.suburb,
            emissionPerYear: parseFloat(item.avg_CO2_kg_per_customer_year), // Ensure this field is a float
          });
          console.log(
            `Inserted ${item.year} - ${item.postcode} - ${item.suburb}`
          );
        } catch (error) {
          console.error(
            `Failed to insert ${item.year} - ${item.postcode} - ${item.suburb}: ${error.message}`
          );
        }
      }
      console.log("Data population completed!");
      sequelize.close();
    });
}

populateElectricityDataFromCsv();
