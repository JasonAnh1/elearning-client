<template>
  <div>
    <el-input
      v-model="searchName"
      placeholder="Search by name"
      style="margin-bottom: 20px; width: 300px;"
      class="mt-3"
    ></el-input>
    <el-table :data="filteredLectures" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>Email: {{ props.row.email }}</p>
          <p>Full name: {{ props.row.fullName }}</p>
          <p>Phone: {{ props.row.phone }}</p>
          <p>Active: {{ props.row.active }}</p>

          <!-- Tháng và năm nhập -->
          <el-form :inline="true" :model="dateForm">
            <el-form-item label="Month">
              <el-input v-model="dateForm.month" placeholder="Enter month"></el-input>
            </el-form-item>
            <el-form-item label="Year">
              <el-input v-model="dateForm.year" placeholder="Enter year"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getTotalAmount(props.row.id)">Get Revenue</el-button>
            </el-form-item>
          </el-form>

          <!-- Hiển thị doanh thu -->
          <div v-if="props.row.revenue !== undefined">
            <el-alert :title="'Total Revenue: ' + formatPriceTooltip(props.row.revenue)" type="success" show-icon>
            </el-alert>
          </div>

        </template>
      </el-table-column>
      <el-table-column label="Date" prop="updatedAt" :formatter="formatDate">
      </el-table-column>
      <el-table-column label="Name" prop="name">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'CourseTable',
  data() {
    return {
      dateForm: {
        month: '',
        year: ''
      },
      searchName: '',
      listLectures: []
    }
  },
  components: {

  },
  computed: {
    filteredLectures() {
      return this.listLectures.filter(lecture => {
        return lecture.fullName.toLowerCase().includes(this.searchName.toLowerCase());
      });
    }
  },
  mounted() {
    this.fetchListLectures()
  },
  methods: {
    async fetchListLectures() {

      const response = await axios.get("api/v1/list-lecturer", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });

      this.listLectures = response.data.body
    },
    async getTotalAmount(receiverId) {
      const { month, year } = this.dateForm;
      if (!month || !year) {
        this.$message.error('Please enter both month and year');
        return;
      }
      try {
        const response = await axios.get(`/api/v1/transactions/total`, {
          params: {
            receiverId,
            year,
            month
          },
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        const revenue = response.data;

        // Tìm lecture và cập nhật doanh thu
        const lectureIndex = this.listLectures.findIndex(lecture => lecture.id === receiverId);
        if (lectureIndex !== -1) {
          this.$set(this.listLectures[lectureIndex], 'revenue', revenue * 0.7);
        }

      } catch (error) {
        this.$message.error('Failed to fetch revenue');
      }
    },
    formatDate(row, column) {
      const date = new Date(row[column.property]);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },

    formatPriceTooltip(val) {
      // Sử dụng Intl.NumberFormat để định dạng số thành tiền tệ Việt Nam
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
    },
  },
}
</script>