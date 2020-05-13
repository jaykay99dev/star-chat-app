<template>
  <div id="layout">
    <a-layout :style="{ minHeight: '100vh' }">
      <a-layout>
        <a-layout-content>
          <night></night>
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
import Night from "./Night";
import ChatSpace from "./ChatSpace";
import UserList from "./UserList";
import ChatMain from "./ChatMain";
import store from "./store";

export default {
  store,
  components: {
    Night,
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
#layout {
  overflow: hidden;
}
</style>
