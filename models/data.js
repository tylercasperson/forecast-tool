module.exports = function (sequelize, DataTypes) {
  const data = sequelize.define('data', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNulls: false,
      required: true,
    },
    data: {
      type: DataTypes.INTEGER,
    },
  });

  data.associate = (models) => {
    data.belongsTo(models.dataTypes, {
      onDelete: 'cascade',
    });
    data.belongsTo(models.timePeriods, {
      onDelete: 'cascade',
    });
  };

  return data;
};
