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
            <div class="user-item">
              <user-avatar :background="user.background"></user-avatar>
              <div class="username">
                {{ user.username }}
              </div>
            </div>
          </a-list-item>
        </a-list>
      </div>
      <a-button class="menu-btn" @click="onClickMenu">USERS</a-button>
    </a-drawer>
  </div>
</template>

<script>
import UserAvatar from "./UserAvatar";

export default {
  components: {
    UserAvatar,
  },
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
.user-item {
  display: flex;
  width: 100%;
}

.user-item .username {
  flex-grow: 1;
  text-align: center;
  align-self: center;
  font-weight: 700;
}

.menu-btn {
  position: absolute;
  right: -85px;
  top: 10px;
}
</style>
