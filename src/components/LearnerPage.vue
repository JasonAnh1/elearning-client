<template>
  <div>
    <div class="my-learning container-fluid bg-dark " style="height: 200px;">
      <h1 class="text-primary ms-5 pt-5 fw-bold ps-5">My learning hub</h1>
    </div>
    <div class="container mt-5 mb-5">
      <div class="row row-cols-1 row-cols-md-4 jus">
        <div v-for="course in lstCourse" v-bind:key="course.id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" style="height: 340px ;">

            <img :src=course.media.originUrl class="image" style="height: 200px; width: 330px">
            <el-progress class="m-1" :percentage="formatProgress(course.progress)" :color="customColorMethod"
              :text-inside="true" :stroke-width="17"></el-progress>
            <div style="padding: 14px;">
              <span class="fw-bold">{{ course.title }}</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button" @click="viewCourse(course.id)">View Course</el-button>
                <el-button type="text" class="button text-success" @click="getCertificate(course.id, course.title)"
                  v-if="course.progress == 100">Generate Certificate</el-button>
                  <el-button type="text" class="button text-success" @click="goToLesson(course.id, course.firstLesson)"
                  v-if="course.firstLesson !== 0">Learn</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <div class="container mt-5 mb-5" v-if="organizationName !== null">
      <h5 class="fw-bold">My organization: <span class=" text-primary">{{ organizationName }}</span> </h5>

      <div class="row row-cols-1 row-cols-md-4 jus">
        <div v-for="course in organizationCourse" v-bind:key="course.id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" style="height: 340px ;">

            <img :src=course.media.originUrl class="image" style="height: 200px; width: 330px">
            <el-progress class="m-1" :percentage="formatProgress(course.progress)" :color="customColorMethod"
              :text-inside="true" :stroke-width="17"></el-progress>
            <div style="padding: 14px;">
              <span class="fw-bold">{{ course.title }}</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button" @click="viewCourseOrg(course.id)">View Course</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div class="container mt-5 mb-5">
      <h3 class="fw-bold" v-if="books.length > 0 ">My books:</h3>
      <div class="row row-cols-1 row-cols-md-4">
        <div v-for="item in books" v-bind:key="item.id">
          <div class="card" style="width: 17rem;">
            <img :src=item.avatar.originUrl class="card-img-top" alt="..." style="height: 260px;">
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ item.author.name }}</p>
              <a class="btn btn-outline-primary w-100" @click="readBook(item.id)">Read</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'LearnerPage',
  data() {
    return {
      organizationName: localStorage.getItem("organizationName"),
      organizationCourse: null,
      books: []
    }
  },
  components: {

  },
  computed: {
    currentCourse() {
      return this.$store.state.currentTagetCourse;
    },
    lstCourse() {
      return this.$store.state.listCourseForLearner;
    }
  },
  async mounted() {

    this.$store.dispatch('fetchListCourseForLearner')
    if (localStorage.getItem("organizationId") !== null) {
      const response = await axios.get("api/v1/get-org-course-for-member", {
        params: { id: localStorage.getItem("organizationId") },
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      this.organizationCourse = response.data.body
    }

    const response = await axios.get("api/v1/publish/learner-books", {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      }
    });
    this.books = response.data;
  },

  methods: {
    readBook(id) {
      this.$router.push({ path: "/ViewBook", query: { bookId: id } });
    },
    viewCourse(id) {
      this.$router.push({ path: "/DetailCourse", query: { courseId: id } });
    },
    viewCourseOrg(id) {
      this.$router.push({ path: "/DetailCourse", query: { courseId: id, org: true } });
    },
    getCertificate(courseId, courseName) {
      this.$router.push({
        path: "/CertificatePage",
        query: { courseId: courseId, courseName: courseName, userId: localStorage.getItem("ownerId"), userName: localStorage.getItem("fullName") }
      });
    },

    formatProgress(progress) {
      // Định dạng progress thành hai số sau dấu chấm
      return parseFloat(progress).toFixed(2);
    },

    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#909399';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    },

    goToLesson(courseId,lessonId) {
      this.$router.push({ path: "/LessonPage", query: { lessonId: lessonId ,
        courseId: courseId, 
        enrolled:  true} })
    },
  },
}
</script>