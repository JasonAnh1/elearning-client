<template>
  <div class="">

    <div class="my-learning container-fluid bg-dark " style="height: 200px;">
      <h1 class="text-primary ms-5 pt-5 fw-bold ps-5">{{ userName }} Organization <span v-if="currentPlan !== null"
          class="text-warning">- PLAN: {{ currentPlan.type }}</span></h1>
      <h1 class="btn btn-outline-success  mt-3" style="margin-left:90px ;" data-bs-toggle="modal"
        data-bs-target="#verifyCheckOutModal" v-if="isVerify !== 'VERIFY' && isVerify !== 'DISABLE'">Verify organization
        request</h1>
      <h1 class="btn btn-outline-success  mt-3" style="margin-left:90px ;" data-bs-toggle="modal"
        data-bs-target="#verifyCheckOutModal" v-else>Add member</h1>
    </div>

    <div class="container-fluid search-user mt-3 ms-3">
      <el-row class="demo-autocomplete">
        <el-col :span="12">
          <div class="sub-title fw-bold">Search for user</div>
          <el-autocomplete class="inline-input w-100" size="medium" v-model="searchQuery"
            :fetch-suggestions="fetchSuggestions" placeholder="Input user name"
            @select="handleSelect"></el-autocomplete>
        </el-col>
      </el-row>
    </div>
    <div class="container mt-2 mb-5">
      <!-- <div class="row row-cols-1 row-cols-md-4 jus">
        <div v-for="course in lstCourse" v-bind:key="course.id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" style="height: 340px ;">

            <img :src=course.media.originUrl class="image" style="height: 200px; width: 330px">
            <el-progress class="m-1" :percentage="formatProgress(course.progress)" :color="customColorMethod"
              :text-inside="true" :stroke-width="17"></el-progress>
            <div style="padding: 14px;">
              <span>{{ course.title }}</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button" @click="viewCourse(course.id)">View Course</el-button>
              </div>
            </div>
          </el-card>
        </div>


      </div> -->
    </div>
    <div class="container-fluid ms-3">

      <div class="col-12  m-3">
        <h5 class="fw-bold">Member:</h5>

        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">

          <el-table-column type="expand">
            <template slot-scope="props">
              <p>Phone: {{ props.row.phone }}</p>
              <p>Createdat: {{ formattedDate(props.row.createdAt) }}</p>

            </template>
          </el-table-column>
          <el-table-column label="Email" prop="email">
          </el-table-column>
          <el-table-column label="Name" prop="name">
          </el-table-column>
          <el-table-column align="right">
            <template slot="header">
              <input v-model="search" class="form-control" type="text" placeholder="Type to search" />
            </template>
            <template slot-scope="scope">

              <el-button class="me-5" size="mini" type="danger"
                @click="handleDelete(scope.$index, scope.row)">Remove</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="d-flex justify-content-center mt-3" :page-size="20" :pager-count="11"
          layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
      <div class="col-6 m-3">

        <h5 class=" fw-bold">Courses:
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#choseCourse"
            @click="fetchCourseCategory()">
            Chose Course
          </button>

          <!-- Modal -->
          <div class="modal fade" id="choseCourse" tabindex="-1" aria-labelledby="choseCourse" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable 	modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="choseCourse">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-8">
                      <div class="card mb-3 w-100" v-for="item in listAddCourses" v-bind:key="item.id">
                        <div class="row g-0">
                          <div class="col-md-4">
                            <img :src=item.media.originUrl class="img-fluid rounded-start" alt="...">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title">{{ item.title }}</h5>
                              <p class="card-text">{{ item.shortDes }}</p>
                              <button class="btn btn-outline-primary w-100" @click="addToOrg(item.id)">Add</button>
                            </div>

                          </div>
                        </div>
                      </div>

                    </div>

                    <div class="col-3">
                      <form>
                        <legend>Course filter</legend>
                        <div class="mb-3">
                          <label for="name" class="form-label">Course name</label>
                          <input v-model="payload.title" type="text" class="form-control" id="name"
                            aria-describedby="name">

                        </div>
                        <div class="mb-3">
                          <label for="category" class="form-label">Category</label>
                          <select v-model="payload.categoryId" class="form-select" aria-label="Default select example">
                            <option :value="item.id" v-for="item in courseCategory" v-bind:key="item.id">{{
                              item.title }}
                            </option>
                          </select>
                        </div>

                        <button type="submit" class="btn btn-primary" @click="filterCourse()">Find</button>
                      </form>
                    </div>
                  </div>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>

        </h5>
        <el-carousel height="300px" direction="vertical" :autoplay="false">
          <el-carousel-item v-for="item in course" :key="item.id">
            <div class="card bg-dark text-white">
              <img :src=item.media.originUrl class="card-img " alt="...">
              <div class="card-img-overlay text-dark  text-overlay-highlight">
                <h5 class="card-title fw-bold">{{ item.title }}</h5>
                <p class="card-text">{{ item.shortDes }}.</p>

              </div>
            </div>
          </el-carousel-item>
        </el-carousel>


      </div>
    </div>
    <PricingTable class="mt-5" :currentPlan="currentPlan"></PricingTable>
    <!-- Modal -->

  </div>
</template>

