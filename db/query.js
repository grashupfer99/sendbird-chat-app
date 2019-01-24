const Sequelize = require('sequelize');
const sequelize = require('./db-init').sequelize;

module.exports = {
  getList: async function(){
    try {
      return await sequelize.query(
        `SELECT A.PID, A.BIRTH, A.SEX, A.FILE_ATTACH, B.ROLE, B.STATUS, C.NAME, C.TID
        FROM MEMBER AS A
          INNER JOIN TEAM_MEMBER AS B ON B.PID = A.PID
          INNER JOIN TEAM AS C ON C.TID = B.TID`,
        { type: Sequelize.QueryTypes.SELECT }
      );
    } catch (err) {
      throw Error; 
    }
  },
  getTeams: async function(){
    try {
      return await sequelize.query(
        ` SELECT A.TID
        FROM TEAM AS A`,
        { type: Sequelize.QueryTypes.SELECT }
      )
    } catch (err) {
      throw Error
    } 
  },
  getAllMembers: async function(){
    try {
      return await sequelize.query(
        ` SELECT PID, FILE_ATTACH FROM MEMBER`,
        { type: Sequelize.QueryTypes.SELECT }
      )
    } catch (err) {
      throw Error
    } 
  },
};