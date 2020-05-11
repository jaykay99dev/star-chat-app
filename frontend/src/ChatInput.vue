<template>
  <div class="input-container">
    <div class="val-result" :style="{ top: errorTopPx }">
      <div class="length-ratio">
        {{ lengthRatio }}
      </div>
      <div v-if="errorMessage" class="error-message">
        <a-icon
          class="icon"
          type="close-circle"
          theme="twoTone"
          two-tone-color="#eb2f96"
        />
        {{ errorMessage }}
      </div>
      <div v-else>
        <a-icon
          class="icon"
          type="check-circle"
          theme="twoTone"
          two-tone-color="#52c41a"
        />
      </div>
    </div>

    <a-textarea
      class="input-area"
      placeholder="메시지를 입력해주세요"
      :autosize="{ maxRows: 6 }"
      v-model="message"
      @keyup="keyup"
      @keydown.shift="keydownShift"
      @keydown.enter="keydownEnter"
      ref="messageInput"
    />

    <a-tooltip placement="topRight">
      <template slot="title">
        Shift + Enter
      </template>
      <a-button @click="sendMessage" type="primary" class="send-btn">
        전송
      </a-button>
    </a-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      isShiftDown: false,
      errorMessage: "",
      prevPxHeight: "39px",
      errorTopPx: "-20px",
      lengthRatio: "0/70",
    };
  },
  watch: {
    message: debounce(function(val) {
      // 실시간 길이 계산
      this.lengthRatio = `${val.length}/70`;
      //

      // 에러 메시지 실시간 생성
      this.errorMessage = validateMessage(val);
      //

      // 에러 메시지 위치 조정
      this.$nextTick(() => {
        setTimeout(() => {
          const pxHeight = this.$refs.messageInput.$el.style.height;

          if (pxHeight === this.prevPxHeight) {
            // console.log("===");
            return;
          }

          // console.log("!==");

          this.prevPxHeight = pxHeight;
          this.errorTopPx = `${-pxHeight.slice(0, -2) + 19}px`;
        }, 17);
      });
      //
    }, 100),
  },
  methods: {
    keyup(e) {
      if (e.key === "Shift") {
        this.isShiftDown = false;
      }
    },
    keydownShift() {
      this.isShiftDown = true;
    },
    keydownEnter(e) {
      if (this.isShiftDown) {
        e.preventDefault();
        this.sendMessage();
      }
    },
    sendMessage() {
      // message 검증
      const resultMessage = validateMessage(this.message);

      if (resultMessage) {
        this.$message.error(resultMessage, 0.5);
        return;
      }
      //

      this.$store.state.socket.emit("sendMessage", {
        user: this.$store.state.user,
        message: this.message,
      });
      this.message = "";
    },
  },
};

function debounce(fun, waitTime) {
  let timeoutId;
  let callTime = 0;

  return function(...rest) {
    const now = Date.now();

    if (now < callTime) {
      clearTimeout(timeoutId);
    }

    callTime = now + waitTime;
    timeoutId = setTimeout(() => {
      fun.call(this, ...rest);
    }, waitTime);
  };
}

// message를 작성 여부, 길이, 개행 횟수로
// 검증해서 에러 메시지를 반환한다.
function validateMessage(message) {
  if (!message) {
    return "메시지를 작성해주세요.";
  }

  if (message.length > 70) {
    return "70자 이하가 되야합니다.";
  }

  // if (message.split("\n").length > 5) {
  //   return "개행횟수가 4이하여야 합니다.";
  // }

  return "";
}
</script>

<style scoped>
.length-ratio {
  color: white;
}

.error-message {
  color: #f5222d;
}

.input-container {
  position: relative;
}

.val-result {
  position: absolute;
  padding-left: 5px;
}

.val-result div {
  display: inline-block;
}

.input-area {
  border-radius: 0;
  position: absolute;
  bottom: 0;
  resize: none;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 340px;
}

.send-btn {
  margin-top: 1px;
  position: relative;
  right: -340px;
  border-radius: 0;
  height: 39px;
}
</style>
