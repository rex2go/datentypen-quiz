<template>
  <section class="quiz__wrapper col-12 col-lg-8">
    <div class="quiz__timer">{{ timer }}</div>

    <div class="quiz__controls">

      <button @click="previousQuestion" :class="[questionIndex > 1 ? '' : 'disabled']">
        Vorherige Frage
      </button>

      <div class="quiz__controls__progress">
        <div class="quiz__controls__progress__text">{{ questionIndex }} von {{ questionCount }}</div>
        <div class="quiz__controls__progress__section"
             :style="'width: ' + (100 / questionCount * questionIndex) + '%'"></div>
      </div>

      <button @click="nextQuestion()"
              :class="[((getCurrentQuestion().answer && getCurrentQuestion().answer.length) || showResults) && questionIndex < questionCount ? '' : 'disabled']">
        Nächste Frage
      </button>

    </div>

    <div class="quiz">
      <div class="quiz__question">
        <h2>{{ getCurrentQuestion().question }}</h2>
      </div>

      <div class="quiz__answers" v-if="getCurrentQuestion().type === 'radio'">
        <div v-for="(answer, index) of getCurrentQuestion().answers">
          <label :for="answer"
                 :class="[getCurrentQuestion().correctAnswerIndex === index && showResults ? 'correct' : '']">

            <input v-model="getCurrentQuestion().answer"
                   type="radio"
                   :name="getCurrentQuestion().question.split(' ').join('')"
                   :id="answer"
                   :value="answer"
                   :disabled="showResults"/>

            {{ answer }}
          </label>
        </div>
      </div>

      <div class="quiz__answers" v-if="getCurrentQuestion().type === 'checkbox'">
        <div v-for="(answer, index) of getCurrentQuestion().answers">
          <label :for="answer"
                 :class="[getCurrentQuestion().correctAnswerIndex.indexOf(index) !== -1 && showResults ? 'correct' : '']">

            <input v-model="getCurrentQuestion().answer"
                   type="checkbox"
                   :id="answer"
                   :value="answer"
                   :disabled="showResults"/>

            {{ answer }}
          </label>


        </div>
      </div>

      <div class="quiz__answers" v-if="getCurrentQuestion().type === 'text'">
        <label>
          Deine Antwort:
          <br/>
          <input v-model="getCurrentQuestion().answer"
                 type="text"
                 :disabled="showResults"/>

          <div class="quiz__answers__text-result" v-if="showResults">
            Die richtige Antwort lautet: {{ getCurrentQuestion().correctAnswer }}
          </div>
        </label>

        <div v-for="answer of getCurrentQuestion().answers">
          <label :for="answer">

            {{ answer }}
          </label>
        </div>
      </div>
    </div>

    <button v-if="getCurrentQuestion().answer && getCurrentQuestion().answer.length && questionIndex < questionCount && !showResults"
            @click="nextQuestion"
            class="quiz__next-question">
      Nächste Frage
    </button>

    <button v-if="getCurrentQuestion().answer && getCurrentQuestion().answer.length && questionIndex === questionCount && !showResults"
            @click="finishQuiz"
            class="quiz__next-question">
      Quiz abschließen
    </button>

    <router-link v-if="showResults" class="back" to="result">Zurück zum Ergebnis</router-link>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import router from "@/router";
import {mapState} from "vuex";
import questions from "@/questions";

export default defineComponent({
  name: 'Quiz',
  mounted() {
    this.startTimer();
  },
  data: function() {
    return {
      questionCount: questions.length,
      questionIndex: 1,
      questions,
      timer: '00:00:00',
      timerId: -1,
    }
  },
  computed: {
    ...mapState({
      showResults: 'showResults',
    })
  },
  methods: {
    getCurrentQuestion() {
      return this.questions[this.questionIndex - 1];
    },
    nextQuestion() {
      // @ts-ignore
      this.questionIndex < this.questionCount && (this.getCurrentQuestion().answer || this.showResults) && this.questionIndex++;
    },
    previousQuestion() {
      this.questionIndex > 1 && this.questionIndex--;
    },
    startTimer() {
      let totalSeconds = 0;
      this.timerId = setInterval(() => {
        ++totalSeconds;
        let hour: any = Math.floor(totalSeconds / 3600);
        let minute: any = Math.floor((totalSeconds - hour * 3600) / 60);
        let seconds: any = totalSeconds - (hour * 3600 + minute * 60);
        if (hour < 10)
          hour = "0" + hour;
        if (minute < 10)
          minute = "0" + minute;
        if (seconds < 10)
          seconds = "0" + seconds;

        // @ts-ignore
        this.timer = hour + ":" + minute + ":" + seconds;
      }, 1000);
    },
    finishQuiz() {
      clearInterval(this.timerId);

      // @ts-ignore
      this.$store.commit('setTimer', this.timer);
      // @ts-ignore
      this.$store.commit('setQuestions', this.questions);
      // @ts-ignore
      this.$store.commit('setShowResults', true);

      router.push({
        name: 'Result',
      });
    }
  }
})
</script>

<style scoped lang="scss">
h2 {
  margin: 0;
  font-weight: bold;
}

.back {
  display: block;
  margin-top: 20px;
}

.quiz {
  background-color: white;
  min-height: 300px;
  border-radius: 8px;
  margin-top: 10px;
  -webkit-box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &__timer {
    font-weight: bold;
  }

  &__next-question {
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
    color: #2c3e50;
    margin-bottom: 20px;

    @media (max-width: 767.98px) {
      width: 100% !important;
    }

    &:hover {
      margin-top: 25px;
      box-shadow: none;
    }
  }

  &__answers {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px 60px;

    &__text-result {
      margin-top: 20px;
      font-size: 20px;
      color: green;
    }

    > div {
      font-size: 24px;
      text-align: left;

      label {
        position: relative;
        padding: 0 0 0 30px;

        &.correct {
          color: green;
        }

        input {
          top: 11px;
          left: 0;
          position: absolute;
        }
      }
    }
  }

  &__question {
    background-color: #f3f3f3;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 40px 22px;
  }

  &__controls {
    display: flex;
    justify-content: space-between;

    @media (max-width: 767.98px) {
      flex-direction: column;

      > div {
        margin: 10px 0;
      }
    }

    &__progress {
      width: 100%;
      margin: 0 10px;
      flex-grow: 0;
      background: white;
      height: 35px;
      border-radius: 5px;
      display: flex;
      overflow: hidden;
      position: relative;

      &__text {
        z-index: 3;
        position: absolute;
        font-weight: bold;
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
      }

      &__section {
        height: 35px;
        width: 50%;
        transition: width 0.2s;
        background-color: #7392B7;
      }
    }

    button {
      flex-shrink: 0;
      border: none;
      background: #7392B7;
      border-radius: 5px;
      color: #2c3e50;
      padding: 5px 10px;
      font-weight: bold;
      height: 35px;

      &.disabled {
        cursor: default;
        opacity: 0.5;
      }

      &:not(.disabled):hover {
        background: #b0c2dd;
      }
    }
  }
}
</style>