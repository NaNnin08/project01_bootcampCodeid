const projects = (sequelize, DataTypes) => {
  const Projects = sequelize.define(
    "projects",
    {
      proj_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      proj_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      proj_create: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      proj_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      proj_end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      proj_category: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      proj_description: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "projects",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "projects_pkey",
          unique: true,
          fields: [{ name: "proj_id" }],
        },
      ],
    }
  );

  Projects.associate = (models) => {
    Projects.hasMany(models.Pa, {
      foreignKey: "pras_proj_id",
      onDelete: "CASCADE",
    });
  };

  return Projects;
};

export default projects;
