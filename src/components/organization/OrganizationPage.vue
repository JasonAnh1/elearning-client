<template>
  <div class="">

    <div class="my-learning container-fluid bg-dark " style="height: 200px;">
      <h1 class="text-primary ms-5 pt-5 fw-bold ps-5">{{ userName }} Organization</h1>
      <h1 class="btn btn-outline-success  mt-3" style="margin-left:90px ;" data-bs-toggle="modal"
        data-bs-target="#verifyCheckOutModal" v-if="isVerify !== 'VERIFY' && isVerify !== 'DISABLE'">Verify organization request</h1>
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
    <div class="row ms-3">

      <div class="col-5  m-3">
        <h5 class="fw-bold">Member:</h5>

        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">

          <el-table-column type="expand">
            <template slot-scope="props">
              <p>Phone: {{ props.row.phone }}</p>
              <p>Createdat: {{ props.row.createdAt }}</p>

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
            <template>

              <el-button class="me-5" size="mini" type="danger"
                @click="handleDelete(scope.$index, scope.row)">Remove</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="d-flex justify-content-center mt-3" :page-size="20" :pager-count="11"
          layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
      <div class="col-xs-12 col-5 m-3">
        <div class=" mb-3" style="max-width: 540px;">

        </div>
        <h5 class=" fw-bold">Courses: </h5>
        <el-carousel  direction="vertical" :autoplay="false">
    <el-carousel-item v-for="item in course" :key="item">
      <div class="card bg-dark text-white">
  <img :src=item.media.originUrl class="card-img" alt="...">
  <div class="card-img-overlay text-dark">
    <h5 class="card-title fw-bold">{{ item.title }}</h5>
    <p class="card-text">{{ item.shortDes }}.</p>
    
  </div>
</div>
    </el-carousel-item>
  </el-carousel>


      </div>
    </div>
    <PricingTable class="mt-5"></PricingTable>

  </div>
</template>

<script>
import axios from 'axios';
import PricingTable from "@/components/organization/PricingTable";
export default {
  name: 'UserPage',
  props: {
    msg: String
  },
  data() {
    return {
      search: '',
      searchQuery: '',
      phone: '',
      password: '',
      show: true,
      role: localStorage.getItem('role'),
      userName: localStorage.getItem('username'),
      tableData: [],
      course:[],
      isVerify: localStorage.getItem('active'),
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
  },
  methods: {
    fetchOrganizationCourse(){
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
</style>