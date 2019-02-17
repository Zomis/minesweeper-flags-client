<template>
  <div class="invites">
    <v-dialog
      v-model="inviteWaiting !== null || invites.length > 0"
      max-width="42%"
      persistent
    >
      <v-card class="invites-recieved" v-if="invites.length > 0">
        <v-list two-line>
          <div v-for="(invite, index) in invites" :key="invite.host">
            {{ invite.host }} invites you to play {{ invite.plugin }}
            <div
              class="invite-accept-options"
              v-if="!invite.cancelled && invite.response === null"
            >
              <v-btn color="success" @click="inviteResponse(invite, true)"
                >Accept</v-btn
              >
              <v-btn color="error" @click="inviteResponse(invite, false)"
                >Decline</v-btn
              >
            </div>
            <div class="invite-response" v-if="invite.response !== null">
              <v-btn color="success" disabled v-if="invite.response"
                >Accepted</v-btn
              >
              <v-btn color="error" disabled v-if="!invite.response"
                >Declined</v-btn
              >
            </div>
            <v-btn
              v-if="invite.cancelled"
              color="warning"
              @click="invites.splice(index, 1)"
              >Invite cancelled</v-btn
            >
          </div>
        </v-list>
      </v-card>
      <v-card class="invites-sent" v-if="inviteWaiting !== null">
        <v-card-title>
          Invite
        </v-card-title>
        <v-card-text v-if="inviteWaiting.invited.length > 0">
          Waiting for response from
          <v-chip v-for="username in inviteWaiting.invited" :key="username">{{
            username
          }}</v-chip>
        </v-card-text>
        <v-card-text v-if="inviteWaiting.accepted.length > 0">
          Accepted:
          <span v-for="username in inviteWaiting.accepted" :key="username">
            {{ username }}
          </span>
        </v-card-text>
        <v-card-text v-if="inviteWaiting.declined.length > 0">
          Declined:
          <span v-for="username in inviteWaiting.declined" :key="username">
            {{ username }}
          </span>
        </v-card-text>
        <!--
        <v-card-text
          v-if="
            inviteWaiting.invited.length == 0 &&
              inviteWaiting.declined.length == 0
          "
        >
          <v-text-field
            label="Share invite link"
            placeholder="Invite link"
            readonly
            :value="inviteURL"
          ></v-text-field>
          <v-btn color="info" v-clipboard="() => inviteURL">Copy link</v-btn>
        </v-card-text>
        -->
        <v-card-actions>
          <v-btn
            v-if="!inviteWaiting.cancelled"
            color="error"
            @click="inviteCancel(inviteWaiting)"
            >Cancel invite</v-btn
          >
          <v-btn
            v-if="inviteWaiting.cancelled"
            color="warning"
            @click="resetInviteWaiting()"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Invites",
  methods: {
    inviteCancel(invite) {
      this.$store.dispatch("invites/cancel");
    },
    inviteResponse(invite, response) {
      this.$store.dispatch("invites/respondTo", {
        invite: invite,
        response: response
      });
    },
    sendInvite(data) {
      this.$store.dispatch("invites/sendInvite", data);
    },
    inviteLink(data) {
      // TODO: Support invite links
      this.$store.dispatch("invites/createInviteLink", data);
    }
  },
  watch: {},
  computed: mapState("invites", ["inviteWaiting", "invites"])
};
</script>
