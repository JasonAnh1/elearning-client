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
            <h3 class="fw-bold">{{ currentCourse.title }}:</h3>
            <div class="row row-cols-1 row-cols-md-4 jus">
                <div class="col">
                    <div class="card  ">
                        <a href="" class="text-decoration-none text-reset">
                            <img :src=currentCourse.media.originUrl class="card-img-top " alt="...">

                            <div class="card-body">
                                <h5 class="card-title fw-bold">{{ currentCourse.title }}</h5>
                                <p class="card-text">{{ currentCourse.author.name }}</p>
                            </div>
                            <div class="card-footer">
                                <i class="fa-solid fa-star text-warning"></i><i
                                    class="fa-solid fa-star text-warning"></i><i
                                    class="fa-solid fa-star text-warning"></i><i
                                    class="fa-solid fa-star text-warning"></i><i
                                    class="fa-regular fa-star-half-stroke text-warning"></i> <span
                                    class="text-muted text-decoration-none" style="font-size: 11px;">99999 Learner <i
                                        class="fa-solid fa-user"></i></span>
                            </div>
                        </a>
                    </div>

                </div>
                <div class="col-8 position-relative">
                    <div class=" text-white ">
                        <div class="accordion" id="accordionPanelsStayOpenExample">
                            <div class="accordion-item" v-for="item in currentCourse.sections" v-bind:key="item.id">
                                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                    <button class="accordion-button fw-bold " type="button" data-bs-toggle="collapse"
                                        :data-bs-target="'#' + item.title" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseOne">
                                        Section:{{ item.partNumber }} {{ item.title }}<br />
                                        1/1
                                    </button>

                                </h2>
                                <div :id=item.title class="accordion-collapse collapse show text-dark"
                                    aria-labelledby="panelsStayOpen-headingOne">

                                    <button v-for="lesson in item.lessons" v-bind:key="lesson.id" type="button"
                                        class="list-group-item list-group-item-action " aria-current="true" v-on:click="goToLesson(lesson.id)">
                                        <i class="fa-solid fa-video" v-if="lesson.type === 'VIDEO'">

                                        </i>
                                        <i class="fa-solid fa-file-lines" v-else-if="lesson.type === 'TEXT'"></i><span
                                            class="fw-bold" style="font-size: 14px;"> Reading:</span> {{ lesson.title }}
                                    </button>

                                    <div class="btn btn-outline-primary w-100" v-on:click="addLesson(item.id)">Add
                                        lesson</div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="btn btn-outline-primary position-absolute end-0 mt-2 me-2 " data-bs-toggle="modal"
                        data-bs-target="#exampleModal">Add section</div>
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form class="row g-3">
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label"
                                                ref="csTitle">Title</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                                ref="csTitle">
                                        </div>


                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">section
                                                part</label>
                                            <input type="number" class="form-control" id="exampleFormControlInput1"
                                                ref="csPartNumber">
                                        </div>


                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Close</button>
                                    <button class="btn btn-primary" v-on:click="addCourseSection(currentCourse.id)">Save
                                        changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <div class="rating container mt-5">
            <h4 class="fw-bold">
                <span class="badge bg-success">4,8</span>
                <span class="text-muted">Course rating • 350 rate</span>
            </h4>
            <hr>
            <div class="row gx-5">
                <div class="col-6 card mb-2 ">
                    <div class="card-body">
                        <h5 class="card-title"><img
                                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                alt="Avatar" class="rounded-circle" style="width: 70px;"> Lưu Gia H.</h5>
                        <span class="text-muted">1 tuần trước</span>
                        <p class="card-text">
                            Mọi thứ rất là đỉnh, cảm ơn anh đã tạo ra course này. Đợi course nâng cao hơn của anh :3
                        </p>
                        <div class="">
                            <button type="button" class="btn btn-sm btn-outline-secondary">Report</button>
                            <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i> <i
                                class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                        </div>
                    </div>
                </div>
                <div class="col-6 card mb-2">
                    <div class="card-body">
                        <h5 class="card-title"><img
                                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn Thành T.</h5>
                        <span class="text-muted">1 tháng trước</span>
                        <p class="card-text">
                            Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ ràng, lôi cuốn
                            người nghe.
                        </p>
                        <div class="">
                            <button type="button" class="btn btn-sm btn-outline-secondary">Report</button>
                            <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i> <i
                                class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                        </div>
                    </div>
                </div>
                <div class="col-6 card mb-2">
                    <div class="card-body">
                        <h5 class="card-title"><img
                                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn Thành T.</h5>
                        <span class="text-muted">1 tháng trước</span>
                        <p class="card-text">
                            Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ ràng, lôi cuốn
                            người nghe.
                        </p>
                        <div class="">
                            <button type="button" class="btn btn-sm btn-outline-secondary">Report</button>
                            <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i> <i
                                class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                        </div>
                    </div>
                </div>
                <div class="col-6 card mb-2">
                    <div class="card-body">
                        <h5 class="card-title"><img
                                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn Thành T.</h5>
                        <span class="text-muted">1 tháng trước</span>
                        <p class="card-text">
                            Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ ràng, lôi cuốn
                            người nghe.
                        </p>
                        <div class="">
                            <button type="button" class="btn btn-sm btn-outline-secondary">Report</button>
                            <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i> <i
                                class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                        </div>
                    </div>
                </div>
                <button class="btn w-100 btn-outline-secondary " data-bs-toggle="modal"
                    data-bs-target="#exampleModal">Show
                    all
                    rating</button>
            </div>

            <!-- Button trigger modal -->

            <!-- Modal -->
            <div class="modal fade container-fluid" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="mt-4">
                                <span class="badge bg-success">4,8</span>
                                <span class="text-muted">Course rating • 350 rate</span>
                            </h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body container">
                            <div class="row">
                                <div class="col-3">
                                    <div class="row 5star">
                                        <div class="col-5">
                                            <div class="progress ">
                                                <div class="progress-bar " role="progressbar" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="100" style="width: 53%"></div>
                                            </div>
                                        </div>
                                        <div class="col-7 fw-bold">
                                            <i class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i>
                                            53%
                                        </div>
                                        <div class="col-2">

                                        </div>
                                    </div>

                                    <div class="row 4star">
                                        <div class="col-5">
                                            <div class="progress ">
                                                <div class="progress-bar " role="progressbar" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="100" style="width: 37%"></div>
                                            </div>
                                        </div>
                                        <div class="col-7  fw-bold">
                                            <i class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i class="fa fa-star"></i>
                                            37%
                                        </div>

                                    </div>

                                    <div class="row 3star">
                                        <div class="col-5">
                                            <div class="progress ">
                                                <div class="progress-bar " role="progressbar" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="100" style="width: 8%"></div>
                                            </div>
                                        </div>
                                        <div class="col-7  fw-bold">
                                            <i class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i class="fa fa-star"></i><i
                                                class="fa fa-star"></i>
                                            8%
                                        </div>
                                    </div>

                                    <div class="row 2star">
                                        <div class="col-5">
                                            <div class="progress ">
                                                <div class="progress-bar " role="progressbar" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="100" style="width: 1%"></div>
                                            </div>
                                        </div>
                                        <div class="col-7  fw-bold">
                                            <i class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i class="fa fa-star"></i><i
                                                class="fa fa-star"></i><i class="fa fa-star"></i>
                                            1%
                                        </div>
                                    </div>

                                    <div class="row 1star">
                                        <div class="col-5">
                                            <div class="progress ">
                                                <div class="progress-bar " role="progressbar" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="100" style="width: 1%"></div>
                                            </div>
                                        </div>
                                        <div class="col-7  fw-bold">
                                            <i class="fa fa-star text-warning"></i><i class="fa fa-star"></i><i
                                                class="fa fa-star"></i><i class="fa fa-star"></i><i
                                                class="fa fa-star"></i>
                                            1%
                                        </div>
                                    </div>

                                </div>
                                <div class="col-9">

                                    <div class=" card mb-2">
                                        <div class="card-body">
                                            <h5 class="card-title"><img
                                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                                    alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn
                                                Thành T.</h5>
                                            <span class="text-muted">1 tháng trước</span>
                                            <p class="card-text">
                                                Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ
                                                ràng, lôi cuốn
                                                người nghe.
                                            </p>
                                            <div class="">
                                                <button type="button"
                                                    class="btn btn-sm btn-outline-secondary">Report</button>
                                                <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i>
                                                <i
                                                    class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div class=" card mb-2">
                                        <div class="card-body">
                                            <h5 class="card-title"><img
                                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                                    alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn
                                                Thành T.</h5>
                                            <span class="text-muted">1 tháng trước</span>
                                            <p class="card-text">
                                                Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ
                                                ràng, lôi cuốn
                                                người nghe.
                                            </p>
                                            <div class="">
                                                <button type="button"
                                                    class="btn btn-sm btn-outline-secondary">Report</button>
                                                <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i>
                                                <i
                                                    class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" card mb-2">
                                        <div class="card-body">
                                            <h5 class="card-title"><img
                                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                                    alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn
                                                Thành T.</h5>
                                            <span class="text-muted">1 tháng trước</span>
                                            <p class="card-text">
                                                Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ
                                                ràng, lôi cuốn
                                                người nghe.
                                            </p>
                                            <div class="">
                                                <button type="button"
                                                    class="btn btn-sm btn-outline-secondary">Report</button>
                                                <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i>
                                                <i
                                                    class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" card mb-2">
                                        <div class="card-body">
                                            <h5 class="card-title"><img
                                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                                    alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn
                                                Thành T.</h5>
                                            <span class="text-muted">1 tháng trước</span>
                                            <p class="card-text">
                                                Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ
                                                ràng, lôi cuốn
                                                người nghe.
                                            </p>
                                            <div class="">
                                                <button type="button"
                                                    class="btn btn-sm btn-outline-secondary">Report</button>
                                                <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i>
                                                <i
                                                    class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" card mb-2">
                                        <div class="card-body">
                                            <h5 class="card-title"><img
                                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                                    alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn
                                                Thành T.</h5>
                                            <span class="text-muted">1 tháng trước</span>
                                            <p class="card-text">
                                                Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ
                                                ràng, lôi cuốn
                                                người nghe.
                                            </p>
                                            <div class="">
                                                <button type="button"
                                                    class="btn btn-sm btn-outline-secondary">Report</button>
                                                <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i>
                                                <i
                                                    class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router';
export default {
    name: 'DetailCourseStudio',
    data() {
        return {
            courseSection: new Object(),
            courseId: this.$route.query.courseId,

        }
    },
    components: {

    },
    computed: {

        currentCourse() {
            return this.$store.state.currentTagetCourse;
        },
       
    },
    mounted() {
        this.$store.dispatch('fetchCourse', this.courseId);

    },
    methods: {
        goToLesson(lessonId) {
            router.push({ path: "/LessonPage", query: { lessonId: lessonId } });
        },

        addCourseSection(courseIds) {
            const courseid = courseIds
            this.courseSection = new Object({
                title: this.$refs.csTitle.value,
                partNumber: this.$refs.csPartNumber.value,
                courseId: courseid
            })
            this.$store.dispatch('fetchAddCourseSection', { 'request': this.courseSection });
        },
        addLesson(courseStId) {
            router.push({ path: 'CreateLesson', query: { courseSectionId: courseStId } })
        }
    },
    props: {
        msg: String
    },

}
</script>