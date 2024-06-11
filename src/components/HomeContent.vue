<template>
  <div>
    <div class="">

      <div id="intro-example" class="p-5 text-center bg-image" style="height: 520px;">
        <div>
          <div class="d-flex justify-content-left align-items-left h-100 w-25 ms-5 ps-3">
            <div class="text-dark">
              <h1 class="mb-3 fw-bold">Learn everything you can imagine</h1>
              <h5 class="mb-4">
                Empowering global education without boundaries, providing unlimited teaching opportunities regardless of
                geographical location or subject matter expertise
              </h5>
              <a class="btn btn-primary btn-lg m-2 text-white" href="https://www.youtube.com/watch?v=c9B4TPnak1A"
                role="button" rel="nofollow" target="_blank">Learner</a>
              <a class="btn btn-outline-primary btn-lg m-2" target="_blank" role="button"
                v-on:click="goLecturePage()">Lecturers</a>
              <br>
              <a class="btn btn-outline-primary btn-lg m-2" role="button" data-bs-toggle="modal"
                data-bs-target="#organizationModel">Organization</a>
                <a class="btn btn-outline-primary btn-lg m-2"  v-on:click="goVerifyCertPage()"
               >Certificate verify</a>
              <div class="modal fade" id="organizationModel" tabindex="-1" aria-labelledby="organizationSignUpModal"
                aria-hidden="false">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header bg-purple text-white">
                      <h5 class="modal-title text-dark" id="organizationModel">Organization sign up</h5>
                    </div>
                    <div class="modal-body">
                      <p>Discover all content of online education. Get instant access to all free content now.</p>
                      <form @submit.prevent="orgSignUp">
                        <div class="mb-3">
                          <input type="email" class="form-control" placeholder="Email" v-model="orgEmail">
                        </div>
                        <div class="mb-3">
                          <input type="text" class="form-control" placeholder="Name" v-model="orgName">
                        </div>
                        <div class="mb-3">
                          <input type="text" class="form-control" placeholder="Phone" v-model="orgPhone">
                        </div>
                        <div class="mb-3">
                          <input type="password" class="form-control" placeholder="Password" v-model="orgPassword">
                        </div>

                        <button type="submit" class="btn btn-primary w-100" data-bs-dismiss="modal">Sign up</button>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <p>By signing up, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy
                          Policy</a>.
                      </p>
                      <p>Already have account? <a href="#" data-bs-dismiss="modal" data-bs-toggle="modal"
                          data-bs-target="#organizationModelSignIn">Sign Up</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="organizationModelSignIn" tabindex="-1" aria-labelledby="organizationSignUpModal"
            aria-hidden="false">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header bg-purple text-white">
                  <h5 class="modal-title text-dark" id="organizationModelSignIn">Organization sign in</h5>
                </div>
                <div class="modal-body">
                  <p>Discover all content of online education. Get instant access to all free content now.</p>
                  <form @submit.prevent="orgSignIn">

                    <div class="mb-3">
                      <input type="text" class="form-control" placeholder="Phone" v-model="orgPhone">
                    </div>
                    <div class="mb-3">
                      <input type="password" class="form-control" placeholder="Password" v-model="orgPassword">
                    </div>

                    <button type="submit" class="btn btn-primary w-100" data-bs-dismiss="modal">Log in</button>
                  </form>
                </div>
                <div class="modal-footer">
                  <p>By signing up, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy
                      Policy</a>.
                  </p>
                  <p>Already have account? <a href="#" data-bs-dismiss="modal">Sign Up</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid ">

      <div class="col-md-10  mx-auto ">

        <div class="container-fluid mt-4 ">
          <div class="elearnexplore">


            <h3 class="fw-bold">Explore </h3>

            <div class="container-fluid">
              <section class="row mt-3">

                <div class="col-md-3 mt-1" v-for="item in categories" v-bind:key="item.id">
                  <a  class="text-decoration-none text-dark" @click="goFilterCoursePage(item.id)">
                    <div class="card border-0 shadow-sm">
                      <div class="row g-0">
                        <div class=" col-lg-4">
                          <img
                            :src= item.avatar.originUrl
                            class="card-img-top
                          h-100" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title fw-bold" style="font-size: 14px;">{{item.title}}</h5>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">1095 course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
               

              </section>
        

            </div>

          </div>
          <div class="row mt-5">
            <h4 class="fw-bold">Popular for Data Engineers</h4>
            <!-- khoa hoc cho tat ca -->
            <carousel :per-page="perPage" :autoplay="true" :loop="true" :autoplayTimeout="2000">
              <slide v-for="item in courses" v-bind:key="item.id">

                <div class="card ms-2" style="border: none;">
                  <img :src=item.media.thumbUrl class="card-img-top" alt="..." style="height: 150px;"
                    @click="goToDetail(item.id)">
                  <div class="card-body" @click="goToDetail(item.id)">
                    <h5 class="fw-bold" style="font-size: 16px;">
                      {{ item.title }}
                    </h5>
                    <p class="text-muted" style="font-size: 12px;">{{ item.author.name }}</p>

                    <p class="fw-bold"> <el-rate :value="item.rating" disabled show-score text-color="#ff9900"
                        score-template="{value}  ">
                      </el-rate><span class="text-muted" style="font-size: 10px;"><i
                          class="fa-solid fa-user me-1"></i>{{ item.learnerNumber }}</span></p>
                    <p class="fw-bold"> {{ formatCurrency(item.priceSale) }}<s class="text-muted fw-light">
                        {{ formatCurrency(item.price) }}</s> <span class="badge bg-info text-dark">Highrate</span></p>

                  </div>
                  <div class="card-footer " style="background-color: white;border: none;">
                    <button class="btn btn-primary w-75" style="background-color: #742feb;border: none;"
                      v-on:click="addCourseToCart(item)" v-if="item.isEnrolled == false">Add to
                      cart</button>
                    <button class="btn btn-primary w-75" style="background-color: #29e6c3;border: none;"
                      v-else>Learn</button>
                    <button class="rounded-circle ms-2 px-2 py-1"><i class="fa-regular fa-heart"></i></button>
                  </div>
                </div>

              </slide>

            </carousel>
            <!-- ket thuc -->
          </div>
          <div class=" mt-5">
            <h4 class="fw-bold">Books<span class="badge bg-secondary"></span></h4>
            <!-- Sach  -->
            <BookCarousel></BookCarousel>

            <!-- ket thuc -->
          </div>
          <div class="row mt-5 container">
            <h4 class="fw-bold">Article</h4>
            <ArticleLecture :forAll="'yes'"></ArticleLecture>
            <!-- Sach  -->

            <!-- ket thuc -->
          </div>
        </div>

      </div>


    </div>
  </div>
