'use strict';
import  sequelize  from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up:async (queryInterface, Sequelize)=>{
    try {
      await queryInterface.createTable("users",{
        userId: {
          type: sequelize.UUID,
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
      })
      
    } catch (error) {
      console.log("Error rin migrations",error)
    }
    
  },

  down:async (queryInterface, Sequelize)=> {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
