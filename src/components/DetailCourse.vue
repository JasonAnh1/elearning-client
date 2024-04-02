<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8">
          <div class="card mb-3 shadow-sm" >

            <div class="card-body">
              <h5 class="card-title fw-bold">{{ currentCourse.title }} </h5>
              <p class="card-text">{{ currentCourse.shortDes }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="mb-2">
                  <span class="badge bg-success">top seller</span>
                  <span class="text-muted">4.0 (98,846 rate)</span>
                  <span class="text-muted">415,746 learner</span>
                </div>
                <div class="mb-2">
                  <span class="text-muted">Created By:</span>
                  <a href="#">{{ currentCourse.author.name }}</a>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="mb-2" v-if="currentCourse.isEnrolled === false">
                  <span class="text-muted">Price:</span>
                  <span class="text-decoration-line-through">{{ formatCurrency(currentCourse.price) }}</span>
                </div>
                <div class="mb-2" v-if="currentCourse.isEnrolled === false">
                  <span class="text-danger" >Discount {{ ((currentCourse.price - currentCourse.priceSale) /
                currentCourse.price * 100).toFixed(0) }}%</span>
                </div>
              </div>
              <h4 class="card-title" v-if="currentCourse.isEnrolled === false">{{ formatCurrency(currentCourse.priceSale) }}</h4>
              <div class="d-flex justify-content-between align-items-center" v-if="currentCourse.isEnrolled === false">
                <button type="button" class="btn btn-primary">Add to cart</button>
                <button type="button" class="btn btn-outline-primary">Buy now</button>
              </div>
            </div>
          </div>
          <div class="accordion" id="accordionPanelsStayOpenExample">
                            <div class="accordion-item" v-for="(item, index) in currentCourse.sections"
                                v-bind:key="index">

                                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                    <button class="accordion-button fw-bold " type="button" data-bs-toggle="collapse"
                                        :data-bs-target="'#target' + index" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseOne"
                                        >
                                        Section:{{ item.partNumber }} {{ item.title }}<br />
                                        1/1

                                    </button>

                                </h2>
                            
                                <div :id="'target' + index" class="accordion-collapse collapse show text-dark"
                                    aria-labelledby="panelsStayOpen-headingOne">

                                    <button v-for="lesson in item.lessons" v-bind:key="lesson.id" type="button"
                                        class="list-group-item list-group-item-action " aria-current="true"
                                        v-on:click="goToLesson(lesson.id)" :disabled="!lesson.free">
                                        <i class="fa-solid fa-video" v-if="lesson.type === 'VIDEO'">

                                        </i>
                                        <i class="fa-solid fa-file-lines" v-else-if="lesson.type === 'TEXT'"></i><span
                                            class="fw-bold" style="font-size: 14px;"> Reading:</span> {{ lesson.title }}
                                    </button>

                              

                                </div>
                            </div>

                        </div>
          
          <div class="requirement">
            <h4 class="mt-4 fw-bold">Requirement</h4>
            <div v-html="currentCourse.requirement"></div>
          </div>
          <div class="description">
            <h4 class="mt-4 fw-bold">Description</h4>
            <div class="mt-2">
              <div v-html="currentCourse.description"></div>
            </div>
          </div>
          <div class="lecturers">
            <div class="h4 fw-bold mt-4">Lecturers</div>
            <a class="h3 fw-bold"> {{ currentCourse.author.name }}</a>
            <div class="short-des">Bestselling Azure & TOGAF® Trainer, Microsoft Azure MVP</div>
            <div class="row">
              <div class="col-2">
                <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g" alt="Avatar"
                  class="rounded-circle" style="width: 100px;">
              </div>
              <div class="col-5">
                <p><i class="fa fa-star"></i> 4,5 lecturers rate</p>
                <p><i class="fa-solid fa-play"></i>60 video</p>
                <p><i class="fa-solid fa-medal"></i>30210 rate</p>
                <p><i class="fa-solid fa-user-group"></i>60000 learnner</p>
              </div>
            </div>
            <div class="description">
              This has been the basis of my entire career – as a developer, as a development manager, as a software
              architect – over the past 20 years. I spend half my time in the world of business, explaining complex
              technical topics to business owners and stakeholders so that they can understand and agree with my
              approach to solving their business problems with technical solutions. And the other half with developers,
              explaining the business reasons behind decisions and ensuring that any decisions made on the technical
              side don't restrict the business in unexpected ways.
            </div>
          </div>
          <div class="top-rating mt-4">
            <div class="row">
              <div class="col-md-12">
                <h4 class="fw-bold">Top content</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-10">
                        <h3> <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                            alt="Avatar" class="rounded-circle" style="width: 70px;"> Andrew M.</h3>
                        <p>74 khóa học, 19 đánh giá</p>
                        <p><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                            class="fa fa-star"></i><i class="fa fa-star"></i></p>
                        <p>4 năm trước</p>
                        <p>Mặc dù tôi chưa thi, nhưng khóa học này phù hợp với các hướng dẫn của MS cho AZ-900 và tôi
                          rất
                          mong chờ được thi! Scott nói rõ ràng, súc tích và nội dung đơn giản. Đây là một khóa học tuyệt
                          vời để bắt đầu với Azure và tôi khuyên bạn nên tham gia.</p>
                        <p>Đánh giá này có hữu ích không? <i
                            class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i> <i
                            class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i></p>
                        <a href="#" class="btn btn-primary">Báo cáo</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="rating container">
            <h4 class="mt-4 fw-bold">
              <span class="badge bg-success">4,8</span>
              <span class="text-muted">Course rating • 350 rate</span>
            </h4>
            <hr>
            <div class="row gx-5">
              <div class="col-6 card mb-2 ">
                <div class="card-body">
                  <h5 class="card-title"><img
                      src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g" alt="Avatar"
                      class="rounded-circle" style="width: 70px;"> Lưu Gia H.</h5>
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
                      src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g" alt="Avatar"
                      class="rounded-circle" style="width: 70px;"> Nguyễn Thành T.</h5>
                  <span class="text-muted">1 tháng trước</span>
                  <p class="card-text">
                    Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ ràng, lôi cuốn người nghe.
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
                      src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g" alt="Avatar"
                      class="rounded-circle" style="width: 70px;"> Nguyễn Thành T.</h5>
                  <span class="text-muted">1 tháng trước</span>
                  <p class="card-text">
                    Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ ràng, lôi cuốn người nghe.
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
                      src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g" alt="Avatar"
                      class="rounded-circle" style="width: 70px;"> Nguyễn Thành T.</h5>
                  <span class="text-muted">1 tháng trước</span>
                  <p class="card-text">
                    Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ ràng, lôi cuốn người nghe.
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
                              <div class="progress-bar " role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                aria-valuemax="100" style="width: 53%"></div>
                            </div>
                          </div>
                          <div class="col-7 fw-bold">
                            <i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i
                              class="fa fa-star text-warning text-warning"></i><i class="fa fa-star text-warning"></i><i
                              class="fa fa-star text-warning"></i>
                            53%
                          </div>
                          <div class="col-2">

                          </div>
                        </div>

                        <div class="row 4star">
                          <div class="col-5">
                            <div class="progress ">
                              <div class="progress-bar " role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                aria-valuemax="100" style="width: 37%"></div>
                            </div>
                          </div>
                          <div class="col-7  fw-bold">
                            <i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i
                              class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i
                              class="fa fa-star"></i>
                            37%
                          </div>

                        </div>

                        <div class="row 3star">
                          <div class="col-5">
                            <div class="progress ">
                              <div class="progress-bar " role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                aria-valuemax="100" style="width: 8%"></div>
                            </div>
                          </div>
                          <div class="col-7  fw-bold">
                            <i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i
                              class="fa fa-star text-warning"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                            8%
                          </div>
                        </div>

                        <div class="row 2star">
                          <div class="col-5">
                            <div class="progress ">
                              <div class="progress-bar " role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                aria-valuemax="100" style="width: 1%"></div>
                            </div>
                          </div>
                          <div class="col-7  fw-bold">
                            <i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i
                              class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                            1%
                          </div>
                        </div>

                        <div class="row 1star">
                          <div class="col-5">
                            <div class="progress ">
                              <div class="progress-bar " role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                aria-valuemax="100" style="width: 1%"></div>
                            </div>
                          </div>
                          <div class="col-7  fw-bold">
                            <i class="fa fa-star text-warning"></i><i class="fa fa-star"></i><i
                              class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                            1%
                          </div>
                        </div>

                      </div>
                      <div class="col-9">

                        <div class=" card mb-2">
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

                        <div class=" card mb-2">
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
                        <div class=" card mb-2">
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
                        <div class=" card mb-2">
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
                        <div class=" card mb-2">
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
        <div class="col-md-4">
          <div class="card shadow">
            <div class="hovereffect">
              <img class="card-img-top img-responsive" :src=currentCourse.media.originUrl
                alt="">
              <div class="overlay" v-if="currentCourse.isEnrolled === false">
                <h2 class="rounded bg-primary btn" > <i class="fa-solid fa-play"> Enroll </i></h2>
                <p class="icon-links">
                  <a href="#" class="">
                    <i class="fa-solid fa-cart-shopping"></i>
                  </a>
                  <a href="#">
                    <i class="fa-solid fa-heart text-danger"></i>
                  </a>
                </p>
              </div>
            </div>
            <!-- <img src="https://img-b.udemycdn.com/course/480x270/2420912_0623.jpg" class="card-img-top" alt="..."> -->
            <div class="card-body">
              <h5 class="card-title fw-bold">Course Content</h5>
              <ul class="list-unstyled">
                <div v-html="currentCourse.courseContent"></div>
              </ul>
              <h5 class="card-title fw-bold">Details</h5>
              <ul class="list-unstyled">
                <div v-html="currentCourse.detail"></div>
              </ul>
            </div>
          </div>
          <div class="mt-5 d-flex justify-content-center" v-if="currentCourse.isEnrolled === true">
            <el-progress type="circle" :percentage="77.5" width="250"></el-progress>
          </div>
       
  
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DetailCourse',
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

    this.$store.dispatch('fetchCourse', this.courseId)
 
  },

  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    },
    goToLesson(lessonId) {
            this.$router.push({ path: "/LessonPage", query: { lessonId: lessonId,courseId: this.courseId } })
        },
  },
  props: {
    msg: String
  },

}
</script>
<style scoped>
.hovereffect {
  width: 100%;
  height: 100%;
  float: left;
  overflow: hidden;
  position: relative;
  text-align: center;
  cursor: default;
}

