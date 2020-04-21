<template>
  <div>
    <a-drawer
      placement="left"
      :closable="false"
      @close="onClose"
      :visible="visible"
      :mask="false"
    >
      <div>
        <p>{{ $root.username }} (ME)</p>
      </div>
      <a-button class="menu-btn" @click="onClickMenu">USERS</a-button>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    onClickMenu() {
      this.visible = !this.visible;
    },
    onClose() {
      this.visible = false;
    },
  },
  mounted() {
    if (innerWidth < 600) {
      this.visible = false;
    }
  },
};
</script>

<style scoped>
.menu-btn {
  position: absolute;
  right: -85px;
  top: 10px;
}
</style>
