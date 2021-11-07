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
  });

  dataTypes.associate = (models) => {
    dataTypes.hasMany(models.data, {
      onDelete: 'cascade',
    });
  };

  return dataTypes;
};
