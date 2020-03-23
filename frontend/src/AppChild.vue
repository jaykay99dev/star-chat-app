<template>
  <div>
    <h3>{{ message }}</h3>
    <slot></slot>
    <button @click="emitEvent">EmitEvent</button>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  },
  methods: {
    emitEvent() {
      this.$emit("init", "Hello, Parent!");
    }
  }
};
</script>

<style></style>
