<template>
  <div class="chat-message">
    <a-alert :message="`${chatData.username}: ${chatData.message}`" />
  </div>
</template>

<script>
export default {
  props: {
    chatData: Object
  }
};
</script>

<style scoped>
.chat-message {
  margin: 10px;
}
</style>