<template>
    <div>
        <div class="my-learning container-fluid bg-dark " style="height: 200px;">
            <h1 class="t ms-5 pt-5 fw-bold ps-5 text-primary">ElearnCenter Studio</h1>
            <h1 class="btn btn-outline-primary  mt-3" style="margin-left:90px ;" data-bs-toggle="modal"
                data-bs-target="#createCourseModal">Create new course</h1>
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
                    <input type="text" class="form-control" id="exampleFormControlInput1" ref="lTitle">
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

                <div class="input-group mb-3"  v-if="lType === 'VIDEO'">
                    <label for="selectypelesson" class="form-label">Lesson thumb image</label>
                    <input v-on:change="changePic()" type="file" class="form-control w-100" id="inputGroupFile02"
                        accept="image/*" ref="thumbFile">

                    <img :src=imageFile class="img-thumbnail mt-3" alt="..." style="width: 120px;height: 67px;">
                </div>
                <div class="btn btn-outline-primary w-25" v-on:click="addLesson()">Create</div>
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
            showVideo: false,
            videoSource: null,
            imageFile: null,
            lesson: new Object(),
            lContent: null,
            lType: null
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


        addLesson() {
            if(this.lType ==='VIDEO'){
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