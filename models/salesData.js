module.exports = function (sequelize, DataTypes) {
  const salesData = sequelize.define('salesData', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNulls: false,
      required: true,
    },
    date: { type: DataTypes.DATE },
    data: {
      type: DataTypes.INTEGER,
    },
  });

  return salesData;
};
