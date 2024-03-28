<template>
  <div class="container-fluid">

    <div class="row flex-nowrap">
      <div class="col py-6">
        <!-- <video class="w-100" controls v-if="lesson.type === 'VIDEO'"  :key="lesson.media.originUrl">
            <source :src=lesson.media.originUrl type="video/mp4"> 

       
          </video> -->
        <div class="row bg-dark">
          <div class="video-container w-75">
            <video controls v-if="lesson.type === 'VIDEO'" :key="lesson.media.originUrl" ref="videoPlayer"
              @timeupdate="updateProgress">
              <source :src="lesson.media.originUrl" type="video/mp4">
            </video>

          </div>

        </div>


        <div class="description">
          <h2 class="fw-bold mt-4">{{ lesson.title }}</h2>
          <div v-html="lesson.content" ref="content"></div>
          <!-- Button trigger modal -->
          <button type="button" class="btn w-25 btn-outline-dark fw-bold" data-bs-toggle="modal"
            data-bs-target="#staticBackdrop">
            Resource
          </button>

          <span v-if="lesson.haveTest === true">
            <span v-if="lesson.type === 'TEXT'">
              <a type="button" class="btn w-25 btn-outline-dark fw-bold" v-on:click="goToTest()">
                Take a test
              </a>
            </span>
            <span v-else>
              <a type="button" class="btn w-25 btn-outline-dark fw-bold" v-on:click="goToTest()"
                v-if="videoCompleted === true">
                Take a test
              </a>
            </span>
          </span>
          <button type="button" class="btn w-25 btn-outline-dark fw-bold">
            Mark as Done!
          </button>
          <button type="button" class="btn w-25 btn-outline-dark fw-bold" v-on:click="addTest()"
            v-if="role === 'ROLE_LECTURE'">
            Add a Test
          </button>
          <button type="button" class="btn w-25 btn-outline-dark fw-bold" v-on:click="updateTest()"
            v-if="role === 'ROLE_LECTURE'">
            Update test
          </button>
          <button type="button" class="btn w-25 btn-outline-dark fw-bold" v-on:click="updateLesson(lesson.id)"
            v-if="role === 'ROLE_LECTURE'">
            Update Lesson
          </button>
          <h3 class="fw-bold mt-4">Questions</h3>
          <div class="container-fluid mt-3">

            <div class="row d-flex justify-content-center">
              <div class="col-md-12">
                <div class="card" style="border: none;">
                  <div class="card-body">
                    <div class="d-flex flex-start align-items-center">
                      <img class="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="60"
                        height="60" />
                      <div>
                        <h6 class="fw-bold text-primary mb-1">Lily Coleman</h6>
                        <p class="text-muted small mb-0">
                          Shared publicly - Jan 2020
                        </p>
                      </div>
                    </div>

                    <p class="mt-3 mb-4 pb-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.
                    </p>

                    <div class="small d-flex justify-content-start">
                      <a href="#!" class="d-flex align-items-center me-3">
                        <i class="far fa-thumbs-up me-2"></i>
                        <p class="mb-0">Like</p>
                      </a>
                      <a class="d-flex align-items-center me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="far fa-comment-dots me-2"></i>
                        <p class="mb-0">Reply</p>
                      </a>
                      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <div class="d-flex flex-start w-100">
                                <img class="rounded-circle shadow-1-strong me-3"
                                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar"
                                  width="40" height="40" />
                                <div class="form-outline w-100">
                                  <textarea class="form-control" id="textAreaExample" rows="4"
                                    style="background: #fff;"></textarea>

                                </div>
                              </div>

                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary">Reply</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <a href="#!" class="d-flex align-items-center me-3">
                        <i class="fas fa-share me-2"></i>
                        <p class="mb-0">Share</p>
                      </a>
                    </div>
                  </div>
                  <div class="card-body tier-2 w-75 ms-5">
                    <div class="d-flex flex-start align-items-center">
                      <img class="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="60"
                        height="60" />
                      <div>
                        <h6 class="fw-bold text-primary mb-1">Lily Coleman</h6>
                        <p class="text-muted small mb-0">
                          Shared publicly - Jan 2020
                        </p>
                      </div>
                    </div>

                    <p class="mt-3 mb-4 pb-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.
                    </p>

                    <div class="small d-flex justify-content-start">
                      <a href="#!" class="d-flex align-items-center me-3">
                        <i class="far fa-thumbs-up me-2"></i>
                        <p class="mb-0">Like</p>
                      </a>

                      <a href="#!" class="d-flex align-items-center me-3">
                        <i class="fas fa-share me-2"></i>
                        <p class="mb-0">Share</p>
                      </a>
                    </div>
                  </div>
                  <div class="card-footer py-3 border-0" style="background-color: #f8f9fa;">
                    <div class="d-flex flex-start w-100">
                      <img class="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="40"
                        height="40" />
                      <div class="form-outline w-100">
                        <textarea class="form-control" id="textAreaExample" rows="4"
                          style="background: #fff;"></textarea>

                      </div>
                    </div>
                    <div class="float-end mt-2 pt-1">
                      <button type="button" class="btn btn-primary btn-sm">Post comment</button>
                      <button type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal -->
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <a href="data:image/jpeg;base64,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"
                    download><i class="fa-solid fa-download"></i> text.pdf</a><br>
                  <a href="" download><i class="fa-solid fa-download"></i> text.pdf</a><br>
                  <a href="" download><i class="fa-solid fa-download"></i> text.pdf</a><br>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Understood</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col-auto col-md-3 col-xl-3 px-sm-2  ">
        <div class=" text-white min-vh-100">
          <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item" v-for="(item, index) in sections" v-bind:key="index">

              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button class="accordion-button fw-bold " type="button" data-bs-toggle="collapse"
                  :data-bs-target="'#target' + index" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  Section:{{ item.partNumber }} {{ item.title }}<br />
                  1/1

                </button>

              </h2>



              <div :id="'target' + index" class="accordion-collapse collapse show text-dark"
                aria-labelledby="panelsStayOpen-headingOne">

                <button v-for="lesson in item.lessons" :disabled="lesson.lock" v-bind:key="lesson.id" type="button"
                  class="list-group-item list-group-item-action fw-bold" aria-current="true"
                  v-on:click="goToLesson(lesson.id)">

                  <i class="fa-solid fa-lock" v-if="lesson.lock"></i>

                  <i class="fa-solid fa-video" v-else-if="lesson.type === 'VIDEO'">

                  </i>
                  <i class="fa-solid fa-file-lines" v-else-if="lesson.type === 'TEXT'"></i> {{ lesson.title }}
                </button>



              </div>
            </div>

          </div>
          <el-progress class="ms-3 mt-3" type="dashboard" :percentage="currentPercentage" :color="colors"></el-progress>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "@/router";
