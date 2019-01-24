const express = require('express');
const app = express();
const ping = require('./db/db-init').ping;
const path = require('path');

const config = require('./config/config.json');
const chat = require('./chat/group/chat');
const createAllMembersGroup = require('./chat/all/createChat').createGroup;
const clearUsers = require('./chat/util/clearUsers').clearUsers;
const allMembers = require('./chat/all/allMembers').allMembers;

// DB
const getList = require('./db/query').getList;
const getTeams = require('./db/query').getTeams;
const getAllMembers = require('./db/query').getAllMembers;

const PORT = 9001;

app.use('/build', express.static(path.join(__dirname, './build')));
app.use('/static', express.static(path.join(__dirname, './static')));
app.set('view engine', 'pug');

// INIT DB
ping();

const data = {
  appId: config.appId,
  pid: '',
  tid: ''
};

(async () => {
  const dbAllMembers = await getAllMembers();

  await clearUsers(dbAllMembers);
  await createAllMembersGroup();
})();

app.get('/', async (req, res) => {
  const { type, pid, tid } = req.query;

  if (type) {
    if (type === 'group') {
      const dbUsers = await getList();
      const dbTeams = await getTeams();
      const result = await chat(dbUsers, dbTeams, pid, tid);
      data.pid = result.pid;
      result.tid === '' ? (data.tid = '') : (data.tid = config.baseGroupChatUrl + result.tid);
    } else if (type === 'all') {
      const dbAllMembers = await getAllMembers();
      const result = await allMembers(dbAllMembers, pid);
      data.pid = result.pid;
      data.tid = result.tid;
    }
  }

  res.render('index', { data });
});

app.listen(PORT);
console.log(`[SERVER RUNNING] 127.0.0.1:${PORT}`);
