<template>
  <div class="night">
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
        <shooting-star @disappear="disappearStar" />
      </div>
    </div>
  </div>
</template>

<script>
import uuid from "uuid4";
import ShootingStar from "./ShootingStar";

export default {
  components: {
    ShootingStar,
  },
  data() {
    return {
      stars: [],
    };
  },
  methods: {
    disappearStar() {
      this.stars.shift();
    },
    generateStar(id) {
      const top = Math.floor(Math.random() * this.$el.clientHeight);
      const left = Math.floor(Math.random() * this.$el.clientWidth);

      this.stars.push({ id, top, left });
    },
  },
  mounted() {
    this.$store.state.socket.on("typeMessage", (user) => {
      this.generateStar(uuid().split("-")[0]);
    });
  },
};
</script>

<style scoped>
.night {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("http://localhost:3000/background.jpg");
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.star-road {
  position: absolute;
  transform: rotateZ(45deg);
  width: 100%;
}
</style>