<script>
import { format } from 'date-fns';
import axios from 'axios';
import PricingTable from "@/components/organization/PricingTable";
export default {
  name: 'UserPage',
  props: {
    msg: String
  },
  data() {
    return {
      categoryId: 0,
      search: '',
      searchQuery: '',
      phone: '',
      password: '',
      show: true,
      role: localStorage.getItem('role'),
      userName: localStorage.getItem('username'),
      tableData: [],
      course: [],
      isVerify: localStorage.getItem('active'),
      currentPlan: null,
      listAddCourses: [],
      courseCategory: [],
      payload: {
        title: null,
        page: 0,
        status: null,
        authorName: null,
        startPrice: 0,
        endPrice: 0,
        categoryId: 0,
        authorId: 0
      }
    }
  },
  components: {
    PricingTable
  },
  computed: {

    userLogined() {
      return this.$store.state.userLogined;
    },


  },
  mounted() {
    this.fetchOrganizationMembers()
    this.fetchOrganizationCourse()
    this.fetchOrganizationPlan()
  },
  methods: {
    formattedDate(createdAt) {
      // Định dạng ngày tháng thành dạng ngày/tháng/năm
      return format(new Date(createdAt), 'dd/MM/yyyy');
    },
    addToOrg(id) {
      const lstId = {
        ids:[]
      }; // Danh sách các id
      lstId.ids.push(id); // Thêm id vào danh sách

      axios.post(
        "api/v1/add-plan-course",
        lstId,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken")
          },
        }
      )
        .then(response => {
          // Nếu yêu cầu thành công, xử lý phản hồi ở đây
          console.log("Yêu cầu thành công:", response.data);
          // Hiển thị thông báo thành công
          this.$message({
          message: 'Congrats, course added.',
          type: 'success'
        });
        })
        .catch(error => {
          // Nếu có lỗi xảy ra, xử lý lỗi ở đây
          console.error("Lỗi:", error);
          // Hiển thị thông báo lỗi
          this.$message.error('Oops, some thing wrong!.');
        });
    },
    fetchCourses() {
      axios
        .get('api/v1/publish/list-course', {
          params: {
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
        }).then((response) => {
          this.listAddCourses = response.data.body
        })
    },
    fetchCourseCategory() {
      axios
        .get('api/v1/publish/list-course-categories', {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }).then((response) => {
          this.courseCategory = response.data
        })


      axios.get('api/v1/publish/list-course', {
        params: {
          page: 0,
          status: null,
          startPrice: 0,
          endPrice: 0,
          authorId: 0,
          authorName: null,
          categoryId: 0,
        },
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        this.listAddCourses = response.data.body
      })

    },
    fetchOrganizationPlan() {
      axios
        .get('api/v1/get-plan', {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }).then((response) => {
          this.currentPlan = response.data.body
        })
    },
    fetchOrganizationCourse() {
      axios
        .get('api/v1/get-org-course', {
          params: { id: localStorage.getItem("ownerId") },
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }).then((response) => {
          this.course = response.data.body
        })


    },
    fetchOrganizationMembers() {
      axios
        .get('api/v1/list-organization-member', {
          params: { organizationId: localStorage.getItem("ownerId") },
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }).then((response) => {
          this.tableData = response.data.body
        })
    },
    fetchSuggestions(queryString, cb) {
      axios
        .get('api/v1/list-users', {
          params: { name: queryString },
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          const users = response.data.body;
          // Lấy danh sách tên người dùng để hiển thị trong autocomplete
          const suggestions = users.map(user => ({
            value: user.name, // Giá trị hiển thị là tên người dùng
            id: user.id // ID của người dùng
          }));
          cb(suggestions);
          cb(suggestions);
        })
        .catch((error) => {
          console.error('Lỗi khi lấy gợi ý:', error);
          cb([]); // Trả về mảng rỗng trong trường hợp lỗi
        });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('Do you want remove this member: ' + row.name + '?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {

        this.$message({
          type: 'success',
          message: row.name + ' removed'
        });
        this.fetchOrganizationMembers();
      })
      axios.get("api/v1/remove-member", {
        params: {
          id: row.id
        },
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        }
      })
        .catch((error) => {
          // Access the error response from the server
          const errorMessage = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Failed to remove user';

          // Display the error message
          this.$message({
            type: 'error',
            message: errorMessage
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Operation canceled'
          });
        });

    },
    // Xử lý việc chọn một gợi ý
    handleSelect(item) {
      let user = {
        name: item.value,
        id: item.id
      }

      this.$confirm('This will add ' + item.value + 'to the organization. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {

        axios.post("api/v1/add-user-to-organization", user, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          }
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: user.name + ' added to the organization'
            });
            this.fetchOrganizationMembers();
          })
          .catch((error) => {
            // Access the error response from the server
            const errorMessage = error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : 'Failed to add user to organization';

            // Display the error message
            this.$message({
              type: 'error',
              message: errorMessage
            });
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Operation canceled'
        });
      });

      // Xử lý mục đã chọn theo nhu cầu
    },
    goLecturePage() {
      this.$router.push({ path: "/LectureStudio" })
    },
    goLearnerPage() {
      this.$router.push({ path: "/LearnerPage" })
    },
    goToCart() {
      this.$router.push({ path: "/CartPage" })
    },
    goHome() {
      this.$router.push({ path: "/" })
    },

  }
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

.text-overlay-highlight {
  background-color: rgba(255, 255, 255, 0.4);
  /* Nền trắng với độ đậm đặc cao hơn */
  padding: 10px;
  /* Tạo khoảng cách cho văn bản */
}
</style>