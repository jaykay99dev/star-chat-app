<template>
  <div class="input-container">
    <a-textarea
      class="input-area"
      placeholder="메시지를 입력해주세요"
      :autosize="{ maxRows: 6 }"
      v-model="value"
    />
    <a-button @click="sendMessage" type="primary" class="send-btn">
      전송
    </a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    sendMessage() {
      this.$store.state.socket.emit("sendMessage", {
        user: this.$store.state.user,
        message: this.value,
      });
      this.value = "";
    },
  },
};
</script>

<style scoped>
.input-area {
  border-radius: 0;
  position: absolute;
  bottom: 0;
  resize: none;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 340px;
}

.send-btn {
  margin-top: 1px;
  position: relative;
  right: -340px;
  border-radius: 0;
  height: 39px;
}
</style>
