<template>
  <span>{{ time }} {{ timeUnit }} ago</span>
</template>
<script>
export default {
  name: "TimeAgo",
  props: ["timestamp"],
  data() {
    return {
      updater: null,
      time: 0,
      timeUnit: "seconds"
    };
  },
  mounted() {
    this.update();
    this.updater = setInterval(() => {
      this.update();
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.updater);
  },
  methods: {
    update() {
      let now = new Date().getTime();
      let then = this.timestamp * 1000;
      let diff = now - then;

      if (diff < 10000) {
        this.time = "a few";
        this.timeUnit = "seconds";
      } else if (diff < 60000) {
        this.time = "> " + 10 * Math.floor(diff / 10000);
        this.timeUnit = "seconds";
      } else {
        this.time = Math.floor(diff / 60000);
        this.timeUnit = this.time === 1 ? "minute" : "minutes";
      }
      // For debugging: console.log(`TimeAgo ${diff}: ${this.time} ${this.timeUnit}`);
    }
  }
};
</script>
