<template>
  <div class="title-bar">
    <div class="title">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'titleBar'
}
</script>

<style scoped>
  .title-bar {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #DDDDDD;
    margin-bottom: 12px;
  }
  
  .title {
    font-size: 15px;
    font-weight: bold;
  }
</style>
