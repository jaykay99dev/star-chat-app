<template>
  <div class="container">
    <div class="message-item">
      <div class="message-container">
        <chat-message
          v-for="chatData in chatDataList"
          :key="chatData.key"
          :chat-data="chatData"
        ></chat-message>
      </div>
    </div>
    <div class="input-item">
      <chat-input></chat-input>
    </div>
  </div>
</template>

<script>
import uuid from "uuid4";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default {
  components: {
    ChatMessage,
    ChatInput,
  },
  data() {
    return {
      chatDataList: [],
    };
  },
  created() {
    this.$root.socket.on("receive", (data) => {
      const {
        data: { username, message },
      } = data;

      this.chatDataList.push({ key: uuid(), username, message });
    });
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.input-item {
  height: 40px;
  line-height: initial;
}

.message-item {
  flex-grow: 1;
}

.message-container {
  height: calc(100vh - 40px);
  overflow-y: scroll;
}
</style>
