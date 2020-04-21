<template>
  <div>
    <a-input-search
      placeholder="메시지를 입력해주세요"
      @search="onSearch"
      enterButton="전송"
      size="large"
      v-model="value"
    />
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
    onSearch(value) {
      this.$root.socket.emit("send", {
        username: this.$root.username,
        message: value,
      });
      this.value = "";
    },
  },
};
</script>
