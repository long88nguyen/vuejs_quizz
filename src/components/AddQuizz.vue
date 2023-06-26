<template>
  <div>
    <h2>{{ currentQuestion.question }}</h2>
    <ul>
      <li v-for="(answer, index) in currentQuestion.answers" :key="index">
        <label>
          <input
            type="radio"
            v-model="selectedAnswer"
            :value="index"
            :disabled="answered"
          />
          {{ answer }}
        </label>
      </li>
    </ul>
    <p v-if="answered && !isLastQuestion">Điểm số: {{ score }}</p>
    <p v-if="isLastQuestion">Điểm số cuối cùng: {{ score }}</p>
    <button v-if="!answered && timeLeft > 0" @click="checkAnswer">Kiểm tra</button>
    <button v-if="answered && !isLastQuestion" @click="nextQuestion">Câu tiếp theo</button>
  </div>
</template>
  
  <script>
import { ref, computed, reactive, watch, onMounted } from 'vue';


export default {
  name: "HelloWorld",
  setup() {
    const questions = reactive([
      {
        question: "Câu hỏi 1",
        answers: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
        correctAnswer: 0,
      },
      {
        question: "Câu hỏi 2",
        answers: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
        correctAnswer: 1,
      },
      {
        question: "Câu hỏi 3",
        answers: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
        correctAnswer: 2,
      },
    ]);

    const currentQuestionIndex = ref(0);
    const currentQuestion = ref(questions[currentQuestionIndex.value]);
    const selectedAnswer = ref(null);
    const answered = ref(false);
    const score = ref(0);

    const isLastQuestion = computed(
      () => currentQuestionIndex.value === questions.length - 1
    );

    const checkAnswer = () => {
      if (selectedAnswer.value === currentQuestion.value.correctAnswer) {
        score.value++;
      }

      answered.value = true;
    }

    const nextQuestion = () => {
      currentQuestionIndex.value++;
      currentQuestion.value = questions[currentQuestionIndex.value];
      selectedAnswer.value = null;
      answered.value = false;
    };

    return {
      currentQuestion,
      selectedAnswer,
      answered,
      score,
      isLastQuestion,
      checkAnswer,
      nextQuestion,
    };
  },
};
</script>