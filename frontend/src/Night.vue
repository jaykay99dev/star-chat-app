<template>
  <div class="night">
    <!-- <div
      class="star-road"
      :style="{
        top: `${top}px`,
        left: `calc(-50% + ${left}px)`,
      }"
    >
      <div style="position: relative;">
        <shooting-star />
        <div class="shooting-star"></div>
      </div>
    </div> -->

    <transition-group
      name="star"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @after-leave="afterLeave"
    >
      <div
        class="star-road"
        v-for="star in stars"
        :key="star.id"
        :style="{
          top: `${star.top}px`,
          left: `calc(-50% + ${star.left}px)`,
        }"
      >
        <div style="position: relative;">
          <shooting-star />
        </div>
      </div>
    </transition-group>

    <div><button @click="deleteStar">DELETE</button></div>
  </div>
</template>

<script>
import ShootingStar from "./ShootingStar";

export default {
  components: {
    ShootingStar,
  },
  data() {
    return {
      stars: [],
      dataArray: [],
      idx: 0,
    };
  },
  methods: {
    beforeEnter(el) {
      console.log("beforeEnter", el);
    },
    afterEnter(el) {
      console.log("afterEnter", el);
    },
    beforeLeave(el) {
      console.log("beforeLeave", el);
    },
    afterLeave(el) {
      console.log("afterLeave", el);
    },
    generateStar() {
      const top = Math.floor(Math.random() * this.$el.clientHeight);
      const left = Math.floor(Math.random() * this.$el.clientWidth);
      const id = Date.now();

      this.stars.push({ id, top, left });
    },
    deleteStar() {
      console.log(this.stars.shift());
    },
  },
  mounted() {
    // setInterval(() => {
    //   this.generateStar();
    // }, 3000);
  },
};
</script>

<style scoped>
/*
$shooting-time: 3000ms;
top: calc(50% - #{random(400) - 200px});
left: calc(50% - #{random(300) + 0px});
 */

.night {
  position: relative;
  width: 100%;
  height: 100%;
  /* 
  background-image: url("http://localhost:3000/background.jpg");
  background-size: cover;
  background-position: center;
  */
  overflow: hidden;
}

.star-road {
  position: absolute;
  transform: rotateZ(45deg);
  /* background: blue; */
  width: 100%;
  /* top: 0;
  left: -50%; */
}

/* .shooting-star {
  position: absolute;
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: red;
  left: 50%;
} */
</style>
