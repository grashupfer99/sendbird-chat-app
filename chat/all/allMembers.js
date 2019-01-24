const SBdata = require('../util/SBdata');
const SBActions = require('../util/SBActions').SBActions;
const config = require('../../config/config.json');
const sbData = new SBdata();
const sbActions = new SBActions();

const allMembers = async (dbAllMembers, pid) => {
  const data = { pid: '', tid: '' };
  const dbMemberFound = dbAllMembers.findIndex(member => member.PID === pid) > -1;
  const isUser = await sbData.isUser(pid);

  // found in DB
  if (dbMemberFound) {
    data.pid = pid;
    data.tid = config.baseGroupChatUrl + config.allMembers;
    const userIndex = dbAllMembers.findIndex(member => member.PID === pid);
    // SB user ?
    if (isUser) {
      // yes -
      // group member ?
      const isGroupMember = await sbData.isGroupMember(config.allMembers, pid);
      if (!isGroupMember) {
        // no - join
        await sbActions.inviteToGroupChat(config.allMembers, pid);
      }
    } else {
      // no ?
      // create user, join group
      await sbActions.createUser(dbAllMembers[userIndex].PID, dbAllMembers[userIndex].FILE_ATTACH);
      await sbActions.inviteToGroupChat(config.allMembers, dbAllMembers[userIndex].PID);
    }
  } else {
    data.pid = '';
    data.tid = '';
  }

  return data;
};

module.exports = { allMembers };
