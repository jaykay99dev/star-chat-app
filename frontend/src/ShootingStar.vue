<template>
  <transition @before-enter="test" name="hello">
    <div class="shooting_star"></div>
  </transition>
</template>

<script>
export default {
  methods: {
    test() {
      console.log("Hello");
    },
  },
};
</script>

<style scoped>
.shooting_star {
  position: absolute;
  left: 50%;
  height: 2px;
  background: linear-gradient(-45deg, #5f91ff, rgba(0, 0, 255, 0));
  border-radius: 999px;
  filter: drop-shadow(0 0 6px #699bff);
  animation: tail 1500ms ease-in-out 1, shooting 1500ms ease-in-out 1;
}
.shooting_star::before,
.shooting_star::after {
  content: "";
  position: absolute;
  top: calc(50% - 1px);
  right: 0;
  height: 2px;
  background: linear-gradient(
    -45deg,
    rgba(0, 0, 255, 0),
    #5f91ff,
    rgba(0, 0, 255, 0)
  );
  transform: translateX(50%) rotateZ(45deg);
  border-radius: 100%;
  animation: shining 1500ms ease-in-out 1;
}
.shooting_star::after {
  transform: translateX(50%) rotateZ(-45deg);
}

@-webkit-keyframes tail {
  0% {
    width: 0;
  }
  30% {
    width: 100px;
  }
  100% {
    width: 0;
  }
}

@keyframes tail {
  0% {
    width: 0;
  }
  30% {
    width: 100px;
  }
  100% {
    width: 0;
  }
}
@-webkit-keyframes shining {
  0% {
    width: 0;
  }
  50% {
    width: 30px;
  }
  100% {
    width: 0;
  }
}
@keyframes shining {
  0% {
    width: 0;
  }
  50% {
    width: 30px;
  }
  100% {
    width: 0;
  }
}
@-webkit-keyframes shooting {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(300px);
    transform: translateX(300px);
  }
}
@keyframes shooting {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(300px);
    transform: translateX(300px);
  }
}
</style>
