<template>
   <div>
    <div class="my-learning container-fluid bg-dark "  style="height: 200px;">
        <h1 class="text-white ms-5 pt-5 fw-bold ps-5">My learning</h1>
    </div>
    <div class="container mt-5 mb-5">
        <div class="row row-cols-1 row-cols-md-4 jus">
            <div class="col">
              <div class="card h-100 " >
                <a href="" class="text-decoration-none text-reset">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkAU79lMtlIUadnY3Teksge58-DMgj2xxwmw&usqp=CAU" class="card-img-top " alt="...">
           
                <div class="card-body">
                  <h5 class="card-title fw-bold">LightRoom forbeginer</h5>
                  <p class="card-text">Ramesh Retnasamy</p>
                </div>
                <div class="card-footer">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                      </div>
                </div>
            </a>
              </div>
              
            </div>
            
            <div class="col">
                <div class="card  h-100" >
                    <a href="" class="text-decoration-none text-reset">
                  <img src="data:image/jpeg;base64,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" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title fw-bold">LightRoom For beginer</h5>
                    <p class="card-text">Ramesh Retnasamy</p>
                  </div>
                  <div class="card-footer">
                      <div class="progress">
                          <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                        </div>
                  </div>
                </a>
                </div>
              </div>
              <div class="col">
                <div class="card  h-100"  >
                    <a href="" class="text-decoration-none text-reset">
                  <img src="data:image/png;base64,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" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title fw-bold">Making 3D game with unity</h5>
                    <p class="card-text">Ramesh Retnasamy</p>
                  </div>
                  <div class="card-footer">
                      <div class="progress">
                          <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                        </div>
                  </div>
                  </a>
                </div>
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
    },
    mounted() {


    },
    methods: {


    },
}
</script>