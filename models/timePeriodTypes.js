module.exports = function (sequelize, DataTypes) {
  const timePeriodTypes = sequelize.define('timePeriodTypes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNulls: false,
      required: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    dayEquivalent: {
      type: DataTypes.INTEGER,
    },
  });

  timePeriodTypes.associate = (models) => {
    timePeriodTypes.hasMany(models.timePeriods, {
      onDelete: 'cascade',
    });
  };

  return timePeriodTypes;
};