export default {
  name: 'LessonPage',
  data() {
    return {
      sections: null,
      videoCompleted: false,
      courseId: this.$route.query.courseId,
      percentage: 0,
      currentPercentage: 0,
      lessonId: this.$route.query.lessonId,
      role: localStorage.getItem('role'),
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    }
  },
  components: {

  },
  computed: {
    lesson() {
      return this.$store.state.currentTargetLesson;
    },
  },
  async mounted() {
    await this.$store.dispatch('fetchTargetLesson', this.lessonId);

    if (this.lesson.type === 'VIDEO') {
      this.fetchWatchedPercentage(this.lessonId)
    }else if(this.lesson.type === 'TEXT' && this.lesson.haveTest === false)
    {
      window.addEventListener('scroll', this.handleScroll);
    }

    this.fetchLearningLesson()

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Lấy vị trí hiện tại của thanh cuộn
    let scrollPosition = window.scrollY;


      // Kiểm tra nếu thanh cuộn đã đến đoạn nhất định (ví dụ: 500px)
      if (scrollPosition >= (document.body.clientHeight - window.innerHeight - 1080)) {
       
        this.triggerFunction();
        window.removeEventListener('scroll', this.handleScroll);
      }
    },
    async triggerFunction() {
      await axios.get("api/v1/unlock-lesson", {
        params: { request: this.lessonId },
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });

      this.fetchLearningLesson()
      // Hàm được gọi khi đến vị trí cụ thể trên thanh cuộn
      this.$notify({
        title: 'Success',
        message: 'You was finished the lesson',
        type: 'success'
      });
    },
    async fetchLearningLesson() {
      try {
        // Gửi yêu cầu API để lấy phần trăm đã xem từ backend
        const response = await axios.get("api/v1/list-learning-lesson", {
          params: { courseId: this.courseId },
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        this.sections = response.data;

      } catch (error) {
        this.$notify.error({
          title: 'Error',
          message: 'There was an error getting the sections plase reload'
        });
      }

    },
    async fetchWatchedPercentage(newLessonId) {
      try {

        // Gửi yêu cầu API để lấy phần trăm đã xem từ backend
        const response = await axios.get("api/v1/get-video-progress", {
          params: { lessonId: newLessonId },
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        this.currentPercentage = response.data;
        const watchedPercentage = response.data;

        // Xử lý phần trăm đã xem ở đây (ví dụ: cập nhật giá trị watchedPercentage trong component)
        this.percentage = watchedPercentage;
        const video = this.$refs.videoPlayer;
        video.addEventListener('loadedmetadata', () => {

          // Tính thời gian cần tua đến dựa trên phần trăm
          const targetTime = (this.percentage / 100) * video.duration;

          // Đặt currentTime của video tới thời gian tính được
          video.currentTime = targetTime;
        });
      } catch (error) {


        this.$notify.error({
          title: 'Error',
          message: 'There was an error getting the percentage viewed'
        });
      }
    },
    goToLesson(lessonId) {

      this.$router.push({ path: "/LessonPage", query: { lessonId: lessonId, courseId: this.courseId } })
      location.reload();

    },
    async updateProgress(event) {
      const video = event.target;
      if (video.duration > 0 && !this.videoCompleted) {

        const currentPercentage = ((video.currentTime / video.duration) * 100).toFixed(2);
        this.currentPercentage = ((video.currentTime / video.duration) * 100).toFixed(2);

        if (currentPercentage - this.percentage >= 5) {
          // luu tien do 
          this.saveProgress(currentPercentage);
          this.percentage = currentPercentage;
          console.log('Phần trăm đã xem:', this.percentage);
        }
        if (currentPercentage >= 100) {

          this.saveProgress(currentPercentage);
          // Đặt biến cờ là true để ngăn cập nhật tiến độ tiếp theo
          this.videoCompleted = true;
          if (this.lesson.haveTest === false) {
            await axios.get("api/v1/unlock-lesson", {
              params: { request: this.lessonId },
              headers: {
                Authorization: localStorage.getItem("accessToken"),
              },
            });
          }
          this.fetchLearningLesson()
          this.$notify({
            title: 'Success',
            message: 'You are finished the video',
            type: 'success'
          });

        }

      }
    },
    async saveProgress(percentage) {
      try {
        let payload = {
          videoProgress: percentage,
          lessonId: this.lessonId
        }
        // Gửi yêu cầu API để lưu tiến độ và chờ cho đến khi nó hoàn thành
        await axios.post("api/v1/update-video-progress", payload, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });

      } catch (error) {
        console.error('Some error when saving video progress:', error);
      }
    },
    addTest() {
      router.push({ path: "/CreateQuizzes", query: { lessonId: this.lessonId } });

    },
    updateLesson() {
      router.push({ path: '/CreateLesson', query: { lessonId: this.lessonId } })
    },
    updateTest() {
      router.push({ path: "/UpdateQuizzes", query: { lessonId: this.lessonId } });

    },
    goToTest() {
      router.push({ path: "/QuizzPage", query: { lessonId: this.lessonId, courseId: this.courseId } });
    },



  }
}
</script>
<style scoped>
/* CSS */
.video-container {

  position: relative;
  width: 100%;

  /* Tùy chỉnh độ rộng tối đa của video container */
  margin: 0 auto;
  /* Căn giữa video container */
}

.video-container video {
  width: 100%;
  /* Video sẽ chiếm toàn bộ không gian của video container */
  height: auto;
  /* Chiều cao tự động điều chỉnh theo tỷ lệ khung hình */
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* Màu nền cho controls */
  padding: 10px;
  box-sizing: border-box;
}

.video-controls button {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  margin-right: 10px;
}

/* Thêm hiệu ứng hover cho các nút controls */
.video-controls button:hover {
  color: #ff4500;
  /* Màu khi hover */
}

/* Thêm hiệu ứng hover cho progress bar */
.video-controls input[type="range"]:hover {
  cursor: pointer;
}

/* Thêm hiệu ứng cho progress bar */
.video-controls input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  /* Ẩn giao diện mặc định của progress bar trên Chrome/Safari */
  appearance: none;
  /* Ẩn giao diện mặc định của progress bar trên các trình duyệt khác */
  background-color: transparent;
}

/* Thiết lập giao diện cho thanh progress */
.video-controls input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  /* Chiều cao của thanh progress */
  cursor: pointer;
  background: #ddd;
  /* Màu nền thanh progress */
  border-radius: 2px;
  /* Độ cong của thanh progress */
}

