const handleUsers = require('./handleUsers').handleUsers;
const handleChat = require('./handleChat').handleChat;

const chat = async (dbUsers, dbTeams, pid, tid) => {

  const user = { pid: '', tid: '' };

  await handleChat(dbTeams, tid);

  const result = await handleUsers(dbUsers, dbTeams, pid, tid);
  user.pid = result.pid;
  user.tid = result.tid;
  
  return user;

}

module.exports = chat;