<template>
  <section class="frontpage__wrapper col-12 col-lg-8">
    <div class="frontpage">
      <h2>Datentypen Quiz</h2>

      <button @click="startQuiz" class="start">Quiz starten</button>

    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapState} from "vuex";
import router from "@/router";

export default defineComponent({
  name: 'Frontpage',
  methods: {
    startQuiz() {
      router.push('quiz');
    }
  }
});
</script>

<style scoped lang="scss">
h2 {
  margin: 0;
  margin-top: 40px;
  font-weight: bold;
}

.start {
  width: 50%;
  height: 50px;
  border: none;
  margin-top: 20px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  bottom: 0;
  background-color: #f5f5f5;
  -webkit-box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.1);
}

.frontpage {
  background-color: white;
  min-height: 250px;
  border-radius: 8px;
  margin-top: 10px;
  -webkit-box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>