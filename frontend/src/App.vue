<template>
  <div id="layout">
    <a-layout :style="{ minHeight: '100vh' }">
      <a-layout-sider>Sider</a-layout-sider>
      <a-layout>
        <!-- <a-layout-header>Header</a-layout-header> -->
        <a-layout-content>Content</a-layout-content>
        <!-- <a-layout-footer>Footer</a-layout-footer> -->
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  // created() {
  //   const socket = io.connect("/", {
  //     path: "/socket.io"
  //   });
  //   socket.on("hello", data => {
  //     console.log(data); // Hello, Client!
  //     socket.emit("bye", "Bye, Server!");
  //   });
  // }
};
</script>

<style>
#layout {
  text-align: center;
}
#layout .ant-layout-header,
#layout .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#layout .ant-layout-footer {
  line-height: 1.5;
}
#layout .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
#layout .ant-layout-content {
  background: rgba(16, 142, 233, 1);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
#layout > .ant-layout {
  margin-bottom: 48px;
}
#layout > .ant-layout:last-child {
  margin: 0;
}
</style>
