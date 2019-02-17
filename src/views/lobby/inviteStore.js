let ROOT = { root: true };

export default {
  namespaced: true,
  state: {
    invites: [],
    inviteWaiting: null
  },
  mutations: {
    respond(state, data) {
      // data.invite.response = data.response;
      let index = state.invites.indexOf(data.invite);
      state.invites.splice(index, 1);
    },
    addInvite(state, invite) {
      state.invites.push(invite);
    },
    setInviteWaiting(state, data) {
      state.inviteWaiting = data;
    },
    onInviteResponse(state, response) {
      delete state.inviteWaiting.invited[response.userName];
      if (response.accepted) {
        state.inviteWaiting.accepted[response.userName] = true;
      } else {
        state.inviteWaiting.declined[response.userName] = true;
      }
    }
  },

  actions: {
    respondTo(context, data) {
      let responseCode = data.response ? "INVY" : "INVN";
      context.dispatch(
        "socket/send",
        `${responseCode} ${data.invite.host}`,
        ROOT
      );
      context.commit("respond", data);
    },
    sendInvite(context, data) {
      let userName = data.target.userName;
      context.dispatch("socket/send", `INVT ${userName}`, ROOT);
      let invited = {};
      invited[userName] = true;
      context.commit("setInviteWaiting", {
        invited: invited,
        accepted: {},
        declined: {}
      });
    }
  }
};
