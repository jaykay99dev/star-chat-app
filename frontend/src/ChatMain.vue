<template>
  <div>
    <a-modal
      v-model="visible"
      :maskClosable="false"
      :closable="false"
      :footer="null"
    >
      <div>
        <a-input
          placeholder="이름을 입력해주세요."
          v-model="username"
          ref="usernameInput"
          @keydown.enter="sendUsername"
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
      </div>
      <br />
      <div>
        <a-button type="primary" @click="sendUsername">입장하기</a-button>
        <a-button @click="emitEmpty">초기화</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
import uuid from "uuid4";

export default {
  data() {
    return {
      visible: false,
      username: "",
    };
  },
  methods: {
    sendUsername() {
      this.visible = false;
      this.$root.isEnter = true;

      this.turnOnConnection();

      const user = { username: this.username, background: generateGradient() };

      this.$store.state.socket.emit("enterChatApp", user);
      this.$store.commit("saveUser", user);
    },
    emitEmpty() {
      this.$refs.usernameInput.focus();
      this.username = "";
    },
    turnOnConnection() {
      this.$store.state.socket.on("myMessage", (userMessage) => {
        this.$store.commit(
          "pushMessage",
          makeMessageInfo("myMessage", userMessage)
        );
      });

      this.$store.state.socket.on("notMyMessage", (userMessage) => {
        this.$store.commit(
          "pushMessage",
          makeMessageInfo("notMyMessage", userMessage)
        );
      });

      this.$store.state.socket.on("userCameIn", (userData) => {
        this.$store.commit(
          "pushMessage",
          makeMessageInfo("roomMessage", {
            message: `${userData[1].username}님이 입장했습니다.`,
          })
        );

        this.$store.commit("pushUser", userData);
      });

      this.$store.state.socket.on("userCameOut", (sid) => {
        this.$store.commit(
          "pushMessage",
          makeMessageInfo("roomMessage", {
            message: `${this.$store.state.usersMap[sid].username}님이 나갔습니다.`,
          })
        );

        this.$store.commit("deleteUser", sid);
      });

      this.$store.state.socket.on("iCameIn", (usersMap) => {
        this.$store.commit("saveUsers", usersMap);
      });
    },
  },
  mounted() {
    this.visible = true;
  },
};

function makeMessageInfo(type, data) {
  return {
    key: uuid(),
    type,
    data,
  };
}

function generateGradient() {
  var hexValues = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];

  function populate(a) {
    for (var i = 0; i < 6; i++) {
      var x = Math.round(Math.random() * 14);
      var y = hexValues[x];
      a += y;
    }
    return a;
  }

  var newColor1 = populate("#");
  var newColor2 = populate("#");
  var angle = Math.round(Math.random() * 360);

  var gradient =
    "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";

  return gradient;
}
</script>
