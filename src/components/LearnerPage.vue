<template>
   <div>
    <div class="my-learning container-fluid bg-dark "  style="height: 200px;">
        <h1 class="text-white ms-5 pt-5 fw-bold ps-5">My learning</h1>
    </div>
    <div class="container mt-5 mb-5">
        <div class="row row-cols-1 row-cols-md-4 jus">
          <div v-for="course in lstCourse" v-bind:key="course.id">
            <el-card :body-style="{ padding: '0px' }"  shadow="hover" style="height: 340px ;">
            
      <img :src=course.media.originUrl class="image" style="height: 200px; width: 330px">
      <el-progress class="m-1"  :percentage="formatProgress(course.progress)" :color="customColorMethod" :text-inside="true"  :stroke-width="17"></el-progress>
      <div style="padding: 14px;">
        <span>{{ course.title }}</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button" @click="viewCourse(course.id)">View Course</el-button>
        </div>
      </div>
    </el-card>
          </div>
            
             
          </div>
    </div>
   </div>
</template>

<script>

export default {
    name: 'LearnerPage',
    data() {
        return {
           
        }
    },
    components: {

    },
    computed: {
        currentCourse() {
            return this.$store.state.currentTagetCourse;
        },
        lstCourse(){
          return this.$store.state.listCourseForLearner;
        }
    },
    mounted() {
      this.$store.dispatch('fetchListCourseForLearner')

    },
    
    methods: {
      viewCourse(id){
        this.$router.push({ path: "/DetailCourse", query: { courseId: id } });
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

    },
}
</script>