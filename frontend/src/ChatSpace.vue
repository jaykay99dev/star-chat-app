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

    <div class="toggle-container">
      <a-button
        @click="toggleChatInput"
        type="primary"
        shape="circle"
        :icon="isChatInputShow ? 'minus' : 'plus'"
      />
    </div>

    <div class="input-item">
      <chat-input v-show="isChatInputShow"></chat-input>
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
  data() {
    return {
      isChatInputShow: true,
    };
  },
  computed: {
    chatMessages() {
      return this.$store.state.chatMessages;
    },
  },
  methods: {
    toggleChatInput() {
      this.isChatInputShow = !this.isChatInputShow;
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
.toggle-container {
  position: absolute;
  left: -38px;
  bottom: 4px;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #22416f;
  overflow: hidden;
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