.hovereffect .overlay {
  width: 100%;
  position: absolute;
  overflow: hidden;
  left: 0;
  top: auto;
  bottom: 0;
  padding: 1em;
  height: 4.75em;
  background: #79FAC4;
  color: #3c4a50;
  -webkit-transition: -webkit-transform 0.35s;
  transition: transform 0.35s;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
  visibility: hidden;

}

.hovereffect img {
  display: block;
  position: relative;
  -webkit-transition: -webkit-transform 0.35s;
  transition: transform 0.35s;
}

.hovereffect:hover img {
  -webkit-transform: translate3d(0, -10%, 0);
  transform: translate3d(0, -10%, 0);
}

.hovereffect h2 {

  color: #fff;
  text-align: center;
  position: relative;
  font-size: 12px;
  padding: 10px;

  float: left;
  margin: 5px;
  display: inline-block;
  cursor: pointer;
}

.hovereffect a.info {
  display: inline-block;
  text-decoration: none;
  padding: 7px 14px;
  text-transform: uppercase;
  color: #fff;
  border: 1px solid #fff;
  margin: 50px 0 0 0;
  background-color: transparent;
}

.hovereffect a.info:hover {
  box-shadow: 0 0 5px #fff;
}


.hovereffect p.icon-links a {
  float: right;
  color: #3c4a50;
  font-size: 1.4em;
}

.hovereffect:hover p.icon-links a:hover,
.hovereffect:hover p.icon-links a:focus {
  color: #252d31;
}

.hovereffect h2,
.hovereffect p.icon-links a {
  -webkit-transition: -webkit-transform 0.35s;
  transition: transform 0.35s;
  -webkit-transform: translate3d(0, 200%, 0);
  transform: translate3d(0, 200%, 0);
  visibility: visible;
}

.hovereffect p.icon-links a span:before {
  display: inline-block;
  padding: 8px 10px;
  speak: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


.hovereffect:hover .overlay,
.hovereffect:hover h2,
.hovereffect:hover p.icon-links a {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.hovereffect:hover h2 {
  -webkit-transition-delay: 0.05s;
  transition-delay: 0.05s;
}

.hovereffect:hover p.icon-links a:nth-child(3) {
  -webkit-transition-delay: 0.1s;
  transition-delay: 0.1s;
}

.hovereffect:hover p.icon-links a:nth-child(2) {
  -webkit-transition-delay: 0.15s;
  transition-delay: 0.15s;
}

.hovereffect:hover p.icon-links a:first-child {
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
</style>