<template>
    <div class="container mt-5 ">
        <h3 class="fw-bold">Create Quizzes</h3>
        <form class="row g-3">
            <div>
                <!-- Đoạn mã HTML của bạn -->
                <div v-for="(question, index) in questions" :key="index">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Question {{ index + 1 }}</label>
                        <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3"
                            v-model="question.qQuestion"></VueEditor>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Answer</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1"
                            v-model="question.qAnswer">
                    </div>
                    <div class="mb-3">
                        <label for="selectypelesson" class="form-label">Quizz type</label>
                        <select class="form-control" id="selectypelesson" v-model="question.qType">
                            <option value="FILLINTHEBLANK" selected>Fill in the blank</option>
                            <option value="MULTIPLECHOICE">Multiple choice</option>
                        </select>
                    </div>
                    <div v-if="question.qType === 'MULTIPLECHOICE'">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">A:</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="question.qA">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">B:</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="question.qB">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">C:</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="question.qC">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">D:</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="question.qD">
                        </div>
                    </div>
                </div>

                <!-- Nút để thêm câu hỏi mới -->
                <button v-on:click="addQuestion()" class="btn btn-primary">Thêm câu hỏi mới</button>
                <!-- Nút để lưu câu hỏi -->
                <button v-on:click="saveQuestions()" class="btn btn-success">Lưu câu hỏi</button>
            </div>
        </form>
       
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    name: 'CreateQuizzes',
    data() {
        return {
            lessonId: this.$route.query.lessonId,
            questions: [{
                qQuestion: '',
                qAnswer: '',
                qType: 'FILLINTHEBLANK',
                qA: {},
                qB: {},
                qC: {},
                qD: {},

            }]
        }
    },
    components: {
        VueEditor
    },
    computed: {
        currentCourse() {
            return this.$store.state.currentTagetCourse;
        },
    },
    mounted() {


    },
    methods: {
        addQuestion() {
            this.questions.push({
                qQuestion: '',
                qAnswer: '',
                qType: 'FILLINTHEBLANK',
                qA: '',
                qB: '',
                qC: '',
                qD: ''
            });
        },
        saveQuestions() {
          
            const payload = new Object();
            payload.quizzList = this.questions
            payload.lessonId = this.lessonId
             this.$store.dispatch('fetchAddQuizzes',payload);
            // console.log('Các câu hỏi được lưu:', payload);
        },
        addLesson() {
            if (this.lType === 'VIDEO') {
                var formData = new FormData();
                formData.append('thumbFile', this.$refs.thumbFile.files[0]);
                formData.append('videoFile', this.$refs.videoFile.files[0]);
            }

            this.lesson = new Object({
                title: this.$refs.lTitle.value,
                content: this.lContent,
                coursePartId: this.courseSectionId,
                type: this.lType
            })
            this.$store.dispatch('fetchAddLesson', { 'media': formData, 'request': this.lesson });
        }
    },
    props: {
        msg: String
    },

}
</script>