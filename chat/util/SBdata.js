const axios = require('axios');
const config = require('../../config/config.json');

class SBdata {
  constructor(){
    this.baseUrl = config.baseUrl;
    this.headers = {
      headers: config.auth
    }
    this.limit = config.limit;
    this.baseGroupChatUrl = config.baseGroupChatUrl;
    this.allMembers = config.allMembers;
  }

  async findChannel(tid) {
    const channel = await axios.get(
      this.baseUrl + '/group_channels?channel_urls=' + this.baseGroupChatUrl + tid,
      this.headers
      )
    return channel.data;
  }

  async getGroupChannel() {
    const result = await axios.get(
      this.baseUrl + '/group_channels' + this.limit,
      this.headers
      );
    return result.data.channels;
  }

  users() {
    return axios.get(
      this.baseUrl + '/users' + this.limit, 
      this.headers
      )
    .then(response => response.data.users)
    .catch(err => err);
  }

  chatRooms() {
    return axios.get(
      this.baseUrl + '/group_channels' + this.limit, 
      this.headers
      )
    .then(response => response.data.channels)
    .catch(err => err)
  }

  channelMembers() {
    return axios.get(
      this.baseUrl + "/group_channels?show_member=true&limit=100", 
      this.headers
      )
    .then(response => response.data.channels)
    .catch(err => err);
  }

  async channelContainsNickname(pid) {
    const result = await axios.get(
      this.baseUrl + '/group_channels?show_member=true&members_nickname_contains=' + pid,
      this.headers
    );
    return result.data.channels;
  }

  async isGroupMember(tid, pid) {
    try{
      const response = await axios.get(
        this.baseUrl + '/group_channels/' + this.baseGroupChatUrl + tid + '/members/'+ pid,
        this.headers
      );
      return response.data.is_member
    }catch(err){
      if(err.response.status === 400) 
        return false
    }
  }

  async isUser(pid) {
    try {
      const channel = await axios.get(
        this.baseUrl + '/users/' + pid,
        this.headers
        )
      return channel.data.user_id;
    }catch(err){
      if(err.response.status === 400)
      return false;
    }
  }

  async isChannel(tid){
    try{
      const channel = await axios.get(
        this.baseUrl + '/group_channels/' + this.baseGroupChatUrl + tid,
        this.headers
      );
      return channel.data.name;
    }catch(err){
      if(err.response.status === 400)
        return false;
    }
  }

  async isMemberOf(pid){
    try{
      const response = await axios.get(
        this.baseUrl + '/group_channels?members_include_in=' + pid,
        this.headers
      );
      const channels = response.data.channels;
      if(channels.length === 0){
        return false;
      } else {
        return channels
        .filter(channel => channel.name !== 'all_members')
        .map(channel => channel.name)
      }
    }catch(err){
      console.log(err)
    }
  }

}

module.exports = SBdata;