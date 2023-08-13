import sequelize, { Model } from "sequelize";
import databaseInstance from "../database";

export interface UserAttribute {
    userId: string
    firstName: string,
    lastName: string,
    email: string
    mobileNumber: string
    password: string
    mobileAuth: string,
    webAuth: string
    role:string
}

export class User extends Model<UserAttribute>{
    declare userId: string;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare mobileNumber: string;
    declare mobileAuth: Text;
    declare password: string
    declare webAuth: Text
    declare role:string
}

User.init({
    userId: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4(),
        autoIncrement:true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    firstName: {
        type: sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize.STRING,
        allowNull: true
    },
    email: {
        type: sequelize.STRING,
        allowNull: true,
        unique: true
    },
    mobileNumber: {
        type: sequelize.BIGINT,
        allowNull: true,
        unique: true
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    mobileAuth:{
        type: sequelize.TEXT,
        allowNull: true
    },
    webAuth: {
        type: sequelize.TEXT,
        allowNull: true
    },
    role:{
        type:sequelize.STRING,
        allowNull:false
    }

}, {
    tableName: 'users',
    paranoid: false,
    timestamps: false,
    sequelize: databaseInstance
})

export default User;