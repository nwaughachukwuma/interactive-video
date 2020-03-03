<template>
  <div class="scrolling-wrapper">
    <div class="card">
      <h2>Card1</h2>
    </div>
    <div class="card">
      <h2>Card</h2>
    </div>
    <div class="card">
      <h2>Card</h2>
    </div>
    <div class="card">
      <h2>Card</h2>
    </div>
    <div class="card">
      <h2>Card</h2>
    </div>
    <div class="card">
      <h2>Card</h2>
    </div>
    <div class="card">
      <h2>Card</h2>
    </div>
    <div class="card">
      <h2>Card</h2>
    </div>
    <div class="card">
      <h2>Cardx</h2>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.scrolling-wrapper {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  transition: 1s all;

  .card {
    flex: 0 0 auto;
  }
}

.scrolling-wrapper {
  height: 100px;
  margin-bottom: 20px;
  width: 60%;
  padding: 5px;
  border: 2px solid black;
  border-radius: 10px;

  padding-left: 5px;
  padding-right: 10px;
  margin-top: 50px;
  margin-left: 20%;

  align-items: center;

  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
}

.card {
//   opacity: 0;
  border: 1px solid gray;
  width: 150px;
  height: 75px;
  background: transparent;

  margin-left: 5px;
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(32, 32, 32, 0.6);
}

.card:focus {
    opacity: 1
}

.card:last-child {
  margin-right: 15px;
}
</style>