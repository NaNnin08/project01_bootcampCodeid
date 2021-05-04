const pa = (sequelize, DataTypes) => {
  const Pa = sequelize.define(
    "projects_assignment",
    {
      pras_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      pras_staus: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      pras_proj_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "projects",
          key: "proj_id",
        },
      },
      pras_empe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "employees",
          key: "empe_id",
        },
      },
    },
    {
      sequelize,
      tableName: "projects_assignment",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "projects_assignment_pkey",
          unique: true,
          fields: [{ name: "pras_id" }],
        },
      ],
    }
  );

  Pa.associate = (models) => {
    Pa.belongsTo(models.Projects, { foreignKey: "pras_proj_id" });
    Pa.belongsTo(models.Employees, {
      foreignKey: "pras_empe_id",
    });
  };

  // Pa.associate = (models) => {
  //   Pa.belongsTo(models.Employees, {
  //     as: "empid",
  //     foreignKey: "pras_empe_id",
  //   });
  // };

  return Pa;
};

export default pa;
