const SBdata = require('../util/SBdata');
const SBActions = require('../util/SBActions').SBActions;
const config = require('../../config/config.json');

// CHAT ROOMS
const handleChat = async (dbTeams, tid) => {
  const sbData = new SBdata();
  const sbActions = new SBActions();
  const teamData = [];
  dbTeams.map(team => teamData.push(team.TID));
  const sbChatRooms = await sbData.chatRooms();
  let notFoundChat = '';

  // tid is found in DB
  if (teamData.findIndex(team => team === tid) > -1) {
    // tid is not found in SB
    const isChannel = await sbData.isChannel(tid);
    if (!isChannel) {
      await sbActions.createGroupChat(tid, []);
    }
  }

  // not found in DB but found in SB -> delete chat group
  sbChatRooms.map(async chatroom => {
    // exclude 'all_members' channel
    if (teamData.indexOf(chatroom.name) === -1 && chatroom.name !== config.allMembers) {
      notFoundChat = chatroom.name;
    }
  });

  if (notFoundChat !== '') {
    await sbActions.deleteGroupChat(notFoundChat);
  }
};

module.exports = { handleChat };
