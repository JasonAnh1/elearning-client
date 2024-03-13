<template>
    <div>
      <div class="my-learning container-fluid bg-dark " style="height: 200px;">
        <h1 class="t ms-5 pt-5 fw-bold ps-5 text-primary">ElearnCenter Studio</h1>
      </div>
      <div class="container mt-5 mb-5">
        <h3 class="fw-bold">My course:</h3>
        <div class="row row-cols-1 row-cols-md-4 jus">
          <div class="col mt-4" v-for="item in listCourseForAuthor" v-bind:key="item.id" >
            <div class="card h-100 " >
  
              <a class="text-decoration-none text-reset" v-on:click="getDetailCourseStudio(item.id)">
                <img
                  :src=item.media.thumbUrl
                  class="card-img-top " alt="...">
  
                <div class="card-body">
                  <h5 class="card-title fw-bold">{{item.title}}</h5>
                  <p class="card-text">{{item.author.name}}</p>
                  
                </div>
               
              </a>
            </div>
  
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import router from '@/router';
  export default {
    name: 'LectureStudio',
    data() {
      return {
   
      }
    },
    components: {
      
    },
    computed: {
      listCourseCategories() {
        return this.$store.state.lstCourseCategory;
      },
      listCourseForLearner()
      {
        return this.$store.state.lstCourseForLearner;
      }
    },
    mounted() {
    
        this.$store.dispatch('fetchListCourseForAuthor',0);
      },
    methods: {    
      getDetailCourseStudio(courseId){
     
        router.push({ path: "/DetailCourseStudio", query: { courseId: courseId } });
       
      },
     
    },
    props: {
      msg: String
    },
  
  }
  </script>