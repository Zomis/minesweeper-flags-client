let ROOT = { root: true };

export default {
  namespaced: true,
  state: {
    invites: [],
    inviteWaiting: null
  },
  mutations: {
    clear(state) {
      state.invites = [];
      state.inviteWaiting = null;
    },
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
      if (state.inviteWaiting === null) {
        console.log(
          "Got invite response without an invite waiting: " + response.userName
        );
        return;
      }
      delete state.inviteWaiting.invited[response.userName];

      if (response.accepted) {
        state.inviteWaiting.accepted.push(response.userName);
      } else {
        state.inviteWaiting.declined.push(response.userName);
      }

      if (
        state.inviteWaiting.declined.length === 0 &&
        Object.keys(state.inviteWaiting.invited).length === 0
      ) {
        // If no one has declined and no one else is being invited, remove invite.
        state.inviteWaiting = null;
      }
    }
  },

  actions: {
    cancel(context) {
      context.dispatch("socket/send", "INVC", ROOT);
      context.commit("setInviteWaiting", null);
    },
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
        accepted: [],
        declined: []
      });
    }
  }
};
