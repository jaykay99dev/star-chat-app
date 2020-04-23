<template>
  <div id="layout">
    <a-layout :style="{ minHeight: '100vh' }">
      <a-layout>
        <a-layout-content>
          <!-- CONTENT -->
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="400">
        <chat-space></chat-space>
      </a-layout-sider>
      <user-list v-if="isEnter"></user-list>
      <chat-main></chat-main>
    </a-layout>
  </div>
</template>

<script>
import ChatSpace from "./ChatSpace";
import UserList from "./UserList";
import ChatMain from "./ChatMain";
import store from "./store";

export default {
  store,
  components: {
    ChatSpace,
    UserList,
    ChatMain,
  },
  data() {
    return {
      isEnter: false,
    };
  },
  methods: {},
  created() {
    const socket = io.connect("http://localhost:3000", {
      path: "/socket.io",
    });

    this.$store.commit("setSocket", socket);
  },
};
</script>

<style>
#layout .ant-layout-sider {
  background: rgba(16, 142, 233, 0.5);
  color: #fff;
  line-height: 120px;
}
#layout .ant-layout-content {
  background: gainsboro;
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
</style>