/* Thiết lập giao diện cho thanh progress khi tiến trình thay đổi */
.video-controls input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  /* Ẩn giao diện mặc định của thumb trên Chrome/Safari */
  appearance: none;
  /* Ẩn giao diện mặc định của thumb trên các trình duyệt khác */
  width: 10px;
  /* Chiều rộng của thumb */
  height: 10px;
  /* Chiều cao của thumb */
  background: #ff4500;
  /* Màu thumb */
  border-radius: 50%;
  /* Đường viền cong cho thumb */
  cursor: pointer;
}

/* Thiết lập giao diện cho thanh progress trên Firefox */
.video-controls input[type="range"]::-moz-range-track {
  width: 100%;
  height: 2px;
  /* Chiều cao của thanh progress */
  cursor: pointer;
  background: #ddd;
  /* Màu nền thanh progress */
  border-radius: 2px;
  /* Độ cong của thanh progress */
}

/* Thiết lập giao diện cho thumb trên Firefox */
.video-controls input[type="range"]::-moz-range-thumb {
  width: 10px;
  /* Chiều rộng của thumb */
  height: 10px;
  /* Chiều cao của thumb */
  background: #ff4500;
  /* Màu thumb */
  border-radius: 50%;
  /* Đường viền cong cho thumb */
  cursor: pointer;
}
</style>