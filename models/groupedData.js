module.exports = function (sequelize, DataTypes) {
  const groupedData = sequelize.define('groupedData', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNulls: false,
      required: true,
    },
    data: {
      type: DataTypes.INTEGER,
    },
    timePeriodId: {
      type: DataTypes.INTEGER,
    },
    dataTypeId: { type: DataTypes.INTEGER },
  });

  groupedData.associate = (models) => {
    groupedData.belongsTo(models.timePeriods, {
      onDelete: 'cascade',
    }),
      groupedData.belongsTo(models.dataTypes, {
        onDelete: 'cascade',
      });
  };

  return groupedData;
};
