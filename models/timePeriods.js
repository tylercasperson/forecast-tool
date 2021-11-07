module.exports = function (sequelize, DataTypes) {
  const timePeriods = sequelize.define('timePeriods', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNulls: false,
      required: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
  });

  timePeriods.associate = (models) => {
    timePeriods.hasMany(models.data, {
      onDelete: 'cascade',
    });
  };

  return timePeriods;
};
