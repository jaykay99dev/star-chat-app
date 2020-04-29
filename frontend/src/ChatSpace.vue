<template>
  <div class="container">
    <div class="message-item">
      <div class="message-container">
        <chat-message
          v-for="chatMessage in chatMessages"
          :key="chatMessage.key"
          :uuid="chatMessage.key"
          :chat-message="chatMessage"
          ref="messages"
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
  updated() {
    // console.log(this.$store.state.chatMessages.length);

    if (this.$store.state.chatMessages.length > 20) {
      this.$store.commit("shiftMessage");
    } else {
      if (this.$store.state.chatMessages.length > 0) {
        this.$refs.messages.slice(-1)[0].$el.scrollIntoView();
      }
    }
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
