module.exports = function (sequelize, DataTypes) {
  const dataTypes = sequelize.define('dataTypes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNulls: false,
      required: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    abbreviation: {
      type: DataTypes.STRING,
    },
    bestToUseWhen: {
      type: DataTypes.STRING,
    },
  });

  return dataTypes;
};
