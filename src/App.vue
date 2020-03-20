<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello, Chat-App!!"
    };
  },
  created() {
    const socket = io.connect("/", {
      path: "/socket.io"
    });

    socket.on("hello", data => {
      console.log(data); // Hello, Client!
      socket.emit("bye", "Bye, Server!");
    });
  }
};
</script>

<style>
h1 {
  color: green;
}
</style>
