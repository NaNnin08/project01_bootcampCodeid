import users from './users';
import employees from './employees';
import projects from './projects';
import pa from './pa';
import Sequelize from 'sequelize';
import { sequelize } from '../../config/config-db';

const models = {
    Users: users(sequelize, Sequelize),
    Employees: employees(sequelize, Sequelize),
    Projects: projects(sequelize, Sequelize),
    Pa: pa(sequelize, Sequelize),

}

//4. create relation OneToMany | ManyToMany
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

// 5. export sequalize agar bisa di-call di module lain
export default models;