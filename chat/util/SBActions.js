const axios = require('axios');
const config = require('../../config/config.json');

class SBActions {
  constructor() {
    this.baseUrl = config.baseUrl;
    this.playerOneBaseUrl = config.playerOneBaseUrl;
    this.baseGroupChatUrl = config.baseGroupChatUrl;
    this.headers = {
      headers: config.auth
    };

  }

  // Create User in SB
  async createUser(pid, file_attach) {
    const result = await axios.post(
      this.baseUrl + '/users', 
      {
        user_id: pid,
        nickname: pid,
        profile_url: this.playerOneBaseUrl + file_attach,
      }, 
      this.headers);
      return result.status;
  }

  // Delete User from SB
  async deleteUser(user_id) {
    const result = await axios.delete(
      this.baseUrl + '/users/' + user_id, 
      this.headers
    );
    return result.status;
  }

  // Create SB Group Chat
  async createGroupChat(tid, coverUrl = '', membersList) {
    const result = await axios.post(
      this.baseUrl + '/group_channels',
      {
        name: tid,
        channel_url: this.baseGroupChatUrl + tid,
        cover_url: coverUrl,
        user_ids: membersList, // must be an array
      },
      this.headers
    ); 
    return result.status;
  }

  // Delete SB Group Chat
  async deleteGroupChat(tid) {
    const result = await axios
    .delete(
      this.baseUrl + "/group_channels/" + this.baseGroupChatUrl + tid,
      this.headers
      );
      return result.status;
  }

  // Invite User to Group Chat
  async inviteToGroupChat(tid, user_id) {
    const result = await axios.post(
      this.baseUrl + '/group_channels/' + this.baseGroupChatUrl + tid + '/invite',
      {
        "user_ids": [user_id]
      },
      this.headers);
      return result.status;
  }

  // Remove USer from Group Chat
  async leaveGroupChat(tid, user_id) {
    const result = await axios.put(
      this.baseUrl + '/group_channels/' + this.baseGroupChatUrl + tid + '/leave',
      {
        "user_ids": [user_id]
      },
      this.headers
      );
      return result.status;
  }

}

module.exports = { SBActions };