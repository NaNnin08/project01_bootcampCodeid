const employees = (sequelize, DataTypes)=> {
    const Employees= sequelize.define('employees', {
      empe_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      empe_full_name: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      empe_email: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      empe_birtdate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      empe_phone_number: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      empe_hiredate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      empe_salary: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      empe_position: {
        type: DataTypes.STRING,
        allowNull: false
      },
      empe_department_name: {
        type: DataTypes.STRING(35),
        allowNull: true
      },
      empe_image: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'employees',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "employees_pkey",
          unique: true,
          fields: [
            { name: "empe_id" },
          ]
        },
      ]
    });
    return Employees;
  };
  
  export default employees;