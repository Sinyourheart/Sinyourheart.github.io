module.exports = (sequelize, DataTypes) => {
  const Postcodes = sequelize.define(
    "Postcodes",
    {
      postcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      suburb: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );

  return Postcodes;
};
