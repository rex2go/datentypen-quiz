<template>
  <div class="container">
    <div class="row">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: #D8E1E9;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  @media (min-width: 767.98px) {
    margin-top: 150px;
  }
}

.row {
  justify-content: center;
  align-items: center;
}
</style>
