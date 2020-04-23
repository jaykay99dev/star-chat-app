<template>
  <div class="chat-message">
    <template v-if="chatMessage.type === 'userMessage'">
      <a-alert
        :message="`${chatMessage.data.username}: ${chatMessage.data.message}`"
      />
    </template>
    <template v-else-if="chatMessage.type === 'roomMessage'">
      <a-alert :message="chatMessage.data.message" type="success" />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    chatMessage: Object,
  },
};
</script>

<style scoped>
.chat-message {
  margin: 10px;
}
</style>
