<template>
  <div class="hello-world-container">
    <canvas class="hello-world-text"></canvas>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      canvasHidden: "",
      ctxHidden: "",
      canvasShown: "",
      ctxShown: ""
    };
  },
  methods: {
    init() {
      this.canvasHidden.width = 800;
      this.canvasHidden.height = 400;

      this.ctxHidden.clearRect(0, 0, this.ctxHidden.width, this.ctxHidden.height);
      this.ctxHidden.textAlign = "center";
      this.ctxHidden.textBaseLine = "middle";
      this.ctxHidden.font = "bold 100px VT323, monospace";
      this.ctxHidden.fillStyle = "#F44";

      this.ctxHidden.fillText(
        "HELLO WORLD",
        this.canvasHidden.width / 2,
        this.canvasHidden.height / 2
      );

      this.ctxShown.clearRect(0, 0, this.canvasShown.width, this.canvasShown.height);
      this.ctxShown.drawImage(this.canvasHidden, 0, 0);
      let i = 10;
      while (i--) {
        this.glitch();
      }
    },
    glitch() {
      let width = 100 + Math.random() * 100;
      let height = 50 + Math.random() * 50;

      let x = Math.random() * this.canvasHidden.width;
      let y = Math.random() * this.canvasHidden.height;

      let dx = x + (Math.random() * 40 - 20);
      let dy = y + (Math.random() * 30 - 15);

      this.ctxShown.clearRect(x, y, width, height);
      this.ctxShown.fillStyle = "#4a6";
      //this.ctxShown.fillRect(x, y, width, height)
      this.ctxShown.drawImage(
        this.canvasHidden,
        x,
        y,
        width,
        height,
        dx,
        dy,
        width,
        height
      );
    }
  },
  mounted() {
    this.canvasHidden = document.createElement("canvas");
    this.ctxHidden = this.canvasHidden.getContext("2d");
    this.canvasShown = document.querySelector(".hello-world-text");
    this.canvasShown.width = 800;
    this.canvasShown.height = 400;
    this.ctxShown = this.canvasShown.getContext("2d");
    setInterval(() => {
      this.init();
    }, 1000 / 15);
  }
};
</script>

<style lang="less" scoped>
.hello-world-container {
  background: #222;
  width: 100vw;
  height: 100vh;
  font-family: "VT323", monospace;
  color: #fff;
}
.hello-world-text {
  background: none;
  margin: auto;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>