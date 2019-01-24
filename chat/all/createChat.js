const config = require('../../config/config.json');
const SBdata = require('../util/SBdata');
const SBActions = require('../util/SBActions').SBActions;
const sbData = new SBdata();
const sbActions = new SBActions();

const createGroup = async () => {

  const result = await sbData.findChannel(config.allMembers);
  const channel = result.channels;

  // create 'all_members' channel if not it doesn't exist 
  if(channel.length === 0){
    await sbActions.createGroupChat(config.allMembers, []);
  }

}

module.exports = { createGroup };



