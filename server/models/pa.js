const pa = (sequelize, DataTypes)=> {
    const Pa= sequelize.define('projects_assignment', {
        pras_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        pras_staus: {
          type: DataTypes.STRING(15),
          allowNull: true
        },
        pras_proj_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'projects',
            key: 'proj_id'
          }
        },
        pras_empe_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'employees',
            key: 'empe_id'
          },
          unique: "projects_assignment_pras_empe_id_key"
        }
      }, {
        sequelize,
        tableName: 'projects_assignment',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: "projects_assignment_pkey",
            unique: true,
            fields: [
              { name: "pras_id" },
            ]
          },
          {
            name: "projects_assignment_pras_empe_id_key",
            unique: true,
            fields: [
              { name: "pras_empe_id" },
            ]
          },
        ]
      });
    return Pa;
  };
  
  export default pa;