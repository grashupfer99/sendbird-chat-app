const SBdata = require('./SBdata');
const SBActions = require('./SBActions').SBActions;

const clearUsers = async (dbAllMembers) => {

  const sbData = new SBdata();
  const sbActions = new SBActions();
  const sbUsers = await sbData.users();
  const dbMemberIds = dbAllMembers.map(user => user.PID);
  const nonExistentUsers = [];

  sbUsers.map(user => {
    if(dbMemberIds.indexOf(user.user_id) === -1){
      // console.log(`not found in db: ${user.user_id}`);
      nonExistentUsers.push(user.user_id);
    }
  })
  
  // delete non existent users
  for(const item of nonExistentUsers){
    await sbActions.deleteUser(item);
  }

}

module.exports = { clearUsers };

  
  
  