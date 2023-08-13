import { Sequelize } from "sequelize";
import path from "path";
const Umzug = require('umzug');



/** This the Sequelize connection with FPH database. */
export const databaseInstance = new Sequelize("Dummy","root","rgbXYZ@9182",{
  host: 'localhost',
  dialect :  "mysql",
  logging:false

});



async function initDB() {

  try {
   
    databaseInstance.authenticate().then(async () => {
     
       migrate
        .up()
        .then(async (onFullfill: any) => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          console.log("step5",err)
          return Promise.reject();
        });
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
console.log( path.join(__dirname, './migrations'))

const migrate = new Umzug({
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /\.js$/,
    params: [databaseInstance.getQueryInterface(), Sequelize],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize: databaseInstance,
  },
  logger: console
})




export async function initMySQLConnection() {
  await initDB();
}
export default databaseInstance