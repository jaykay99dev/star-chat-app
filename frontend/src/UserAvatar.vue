<template>
  <div class="user-avatar" :style="{ background }"></div>
</template>

<script>
export default {
  props: {
    background: String,
  },
};
</script>

<style scoped>
.user-avatar {
  background: white;
  display: inline-block;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
</style>
