<template>
  <div>
    <a-modal
      v-model="visible"
      :maskClosable="false"
      :closable="false"
      :footer="null"
    >
      <div>
        <a-input
          placeholder="이름을 입력해주세요."
          v-model="username"
          ref="usernameInput"
          @keydown.enter="sendUsername"
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
      </div>
      <br />
      <div>
        <a-button type="primary" @click="sendUsername">입장하기</a-button>
        <a-button @click="emitEmpty">초기화</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      username: "",
    };
  },
  methods: {
    sendUsername() {
      this.visible = false;
      this.$root.socket.emit("enterChatApp", this.username);
      this.$root.username = this.username;
      this.$root.isEnter = true;
    },
    emitEmpty() {
      this.$refs.usernameInput.focus();
      this.username = "";
    },
  },
  mounted() {
    this.visible = true;
  },
};
</script>
