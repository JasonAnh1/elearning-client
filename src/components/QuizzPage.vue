<template>
    <div class="container">
        <h1>Online Quizz</h1>
        <p>Answer questions:</p>
        <hr>
        <div class="card" v-for="(question, index) in quizzList" :key="index" >
            <div class="card-body">
                <h5 class="card-title">Quizz {{ index + 1 }}:</h5>
                <p v-if="question.type === 'MULTIPLECHOICE'">Chose correct choice:</p>
                <p v-else-if="question.type === 'FILLINTHEBLANK'">Fill in the blank:</p>
                <p v-html="question.question"></p>
                <!-- Hiển thị radiobuttons nếu là loại multiple choice -->

                <div class="btn-group-vertical "  aria-label="Basic radio toggle button group"
                    v-if="question.type === 'MULTIPLECHOICE'" style="width: 100%">
                    <div v-for="(choice, choiceIndex) in question.choices" :key="choiceIndex" style="width: 100%" >
                        <input type="radio" class="btn-check " :name="'btnradio' + question.id" :id="'btnradio' + choice.id" autocomplete="off" >
                        <label class="btn btn-outline-primary " style="width:  100%;" :for="'btnradio' + choice.id">{{ choice.content }}</label>
                    </div>
                </div>



                <!-- Hiển thị trường nhập liệu nếu là loại fill in the blank -->
                <input v-else-if="question.type === 'FILLINTHEBLANK'" type="text" class="form-control"
                    :name="'question' + index">
            </div>
        </div>
        <hr>
        <button type="button" class="btn btn-primary">Submit</button>
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
        addTest() {
            router.push({ path: "/CreateQuizzes", query: { lessonId: this.lessonId } });

        }


    },
    props: {
        msg: String
    },

}
</script>