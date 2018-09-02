<template>
  <div class="not-found">
    <div class="code-area">
      <span style="color: #777;font-style:italic;">// 404 page not found.</span>
      <span>
      <span style="color:#d65562;">if&nbsp;&nbsp;</span>
      (<span style="color:#4ca8ef;">&nbsp;!&nbsp;</span><span style="font-style: italic;color:#bdbdbd;">found</span>)
      {
      </span>
      <span>
        <span style="padding-left: 15px;color:#2796ec">
          <i style="width: 10px;display:inline-block"></i>throw&nbsp;
        </span>
        <span>
          (<span style="color: #a6a61f">"(╯°□°)╯︵ ┻━┻"</span>);
        </span>
        <span style="display:block">}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style lang="less" scoped>
/* Styles of the 404 page of my website. */

.not-found {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #081421;
  color: #d3d7de;
  font-family: "Courier new";
  font-size: 18px;
  line-height: 1.5em;
  cursor: default;
}

.code-area {
  position: absolute;
  width: 320px;
  min-width: 320px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.code-area > span {
  display: block;
}

@media screen and (max-width: 320px) {
  .code-area {
    font-size: 5vw;
    min-width: auto;
    width: 95%;
    margin: auto;
    padding: 5px;
    padding-left: 10px;
    line-height: 6.5vw;
  }
}
</style>