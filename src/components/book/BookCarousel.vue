<template>
     <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in 6" :key="item">
      <div class="card mb-3" >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogbEtIsnf6SFx47n1vF7oFc3M1Zttls0V-A&usqp=CAU" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>

export default {

    name: 'BookCarousel',
    data() {
        return {

            phone: '',
            password: '',
            userName: localStorage.getItem("username"),
            isCollapse: true
        }
    },

    computed: {

        listCourseCategories() {
            return this.$store.state.lstCourseCategory;
        },
   

    },
    methods: {

    },



}

</script>
<style scoped>

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>