<template>
    <div>
        <div class="my-learning container-fluid bg-dark " style="height: 200px;">
            <h1 class="t ms-5 pt-5 fw-bold ps-5 text-primary">ElearnCenter Studio</h1>
            <!-- <h1 class="btn btn-outline-primary  mt-3" style="margin-left:90px ;" data-bs-toggle="modal"
                data-bs-target="#createCourseModal">Create new course</h1> -->
            <div class="modal fade" id="createCourseModal" tabindex="-1" aria-labelledby="createCourseModal"
                aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="createCourseModal">Create course</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Short description</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Content</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Content</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Detail</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Price</label>
                                    <input type="number" class="form-control" id="exampleFormControlInput1">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">PriceSale</label>
                                    <input type="number" class="form-control" id="exampleFormControlInput1">
                                </div>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Level</option>
                                    <option value="1">BEGINNER</option>
                                    <option value="2">ADVANCED</option>
                                    <option value="3">INTERMEDIATE</option>
                                    <option value="4">EXPERT</option>
                                </select>
                                <div class="input-group mb-3">
                                    <input type="file" class="form-control " id="inputGroupFile02">
                                    <label class="input-group-text" for="inputGroupFile02">Upload</label>
                                    <img src="https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png"
                                        class="img-thumbnail" alt="..." style="width: 120px;height: 67px;">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-5 ">
            <form class="row g-3">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Title</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" v-model="lTitle">
                </div>
                <div class="mb-3">
                    <select class="form-select" aria-label="Default select example" v-model="lFree">
                        <option :value=false >Not free</option>
                        <option :value=true>Free</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Pass threshold</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" v-model="lPassThreshold"
                        placeholder="Number of questions to answer correctly to pass this lesson.">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Lesson position</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" v-model="lPosition"
                        placeholder="position of lesson in this course part.">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Content</label>
                    <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="lContent">
                    </VueEditor>
                </div>
                <div class="mb-3">
                    <label for="selectypelesson" class="form-label">Lesson type</label>

                    <select class="form-control" id="selectypelesson" v-model="lType">
                        <option value="VIDEO">VIDEO</option>
                        <option value="TEXT">TEXT</option>
                    </select>
                </div>
                <div class="input-group mb-3" v-if="lType === 'VIDEO'">
                    <label for="selectypelesson" class="form-label">Lesson video</label>
                    <input v-on:change="changeVideo()" type="file" class="form-control w-100" id="inputGroupFile03"
                        accept="video/*" ref="videoFile">

                    <div v-if="showVideo">
                        <video controls style="width: 500px;height: 350px;">
                            <source ref="videoSource" :src="videoSource" />
                        </video>
                    </div>
                </div>

                <div class="input-group mb-3" v-if="lType === 'VIDEO'">
                    <label for="selectypelesson" class="form-label">Lesson thumb image</label>
                    <input v-on:change="changePic()" type="file" class="form-control w-100" id="inputGroupFile02"
                        accept="image/*" ref="thumbFile">

                    <img :src=imageFile class="img-thumbnail mt-3" alt="..." style="width: 120px;height: 67px;">
                </div>
                <div class="btn btn-outline-primary w-25" v-on:click="addLesson()"
                    v-if="lessonId === null || lessonId === undefined">Create</div>
                <div class="btn btn-outline-primary w-25" v-on:click="updateLesson()" v-else>Update</div>
            </form>

        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    name: 'CreateLesson',
    data() {
        return {
            courseSectionId: this.$route.query.courseSectionId,
            lessonId: this.$route.query.lessonId,
            showVideo: false,
            videoSource: null,
            imageFile: null,
            lesson: new Object(),
            lContent: null,
            lType: null,
            lTitle: null,
            lPassThreshold: null,
            lPosition: null,
            lFree: false
        }
    },
    components: {
        VueEditor
    },
    computed: {
        currentCourse() {
            return this.$store.state.currentTagetCourse;
        },
        lessonCurrent() {
            return this.$store.state.currentTargetLesson;
        },
    },
    mounted() {
   
        if (this.lessonId !== null && this.lessonId !== undefined) {
            this.$store.dispatch('fetchTargetLesson', this.lessonId);
            this.lTitle = this.lessonCurrent.title;
            this.lPosition = this.lessonCurrent.position;
            this.lContent = this.lessonCurrent.content;
            this.lPassThreshold = this.lessonCurrent.passThreshold;
            this.lType = this.lessonCurrent.type;
            this.videoSource = this.lessonCurrent.media.originUrl;
            this.imageFile = this.lessonCurrent.media.thumbUrl;
            this.lFree = this.lessonCurrent.free;
            if (this.videoSource !== null && this.videoSource !== undefined) {
                this.showVideo = true
            }
        }

    },
    methods: {

        updateLesson() {

            if (this.lType === 'VIDEO' && this.$refs.thumbFile.files[0] !== undefined && this.$refs.videoFile.files[0]) {

                var formData = new FormData();
                formData.append('thumbFile', this.$refs.thumbFile.files[0]);
                formData.append('videoFile', this.$refs.videoFile.files[0]);

            }
            this.lesson = new Object({
                title: this.lTitle,
                content: this.lContent,
                type: this.lType,
                id: this.lessonId,
                passThreshold: this.lPassThreshold,
                position: this.lPosition,
                free: this.lFree
            })

            // fetchUpdateLesson
            this.$store.dispatch('fetchUpdateLesson', { 'media': formData, 'request': this.lesson });
            this.$router.go(-1);

        },
        addLesson() {
            if (!this.validateForm()) {

                return; // Nếu không hợp lệ, không thực hiện thêm bài học
            }
            if (this.lType === 'VIDEO') {
                var formData = new FormData();
                formData.append('thumbFile', this.$refs.thumbFile.files[0]);
                formData.append('videoFile', this.$refs.videoFile.files[0]);
            }

            this.lesson = new Object({
                title: this.lTitle,
                content: this.lContent,
                coursePartId: this.courseSectionId,
                type: this.lType,
                position: this.lPosition
            })
            this.$store.dispatch('fetchAddLesson', { 'media': formData, 'request': this.lesson })
            this.$router.go(-1);
        },
        validateForm() {
            // Kiểm tra các điều kiện tùy thuộc vào loại bài học
            if (this.lType === 'VIDEO') {
                // Kiểm tra xem video và hình ảnh đã được chọn chưa
                if (!this.$refs.videoFile.files.length || !this.$refs.thumbFile.files.length) {
                    this.$notify.error({
                        title: 'Error',
                        message: 'Please select video and thumb image.'
                    });
                    return false;
                }
            }

            // Kiểm tra xem title và pass threshold đã được nhập chưa
            if (!this.lTitle || !this.lPassThreshold) {
                this.$notify.error({
                    title: 'Error',
                    message: 'Please fill in all required fields.'
                });
                return false;
            }

            // Kiểm tra nếu có content, nếu là TEXT thì phải có nội dung
            if (this.lType === 'TEXT' && !this.lContent) {
                this.$notify.error({
                    title: 'Error',
                    message: 'Please fill in content field.'
                });
                return false;
            }

            return true; // Trả về true nếu tất cả điều kiện đều hợp lệ
        },
        changePic() {
            this.imageFile = URL.createObjectURL(this.$refs.thumbFile.files[0])
        },
        changeVideo() {
            this.showVideo = true;
            this.videoSource = window.URL.createObjectURL(this.$refs.videoFile.files[0])
            this.$refs.videoSource.parentElement.load()
        },
    },
    props: {
        msg: String
    },

}
</script>