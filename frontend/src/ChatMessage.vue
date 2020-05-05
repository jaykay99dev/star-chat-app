<template>
  <div class="chat-message">
    <!-- <template v-if="chatMessage.type === 'userMessage'">
      <a-alert
        :message="`${chatMessage.data.username}: ${chatMessage.data.message}`"
      />
    </template>
    <template v-else-if="chatMessage.type === 'roomMessage'">
      <a-alert :message="chatMessage.data.message" type="success" />
    </template> -->

    <template
      v-if="
        chatMessage.type === 'myMessage' || chatMessage.type === 'notMyMessage'
      "
    >
      <a-row :gutter="24" type="flex">
        <a-col :span="5" :order="2">
          <div class="user-area">
            <!-- <div class="img"></div> -->
            <user-avatar
              :background="chatMessage.data.user.background"
            ></user-avatar>
            <div class="username">
              {{ chatMessage.data.user.username }}
            </div>
          </div>
        </a-col>
        <a-col :span="19" :order="chatMessage.type === 'myMessage' ? 3 : 1">
          <div class="message-area">
            <p>{{ chatMessage.data.message }}</p>
          </div>
        </a-col>
      </a-row>
    </template>
  </div>
</template>

<script>
import UserAvatar from "./UserAvatar";

export default {
  components: {
    UserAvatar,
  },
  props: {
    chatMessage: Object,
  },
  created() {
    // console.log(this.chatMessage);

    if (this.chatMessage.type === "roomMessage") {
      this.$notification.open({
        message: this.chatMessage.data.message,
        placement: "topLeft",
        duration: 0.5,
        // description: "",
        // style: {
        //   width: "600px",
        //   marginLeft: `${335 - 600}px`,
        // },
      });
    }
  },
};
</script>

<style scoped>
.chat-message {
  margin: 10px;
}

/* .user-area .img {
  background: white;
  display: inline-block;
  border-radius: 50%;
  width: 50px;
  height: 50px;
} */

.user-area .username {
  color: white;
  text-align: center;
}

.message-area {
  background: white;
  border-radius: 5px;
  min-height: 70px;
  padding: 10px;
}

.message-area p {
  margin-bottom: 0;
}
</style>
