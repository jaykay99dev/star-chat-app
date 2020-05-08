<template>
  <div class="chat-message">
    <template
      v-if="
        chatMessage.type === 'myMessage' || chatMessage.type === 'notMyMessage'
      "
    >
      <a-row :gutter="24" type="flex">
        <a-col :span="5" :order="2">
          <div class="user-area">
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
            <p v-html="messageHtml"></p>
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
  computed: {
    // 보안을 위해서 <, >를 escape하고
    // 개행문자를 <br/>로 바꿔준다.
    messageHtml() {
      return this.chatMessage.data.message
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br/>");
    },
  },
  created() {
    // console.log(this.chatMessage);
    // console.log(this.chatMessage.data.message);

    if (this.chatMessage.type === "roomMessage") {
      this.$notification.open({
        message: this.chatMessage.data.message,
        placement: "topLeft",
        duration: 0.5,
      });
    }
  },
};
</script>

<style scoped>
.chat-message {
  margin: 20px;
}

.user-area .username {
  color: white;
  text-align: center;
}

.message-area {
  background: white;
  border-radius: 5px;
  padding: 10px;
  max-height: 125px;
  overflow-y: auto;
}

.message-area p {
  margin-bottom: 0;
}
</style>
