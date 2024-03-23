<template>
  <div>
    
    <div class="my-learning container-fluid bg-dark " style="height: 350px;">
      <el-steps :space="200" :active="2" finish-status="success" class="pt-3 ms-5" 
      v-if="isVerify !== 'VERIFY' && isVerify !== 'DISABLE'" >
                <el-step title="Done"></el-step>
                <el-step title="Register"></el-step>
                <el-step title="Verify">ss</el-step>
            </el-steps>
      <h1 class="t ms-5 pt-5 fw-bold ps-5 text-white">{{ userName }}

        <el-tooltip class="item" effect="dark" content="This account has been verified " placement="right-start"
          v-if="isVerify === 'VERIFY'">
          <i class="fa-solid fa-circle-check text-primary"></i>
        </el-tooltip>



      </h1>
      <h2 class="t ms-5 pt-3 fw-bold ps-5 text-primary">ElearnCenter Studio</h2>

      <h1 class="btn btn-outline-success  mt-3" style="margin-left:90px ;"
        v-if="isVerify !== 'VERIFY' && isVerify !== 'DISABLE'" data-bs-toggle="modal"
        data-bs-target="#verifyCheckOutModal">Verify account</h1>
      <h1 class="btn btn-outline-primary  mt-3" style="margin-left:90px ;" data-bs-toggle="modal"
        data-bs-target="#createCourseModal" v-else>Create new course</h1>
      <div class="modal fade" id="verifyCheckOutModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-primary" id="exampleModalLabel">Verify checkout</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="modal-verify-content">
                <p><em>In order to proceed with the verification process and fully activate your account, it is
                    necessary to make a payment for a verification fee.</em></p>
                <p><em>This fee is essential to ensure the security and authenticity of your account, as it allows us to
                    verify your identity and validate the information provided during the registration process.</em></p>
                <p><em>Once the payment is successfully processed, our verification team will promptly review your
                    account and confirm its authenticity, enabling you to access all the features and benefits
                    associated with your account.</em></p>
                <p><em>Thank you for your cooperation in this matter, and we look forward to welcoming you as a verified
                    member of our platform.</em></p>

              </div>
              <div class="fw-bold">Chose bank:</div>
              <select id="bankSelect" v-model="bankCode" class="form-select  mb-2 form-control"
                aria-label="Default select example">
                <option value="NCB" class="text-primary" selected>NATIONAL CITIZEN BANK (NCB)</option>
                <option value="VISA" class="text-secondary">VISA CREDIT CARD</option>
                <option value="MasterCard" class="text-success">MASTERCARD</option>
                <option value="JCB" class="text-success">Japan Credit Bureau</option>
                <!-- Thêm các option khác tùy theo nhu cầu -->
              </select>
              <div class="fw-bold">Fee will be:</div>
              <p>đ 200.000</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                @click="checkOutVerify()">Checkout</button>
            </div>
          </div>
        </div>
      </div>
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
                  <label for="exampleFormControlInput1" class="form-label">Category</label>
                  <select v-model="cCategoryId" class="form-select" aria-label="Default select example">
                    <option :value="item.id" v-for="item in listCourseCategories" v-bind:key="item.id">{{ item.title }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Title</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1" ref="cTitle">
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Short description</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1" ref="cShortDes">
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                  <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="cDescription">
                  </VueEditor>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Content</label>
                  <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="cContent">
                  </VueEditor>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Requirement</label>
                  <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="cRequirement">
                  </VueEditor>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Detail</label>
                  <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="cDetail">
                  </VueEditor>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Price</label>
                  <input type="number" class="form-control" id="exampleFormControlInput1" ref="cPrice">
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">PriceSale</label>
                  <input type="number" class="form-control" id="exampleFormControlInput1" ref="cPriceSale">
                </div>

                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Level</label>
                  <select v-model="cLevel" class="form-select" aria-label="Default select example">
                    <option value="BEGINNER">BEGINNER</option>
                    <option value="ADVANCED">ADVANCED</option>
                    <option value="INTERMEDIATE">INTERMEDIATE</option>
                    <option value="EXPERT">EXPERT</option>
                  </select>
                </div>
                <div class="input-group mb-3">
                  <input v-on:change="changePic()" type="file" class="form-control w-100" id="inputGroupFile02"
                    accept="image/*" ref="file">

                  <img :src=imageFile class="img-thumbnail mt-3" alt="..." style="width: 120px;height: 67px;">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" v-on:click="addCourse()">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5 mb-5">
      <h3 class="fw-bold">My course:</h3>
      <div class="row row-cols-1 row-cols-md-4 jus">
        <div class="col mt-4" v-for="item in listCourseForAuthor" v-bind:key="item.id">
          <div class="card h-100 ">

            <a class="text-decoration-none text-reset" v-on:click="getDetailCourseStudio(item.id)">
              <img :src=item.media.thumbUrl class="card-img-top " alt="...">

              <div class="card-body">
                <h5 class="card-title fw-bold">{{ item.title }}</h5>
                <p class="card-text">{{ item.author.name }}</p>

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
import { VueEditor } from "vue2-editor";
export default {
  name: 'LectureStudio',
  data() {
    return {
      imageFile: null,
      cLevel: null,
      cDescription: null,
      course: new Object(),
      cContent: null,
      cDetail: null,
      cCategoryId: 0,
      cRequirement: null,
      userName: localStorage.getItem('username'),
      isVerify: localStorage.getItem('active'),
      bankCode: 'NCB'
    }
  },
  components: {
    VueEditor
  },
  computed: {
    listCourseCategories() {
      return this.$store.state.lstCourseCategory;
    },
    userLogined() {
      return this.$store.state.userLogined;
    },
    listCourseForAuthor() {
      return this.$store.state.lstCourseForLecture;
    }
  },
  mounted() {

    this.$store.dispatch('fetchListCourseForAuthor', 0);
  },
  methods: {
    checkOutVerify() {
      if (this.bankCode) {
        let payload = {
          bankCode: this.bankCode,
          total: 200000
        }
        let transactionObj = new Object();
        transactionObj.type = 'verify'
        transactionObj.amount = 200000;

        localStorage.setItem('transactionObj', JSON.stringify(transactionObj));
        this.$store.dispatch('goPaidPage', payload);
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Oh no',
          text: 'Some thing wrong!',
          footer: '<a href="">Go to cart?</a>'
        });
      }




    },
    loginIntoSystem() {
      this.$store.dispatch('fetchLogin', {
        phone: this.phone,
        password: this.password
      });
    },
    changePic() {
      this.imageFile = URL.createObjectURL(this.$refs.file.files[0])
    },
    getDetailCourseStudio(courseId) {

      router.push({ path: "/DetailCourseStudio", query: { courseId: courseId } });

    },

    addCourse() {
      var formData = new FormData();
      formData.append('file', this.$refs.file.files[0]);
      this.course = new Object({
        title: this.$refs.cTitle.value,
        categoryId: this.cCategoryId,
        shortDes: this.$refs.cShortDes.value,
        requirement: this.cRequirement,
        detail: this.cDetail,
        price: this.$refs.cPrice.value,
        priceSale: this.$refs.cPriceSale.value,
        courseContent: this.cContent,
        level: this.cLevel,
        description: this.cDescription
      })
      this.$store.dispatch('fetchAddCourse', { 'img': formData, 'request': this.course });
    }
  },
  props: {
    msg: String
  },

}
</script>
<style scoped>
.modal-verify-content {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.modal-verify-content p {
  margin-bottom: 10px;
}

.modal-verify-content em {
  font-style: italic;
  color: #333;
}
</style>