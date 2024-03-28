<template>
    <div class="container">

        <h1>Online Quizz</h1>
        <p>Answer questions:</p>
        <hr>
        <div class="card" v-for="(question, index) in quizzList" :key="index">
            <div class="card-body">

                <h5 class="card-title">Quizz {{ index + 1 }}:</h5>
                <p v-if="question.type === 'MULTIPLECHOICE'">Chose correct choice:</p>
                <p v-else-if="question.type === 'FILLINTHEBLANK'">Fill in the blank:</p>
                <p v-html="question.question"></p>
                <!-- Hiển thị radiobuttons nếu là loại multiple choice -->

                <div class="btn-group-vertical " aria-label="Basic radio toggle button group"
                    v-if="question.type === 'MULTIPLECHOICE'" style="width: 100%">
                    <div v-for="(choice, choiceIndex) in question.choices" :key="choiceIndex" style="width: 100%">
                        <input type="radio" class="btn-check " :name="'btnradio' + question.id"
                            :id="'btnradio' + choice.id" autocomplete="off" :value=choice.content required>
                        <label class="btn btn-outline-dark " style="width:  100%;text-align: left"
                            :for="'btnradio' + choice.id">{{ choice.content }}</label>
                    </div>
                </div>



                <!-- Hiển thị trường nhập liệu nếu là loại fill in the blank -->
                <input v-else-if="question.type === 'FILLINTHEBLANK'" type="text" class="form-control"
                    :name="'question' + index" required>

            </div>
        </div>
        <hr>
        <button type="button" class="btn btn-primary" @click="checkAnswers">Submit</button>

    </div>

</template>

<script>
import router from "@/router";
export default {
    name: 'QuizzPage',
    data() {
        return {
            lessonId: this.$route.query.lessonId,

        }
    },
    components: {

    },
    computed: {
        quizzList() {
            return this.$store.state.currentQuizzes;
        },
    },
    mounted() {
        this.$store.dispatch('fetchQuizzes', this.lessonId);

    },
    methods: {

        checkAnswers() {

            let correctCount = 0;
            let validate = true;
            for (const question of this.quizzList) {
                if (question.type === 'MULTIPLECHOICE') {
                    // Xác định xem câu trả lời nào được chọn
                    const selectedInput = document.querySelector(`input[name='btnradio${question.id}']:checked`);

                    if (selectedInput === null || selectedInput === undefined) {
                        validate = false;
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill or chosen all the quizzes'
                        });
                        return;

                    }
                    const selectedChoice = selectedInput.value;

                    if (selectedChoice) {
                        console.log(selectedChoice.trim())
                        console.log(question.answer.trim())
                        // Lấy id của câu trả lời được chọn

                        if (selectedChoice.trim() === question.answer.trim()) {
                            correctCount++;
                        }


                    }
                } else if (question.type === 'FILLINTHEBLANK') {
                    // Lấy giá trị mà người dùng đã nhập

                    const userAnswer = document.querySelector(`input[name='question${this.quizzList.indexOf(question)}']`).value;
                    if (userAnswer.trim() === '' || userAnswer.trim() === null || userAnswer.trim() === undefined) {
                        validate = false;
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill or chosen all the quizzes'
                        });
                        return;
                    }
                    // So sánh với câu trả lời chính xác
                    if (userAnswer.trim().toLowerCase() === question.answer.trim().toLowerCase()) {
                        correctCount++;
                    }
                }

            }
            if (validate == true) {
                console.log(correctCount)
            }
            // // Hiển thị số lượng câu trả lời đúng
            // alert(`Bạn đã trả lời đúng ${correctCount} câu hỏi.`);

        },
        addTest() {
            router.push({ path: "/CreateQuizzes", query: { lessonId: this.lessonId } });

        }


    },
    props: {
        msg: String
    },

}
</script>