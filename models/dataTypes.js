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
    calculation: {
      type: DataTypes.STRING,
    },
  });

  dataTypes.associate = (models) => {
    dataTypes.hasMany(models.groupedData, {
      onDelete: 'cascade',
    });
  };

  return dataTypes;
};
