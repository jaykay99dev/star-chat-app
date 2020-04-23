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
        <p>{{ user.username }} (ME)</p>
        <a-list itemLayout="horizontal" :dataSource="users">
          <a-list-item slot="renderItem" slot-scope="user">
            <a-list-item-meta description="Hello, Chat-App!">
              <span slot="title">{{ user.username }}</span>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
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
  computed: {
    user() {
      return this.$store.state.user;
    },
    users() {
      return this.$store.getters.users;
    },
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
