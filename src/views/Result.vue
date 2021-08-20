<template>
  <section class="result__wrapper col-12 col-lg-8">
    <div class="result">
      <h2>Dein Ergebnis</h2>
      <span>{{ timer }}</span>
      <br/>

      <div class="result__inner">
        <h3 class="score">{{ (100 / this.questions.length * getScore()).toFixed(2) + '%' }}</h3>
        <span>{{ getScore() }} von {{ this.questions.length }} Fragen richtig beantwortet</span>
      </div>

      <router-link class="back" to="quiz">Zu den Fragen</router-link>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapState} from "vuex";
import router from "@/router";

export default defineComponent({
  name: 'Result',
  mounted() {
    if(!this.questions.length) {
      router.push({
        name: 'Frontpage',
      });
    }
  },
  computed: {
    ...mapState({
      timer: 'timer',
      questions: 'questions',
    })
  },
  methods: {
    // TODO make computed
    getScore() {
      let score = 0;

      for (let question of this.questions) {
        const type = question.type;
        const answer = question.answer;

        if (type === 'radio') {
          const answers = question.answers;

          if (answers.indexOf(answer) === question.correctAnswerIndex) {
            score++;
          }
        } else if (type === 'checkbox') {
          const answers = question.answers;
          let localScore = 0;

          for (let answerSingle of answer) {
            const index = answers.indexOf(answerSingle);

            if (question.correctAnswerIndex.indexOf(index) !== -1) {
              localScore += 1;
            } else {
              localScore = 0;
              break;
            }
          }

          if (localScore == question.correctAnswerIndex.length) {
            score++;
          }
        } else if (type === 'text') {
          const correctAnswer = question.correctAnswer;

          if (correctAnswer === answer) score++;
        }
      }

      return score;
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

.score {
  font-weight: bold;
  margin: 10px 0 0 0;
  font-size: 72px;
}

.back {
  display: block;
  margin-top: 20px;
}

.result {
  background-color: white;
  min-height: 300px;
  border-radius: 8px;
  margin-top: 10px;
  -webkit-box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>