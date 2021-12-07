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
  });

  timePeriodTypes.associate = (models) => {
    timePeriodTypes.hasMany(models.timePeriods, {
      target: 'timePeriodTypeID',
      onDelete: 'cascade',
    });
  };

  return timePeriodTypes;
};
