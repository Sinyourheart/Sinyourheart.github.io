module.exports = (sequelize, DataTypes) => {
  const Gas = sequelize.define(
    "Gas",
    {
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      suburb: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emissionPerYear: {
        type: DataTypes.FLOAT, // or DataTypes.INTEGER or DataTypes.DOUBLE
        allowNull: false,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
  return Gas;
};
