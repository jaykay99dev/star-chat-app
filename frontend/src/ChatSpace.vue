<template>
  <div class="container">
    <div class="message-item">
      <div class="message-container">
        <chat-message
          v-for="chatMessage in chatMessages"
          :key="chatMessage.key"
          :chat-message="chatMessage"
        ></chat-message>
      </div>
    </div>
    <div class="input-item">
      <chat-input></chat-input>
    </div>
  </div>
</template>

<script>
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default {
  components: {
    ChatMessage,
    ChatInput,
  },
  computed: {
    chatMessages() {
      return this.$store.state.chatMessages;
    },
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
