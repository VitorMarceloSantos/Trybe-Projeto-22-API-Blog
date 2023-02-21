const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  User.associate = (models) => {
   User.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'blogPost',
    });
  };
  return User;
};

module.exports = UserModel;