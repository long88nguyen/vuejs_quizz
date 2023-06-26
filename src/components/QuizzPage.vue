<template>
  <div class="quizz_layout">
    <router-link to="/" class="btn btn-outline-primary">Return</router-link>
    <div class="quizz_point">
      <span><i class="fa-solid fa-award"></i> Point : {{ score }}</span>
    </div>
    <div class="quizz_question">
      <h1>{{ timeInit }}</h1>
      <span class="question_content">{{
        question[currentQuestion].question
      }}</span>
    </div>
    <div class="quizz_answer">
      <ul
        v-for="(item, index) in question[currentQuestion].option"
        :key="index"
      >
        <li>
          <input
            type="radio"
            name="radio"
            v-model="answerSelected"
            :value="index"
          />
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
  <div>
    <a-modal v-model:visible="visible" title="Game over" @ok="handleOk"
    @cancel="handleEditCancel"
    :footer="null" >
      <p>Điểm số của bạn là : {{ score }}</p>
      <a-button type="primary" @click="returnHome">Quay lại</a-button>
    </a-modal>
  </div>
</template>

<script setup>
import router from "@/router";
import { onMounted, ref } from "vue";
import questionData from "../data/countries.json";
const question = shuffle(questionData);
const currentQuestion = ref(0);
const answerSelected = ref(null);
const timeInit = ref(10);
const score = ref(0);
const result = ref(true);
const visible = ref(false);

function checkAnswer() {
  if (question[currentQuestion.value].answer == answerSelected.value) {
    score.value++;
    answerSelected.value = null;
    nextQuestion();
  } else {
    result.value = false;
  }
}

function returnHome(){
  router.push("/")
}

function handleEditCancel()
{
  router.push("/")
}

function nextQuestion() {
  currentQuestion.value++;
  timeInit.value = 10;
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function countdown() {
    var timeDown = setInterval(() => {
      if (timeInit.value > 0) {
        timeInit.value--;
      } else {
        if (currentQuestion.value + 1 == question.length || !(result.value)) {
          clearInterval(timeDown);
          visible.value = true;
        }
        else {
          checkAnswer();
        }
      }
    }, 1000);
}

onMounted(countdown);
</script>

<style lang="scss">
* {
  font-family: "Roboto", sans-serif;
  padding: 0;
  margin: 0;
}
.quizz_layout {
  margin-top: 20px;
  .quizz_point {
    text-align: end;
    span {
      font-size: 16px;
      font-weight: bold;
      .fa-award {
        color: darkcyan;
      }
    }
  }
  .quizz_question {
    width: 60%;
    margin: 0 auto;
    text-align: center;
    .question_content {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .quizz_answer {
    width: 60%;
    margin: 0 auto;
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        margin: 10px 0;
        font-size: 15px;
      }
    }
  }
}
</style>