<template>
    <div class="container mt-5 ">
        <h3 class="fw-bold">Update Quizzes</h3>
        <form class="row g-3">
            <div>
                <!-- Đoạn mã HTML của bạn -->
                <div v-for="(question, index) in questions" :key="index">
                    <div v-if="question.removeFlag !== true">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Question {{ index + 1 }}

                                <div class="btn btn-danger" @click="removeQuizz(index)">Delete</div>
                            </label>
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
                                <input type="text" class="form-control" id="exampleFormControlInput1"
                                    v-model="question.qA.content">
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">B:</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1"
                                    v-model="question.qB.content">
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">C:</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1"
                                    v-model="question.qC.content">
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">D:</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1"
                                    v-model="question.qD.content">
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Nút để thêm câu hỏi mới -->
                <button v-on:click="addQuestion()" class="btn btn-primary">Add new</button>
                <!-- Nút để lưu câu hỏi -->
                <button v-on:click="updateQuestions()" class="btn btn-success">Save</button>
            </div>
        </form>

    </div>
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
export default {
    name: 'UpdateQuizzes',
    data() {
        return {
            lessonId: this.$route.query.lessonId,
            questions: []
        }
    },
    components: {
        VueEditor
    },
    computed: {
        currentCourse() {
            return this.$store.state.currentTagetCourse;
        },
        quizzList() {
            return this.$store.state.currentQuizzes;
        },
    },
    mounted() {
        this.$store.dispatch('fetchQuizzes', this.lessonId).then(() => {
            this.quizzList.forEach(e => {
                let question = {
                    qId: e.id,
                    qQuestion: e.question,
                    qAnswer: e.answer,
                    qType: e.type,
                    qA: { content: '' },
                    qB: { content: '' },
                    qC: { content: '' },
                    qD: { content: '' },
                }
                if (e.type == 'MULTIPLECHOICE') {
                    question['qA'] = e.choices[0];
                    question['qB'] = e.choices[1];
                    question['qC'] = e.choices[2];
                    question['qD'] = e.choices[3];
                }
                this.questions.push(question)
            })
            console.log(this.questions)

        });

    },
    methods: {
        mapQuestion() {

        },
        addQuestion() {
            this.questions.push({
                qQuestion: '',
                qAnswer: '',
                qType: 'FILLINTHEBLANK',
                qA: { content: '' },
                qB: { content: '' },
                qC: { content: '' },
                qD: { content: '' },
                lessonId: this.lessonId
            });
        },
        removeQuizz(index) {
            console.log(this.questions[index]);
            if (this.questions[index].qId !== undefined) {
                this.$set(this.questions[index], 'removeFlag', true);
            } else {
                this.questions.splice(index, 1);
            }

        },
        updateQuestions() {


            let payload = new Object();
            payload.questions = this.questions


            let flag = false;
            this.questions
                .filter(question => question.qType === 'MULTIPLECHOICE')
                .every(question => {
                    console.log(question)
                    // Kiểm tra nếu loại câu hỏi là MULTIPLECHOICE và có ít nhất một đáp án trùng với câu trả lời

                    flag = [question.qA, question.qB, question.qC, question.qD].some(choice => {
                        return choice.content.trim() === question.qAnswer.trim();

                    });
                    console.log(flag)
                    if (flag) {
                        return true;
                    }

                    // Nếu không phải MULTIPLECHOICE, bỏ qua kiểm tra và trả về true
                });
            if (!flag) {
                // Hiển thị thông báo hoặc thực hiện hành động tương ứng
                alert("Make sure there is one choice matching with answer!");
                return; // Ngăn chặn việc lưu câu hỏi
            } else {
                axios.post("api/v1/update-quizzes", payload, {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                }).then(
                    setTimeout(location.reload.bind(location), 90),
                    this.$router
                        .push({ path: "/QuizzPage", query: { lessonId: this.lessonId } })
                );
            }






        },

    },
    props: {
        msg: String
    },

}
</script>