<template>
  <div>

    <div class="my-learning container-fluid bg-dark " style="height: 350px;">
      <el-steps :space="200" :active="2" finish-status="success" class="pt-3 ms-5"
        v-if="isVerify !== 'VERIFY' && isVerify !== 'DISABLE'">
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
      <div v-else>
        <h1 class="btn btn-outline-primary  mt-3" style="margin-left:90px ;" data-bs-toggle="modal"
          data-bs-target="#createCourseModal">Create new course</h1>
        <h1 class="btn btn-outline-primary  mt-3" style="margin-left:20px ;" data-bs-toggle="modal"
          data-bs-target="#createBookModal">Create new book</h1>
        <h1 class="btn btn-outline-primary  mt-3" style="margin-left:20px ;" data-bs-toggle="modal"
          data-bs-target="#createArticleModal">Create new article</h1>
        <br>
        <h1 class="btn btn-outline-success  mt-3" style="margin-left:90px ;" @click="openChat()">Open Chat</h1>
      </div>
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
                <p><em>This fee is es tial to ensure the security and authenticity of your account, as it allows us to
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
      <div class="modal fade" id="createBookModal" tabindex="-1" aria-labelledby="createCourseModal" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createBookModal">Create book</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row g-3">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Category</label>
                  <select v-model="bCategoryId" class="form-select" aria-label="Default select example">
                    <option :value="item.id" v-for="item in listBookCategories" v-bind:key="item.id">{{ item.title }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Title</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1" ref="bTitle">
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                  <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="bDescription">
                  </VueEditor>
                </div>

                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Price</label>
                  <input type="number" class="form-control" id="exampleFormControlInput1" ref="bPrice">
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">PriceSale</label>
                  <input type="number" class="form-control" id="exampleFormControlInput1" ref="bPriceSale">
                </div>
                <div class="input-group mb-3">
                  <input type="file" class="form-control w-100" id="inputGroupFile02" ref="bookFile">
                </div>
                <div class="input-group mb-3">
                  <input v-on:change="changePicBook()" type="file" class="form-control w-100" id="inputGroupFile02"
                    accept="image/*" ref="bookAvatar">

                  <img :src=imageFile class="img-thumbnail mt-3" alt="..." style="width: 120px;height: 67px;">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" v-on:click="addBook()">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="createArticleModal" tabindex="-1" aria-labelledby="createArticleModal"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createArticleModal">Create Article</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row g-3">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Title</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1" ref="aTitle">
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Short description</label>
                  <textarea type="text" class="form-control" id="exampleFormControlInput1" ref="aShortDes"></textarea>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                  <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="aDescription">
                  </VueEditor>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Content</label>
                  <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="aContent">
                  </VueEditor>
                </div>
                <div class="input-group mb-3">
                  <input v-on:change="changePicArticle()" type="file" class="form-control w-100" id="inputGroupFile02"
                    accept="image/*" ref="articleAvatar">

                  <img :src=imageFile class="img-thumbnail mt-3" alt="..." style="width: 120px;height: 67px;">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" v-on:click="addArticle()">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- revenue -->
    <div class="container mt-5 mb-5">
      <h3 class="fw-bold">Revenue:</h3>
      <div class="row mt-5">
        <div class="col-md-6">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Reveneu</th>
                <th scope="col">Total</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Gross profit</td>
                <td>{{ formatCurrency(grossProfit) }}</td>

              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Net profit</td>
                <td>{{ formatCurrency(netProfit) }}</td>

              </tr>

            </tbody>
          </table>
        </div>
        <div class="col-md-6" style="width: 300px;">
          <Pie :data="chartData" :options="chartOptions" v-if="loaded" />
        </div>

      </div>

    </div>
    <div class="container mt-5 mb-5">
      <h3 class="fw-bold">My course:</h3>
      <div class="row row-cols-1 row-cols-md-4 jus">
        <div class="col mt-4" v-for="item in listCourseForAuthor" v-bind:key="item.id">
          <div class="card h-100 ">
            <a class="text-decoration-none text-reset" v-on:click="getDetailCourseStudio(item.id)">
              <div class="position-relative">
                <img :src="item.media.thumbUrl" class="card-img-top"
                  :class="{ 'promote-border': item.advertise === 'PROMOTE' }" alt="...">
                <span v-if="item.advertise === 'PROMOTE'" class="promote-overlay">PROMOTE</span>
              </div>
              <span class=" ms-3" style="font-size: 10px;"><i class="fa-solid fa-user text-muted"></i> {{
                item.learnerNumber }}
                <el-rate class="ps-3" :value="item.rating" disabled show-score text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </span>
              <div class="card-body">
                <h5 class="card-title fw-bold">{{ item.title }}</h5>
                <p class="card-text">{{ item.author.name }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item" v-if="payload.page + 1 > 1">
            <a class="page-link" href="#" @click="prevPage">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous page</span>
            </a>
          </li>
          <li class="page-item" v-for="n in pageNumbers" :key="n">
            <a class="page-link" href="#" :class="{ active: n === payload.page + 1 }" @click="goToPage(n)">
              {{ n }}
            </a>
          </li>
          <li class="page-item" v-if="payload.page + 1 < totalPages">
            <a class="page-link" href="#" @click="nextPage">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next page</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <BookLecture></BookLecture>
    <ArticleLecture></ArticleLecture>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Pie } from 'vue-chartjs'
import axios from "axios";
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)
import router from '@/router';
import { VueEditor } from "vue2-editor";
import BookLecture from "@/components/book/BookLecture";
import ArticleLecture from "@/components/article/ArticleLecture"
export default {
  name: 'LectureStudio',

  data() {
    return {
      ready: false,
      bookFile: null,
      imageFile: null,
      cLevel: null,
      bDescription: null,
      cDescription: null,
      course: new Object(),
      book: new Object,
      books: [],
      cContent: null,
      cDetail: null,
      cCategoryId: 0,
      bCategoryId: 0,
      cRequirement: null,
      userName: localStorage.getItem('username'),
      isVerify: localStorage.getItem('active'),
      bankCode: 'NCB',
      // payload to call list course api
      listCourseForAuthor:[],
      payload: {
        page: 0,
        status: null,
        authorName: null,
        startPrice: 0,
        endPrice: 0,
        categoryId: 0,
        authorId: 0
      },
      totalRecord: 0,
      pageSize:8,
      pageNumbers:null,
      totalPages:0,
      //
      chartData: {
        labels: ['Gross profit', 'Net profit'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651'],
            data: [100, 100]
          }
        ]
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      grossProfit: 0,
      netProfit: 0,

      selectedYear: 2024,
      selectedMonth: 1,
      data: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true
      },

      //artcle
      aDescription: null,
      aContent: null,
      article: new Object(),
    }
  },
  components: {
    VueEditor,
    BookLecture,
    ArticleLecture,
    Pie
  },
  computed: {
    listCourseCategories() {
      return this.$store.state.lstCourseCategory;
    },
    listBookCategories() {
      return this.$store.state.lstCourseCategory.filter(item => item.type === 'BOOK');
    },
    userLogined() {
      return this.$store.state.userLogined;
    },
    listBooksForAuthor() {
      return this.$store.state.lstCourse;
    }
  },
  async mounted() {
    this.getBooks()
    this.getCourse()
    this.getProfit()
  
  },
  methods: {
    generatePagination() {
      this.totalPages = Math.ceil(this.totalRecord / this.pageSize);
      const pageNumbers = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pageNumbers.push(i);
      }

      this.pageNumbers = pageNumbers;
    },
    prevPage() {
      if (this.payload.page + 1 > 1) {
        this.payload.page --;
        this.getCourse();
      }
    },
    nextPage() {
      if (this.payload.page + 1 < this.totalPages) {
        this.payload.page ++;
        this.getCourse();
      }
    },
    goToPage(n) {
      this.payload.page = n - 1;
      this.getCourse();
    },
   async getCourse(){
      this.payload.authorId = localStorage.getItem("ownerId");
      const response = await axios.get("api/v1/publish/list-course", {
        params: {
          title: this.payload.title,
          page: this.payload.page,
          status: this.payload.status,
          startPrice: this.payload.startPrice,
          endPrice: this.payload.endPrice,
          authorId: this.payload.authorId,
          authorName: this.payload.authorName,
          categoryId: this.payload.categoryId,
        },
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      this.listCourseForAuthor = response.data.body;
      this.totalRecord = response.data.totalRecord;
      this.generatePagination();
    },
    async getProfit() {
      try {
        const response = await axios.get("api/v1/lectures-revenue/netProfit", {
          params: {
            year: this.selectedYear
          },
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        })


        this.grossProfit = response.data
        this.netProfit = this.grossProfit * 0.8
        this.chartData.datasets[0].data = [this.grossProfit, this.grossProfit * 0.8];
        this.loaded = true
      } catch (error) {
        console.error('Error:', error);
      }
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    },
    async getBooks(){
      const response = await axios.get("api/v1/publish/get-books", {
      params: { page: 0, authorId: localStorage.getItem('ownerId'), categoryId: 0, startPrice: 0, endPrice: 0 },
    });
    this.books = response.data;
    },
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
    changePicArticle() {
      this.imageFile = URL.createObjectURL(this.$refs.articleAvatar.files[0])
    },
    changePicBook() {
      this.imageFile = URL.createObjectURL(this.$refs.bookAvatar.files[0])
    },
    getDetailCourseStudio(courseId) {

      router.push({ path: "/DetailCourseStudio", query: { courseId: courseId } });

    },
    openChat() {

      router.push({ path: "/ChatPage" });

    },
    addBook() {
      var formData = new FormData();
      formData.append('file', this.$refs.bookAvatar.files[0]);
      var formData2 = new FormData();
      formData2.append('file', this.$refs.bookFile.files[0]);
      this.book = new Object({
        title: this.$refs.bTitle.value,
        categoryId: this.bCategoryId,
        price: this.$refs.bPrice.value,
        priceSale: this.$refs.bPriceSale.value,
        description: this.bDescription
      })

      this.$store.dispatch('fetchAddBook', { 'avatar': formData, 'book': formData2, 'request': this.book });
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
    },
    async addArticle() {
      try {
        var formData = new FormData();
        formData.append('file', this.$refs.articleAvatar.files[0]);

        this.article = {
          title: this.$refs.aTitle.value,
          shortDes: this.$refs.aShortDes.value,
          description: this.aDescription,
          content: this.aContent
        };

        if (formData) {
          try {
            const responseImg = await axios.post(
              "api/v1/file/upload-image",
              formData,
              {
                headers: {
                  Authorization: localStorage.getItem("accessToken"),
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            this.article.mediaId = responseImg.data.body.id;
          } catch (error) {
            this.$message.error("Image upload error:", error.response ? error.response.data : error.message);
            return;
          }
        }

        try {
          await axios.post("api/v1/post-article", this.article, {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          });
          this.$message({
            message: "post article successfully!",
            type: 'success'
          });
        } catch (error) {
          this.$message.error("post article error:", error.response ? error.response.data : error.message);
        }

      } catch (error) {
        this.$message.error("Unexpected error:", error);
      }
    }
  },
}
</script>
<style scoped>
.card {
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s box-shadow, .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, .12), 0 4px 8px rgba(0, 0, 0, .06);
}

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
.promote-border {
  border: 2px solid #ff9900; 

}

.position-relative {
  position: relative;
}

.promote-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(255, 153, 0, 0.8); /* Màu nền với độ trong suốt */
  color: white; /* Màu chữ */
  padding: 5px 10px; /* Khoảng cách giữa chữ và khung */
  border-radius: 5px; /* Bo tròn các góc */
  font-size: 12px; /* Kích thước chữ */
  font-weight: bold; /* Chữ đậm */
}
</style>