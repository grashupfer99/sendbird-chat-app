const SBdata = require('../util/SBdata');
const SBActions = require('../util/SBActions').SBActions;

const handleUsers = async (dbUsers, dbTeams, pid, tid) => {
  const user = { pid: '', tid: '' };
  const sbData = new SBdata();
  const sbActions = new SBActions();
  const teamMembers = dbUsers.filter(user => user.STATUS === 'C');
  const DbUserFound = dbUsers.findIndex(user => user.PID === pid) > -1;
  const isSBUser = await sbData.isUser(pid);

  // user found ?
  if (DbUserFound) {
    // return data but make some changes
    user.pid = pid;
    user.tid = tid;
    const DbTeamFound = dbTeams.findIndex(team => team.TID === tid) > -1;
    const DbMemberFound = teamMembers.findIndex(member => member.PID === pid) > -1;
    const userIndex = teamMembers.findIndex(member => member.PID === pid);
    const isSameTeam = teamMembers[userIndex].TID === tid;

    // found team's id in db, found member's id, user's team === pid
    if (DbTeamFound && DbMemberFound && isSameTeam) {
      // user found in SB ?
      if (isSBUser) {
        const isGroupMember = await sbData.isGroupMember(tid, pid);
        // not a member of this team ?
        if (!isGroupMember) {
          // update team
          const teams = await sbData.isMemberOf(pid);
          // user doesn't belong to any team
          if (teams.length === 0) {
            await sbActions.inviteToGroupChat(tid, pid);
          } else if (teams[0] !== tid) {
            // leave that team, join this team
            Promise.all([sbActions.leaveGroupChat(teams[0], pid), sbActions.inviteToGroupChat(tid, pid)]);
          }
        }
        // user not found in SB ?
      } else {
        // create new user, invite to this team
        const user = teamMembers[userIndex];
        await sbActions.createUser(user.PID, user.FILE_ATTACH);
        await sbActions.inviteToGroupChat(tid, user.PID);
      }
    }
    // not found ?
  } else {
    // return nothing
    user.pid = '';
    user.tid = '';
  }

  return user;
};

module.exports = { handleUsers };