</template>

<script>
import axios from "axios";
import ArticleLecture from "@/components/article/ArticleLecture"
import { Carousel, Slide } from 'vue-carousel';
import BookCarousel from "@/components/book/BookCarousel";
export default {
  data() {
    return {
      orgEmail: null,
      orgName: null,
      orgPassword: null,
      orgPhone: null,
      perPage: 4,
      payload: {
        page: 0,
        status: null,
        authorName: null,
        startPrice: 0,
        endPrice: 0,
        categoryId: 0,
        authorId: 0

      },
      articles:[],
      categories:[],
    }
  },
  computed: {
    courses() {
      return this.$store.state.lstCourse;
    },
    cartItems() {
      return this.$store.state.cart;
    }
  },
  components: {
    Carousel,
    Slide,
    BookCarousel,
    ArticleLecture
  },
  name: 'HomeContent',
  props: {
    msg: String
  },
  async mounted() {
    this.$store.dispatch('fetchListCourse', this.payload);
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
    const response = await axios.get("api/v1/publish/list-course-categories");
     this.categories = response.data;
  },
  methods: {
    orgSignUp(){
      let user = new Object();
      user.email = this.orgEmail;
      user.name = this.orgName;
      user.password = this.orgPassword;
      user.phone = this.orgPhone;
      this.$store.dispatch('orgSignUp',user)
    },
    formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        },
    goToDetail(id) {
      this.$router.push({ path: "/DetailCourse", query: { courseId: id } });
    },
    goLecturePage() {
      if (localStorage.getItem("role") === 'ROLE_LECTURE') {
        this.$router.push({ path: "/LectureStudio" })
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Oh no',
          text: 'You are not lecrure!',
          footer: '<a href="">Go back?</a>'
        });
      }

    },
    checkScreenSize() {
      if (window.innerWidth < 1200) {
        this.perPage = 2;
      } else {
        this.perPage = 4;
      }
    },
    addCourseToCart(item) {
      item.type = "COURSE";

      // let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      // let itemExists = cartItems.some(cartItem => cartItem.id === item.id);
      let itemExists = this.cartItems.some(cartItem => cartItem.id === item.id && cartItem.type === item.type);
      if (itemExists) {
        // Nếu mục đã tồn tại trong giỏ hàng, hiển thị thông báo và không thực hiện thêm vào giỏ hàng
        this.$swal.fire({
          icon: 'error',
          title: 'Oh no',
          text: 'This item already in cart!',
          footer: '<a href="">Go to cart?</a>'
        });
      } else {
        // Nếu mục chưa tồn tại trong giỏ hàng, thêm vào giỏ hàng và lưu lại vào localStorage
        this.cartItems.push(item);
        // localStorage.setItem('cartItems', JSON.stringify(cartItems));
        this.$store.dispatch('changeCartItems', this.cartItems)
        // Hiển thị thông báo hoặc thực hiện các hành động khác sau khi thêm vào giỏ hàng
        this.$swal.fire({
          icon: 'success',
          title: 'Yes',
          text: 'Add to cart success!',
          footer: '<a href="">Go to cart?</a>'
        });
      }

    },
    goFilterCoursePage(id){
      this.$router.push({ path: "/FilterCourse" , query:{categoryId: id}})
    },
    goVerifyCertPage(){
      this.$router.push({ path: "/VerifyCertificate"})
    },
  async  getArticles(){
      const response = await axios.get("api/v1/publish/get-articles", {
            params: { page: 0, authorId: localStorage.getItem('ownerId'), categoryId: 0, startPrice: 0, endPrice: 0 },
        });
        this.articles = response.data;

    }
  }
}
</script>

<style scoped>
.bg-image {
  background-image: url('~@/assets/banner.jpg');
}

/* Default height for small devices */
#intro-example {
  height: 400px;
}

/* Height for devices larger than 992px */
@media (min-width: 992px) {
  #intro-example {
    height: 600px;
  }
}

.card {

  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s box-shadow, .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, .12), 0 4px 8px rgba(0, 0, 0, .06);
}
</style>