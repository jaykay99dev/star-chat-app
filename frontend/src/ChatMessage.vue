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

    <template v-if="chatMessage.type === 'myMessage'">
      <a-row :gutter="24">
        <a-col :span="5">
          <div class="user-area">
            <div class="img"></div>
            <div class="username">
              {{ chatMessage.data.username }}
            </div>
          </div>
        </a-col>
        <a-col :span="19">
          <div class="message-area">
            <p>{{ chatMessage.data.message }}</p>
          </div>
        </a-col>
      </a-row>
    </template>
    <template v-else-if="chatMessage.type === 'notMyMessage'">
      <a-row :gutter="24">
        <a-col :span="19">
          <div class="message-area">
            <p>{{ chatMessage.data.message }}</p>
          </div>
        </a-col>
        <a-col :span="5">
          <div class="user-area">
            <div class="img"></div>
            <div class="username">
              {{ chatMessage.data.username }}
            </div>
          </div>
        </a-col>
      </a-row>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    chatMessage: Object,
  },
  created() {
    // console.log(this.chatMessage);

    if (this.chatMessage.type === "roomMessage") {
      this.$notification.open({
        message: this.chatMessage.data.message,
        placement: "topLeft",
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

.user-area .img {
  background: white;
  display: inline-block;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

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
