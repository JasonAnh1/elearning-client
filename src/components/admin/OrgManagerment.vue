<template>
    <div>
        <h3 class="fw-bold mt-3 mb-3">Organization managerment</h3>
        <el-form :inline="true" class="demo-form-inline border ps-5 pt-3">
            <div class="w-50" :inline="true">
                <span class="demonstration">Start price:</span>
                <el-slider v-model="payload.startPrice" :max="6000000" :format-tooltip="formatPriceTooltip"></el-slider>
            </div>
            <div class=" w-50" :inline="true">
                <span class="demonstration">End price:</span>
                <el-slider v-model="payload.endPrice" :max="6000000" :format-tooltip="formatPriceTooltip"></el-slider>
            </div>
            <el-form-item label="Author name">
                <el-input placeholder="Author name"  v-model="payload.authorName"></el-input>
            </el-form-item>
            <el-form-item label="Course status">
                <el-select placeholder="Status" v-model="payload.status">
                    <el-option label="PENDING" value="PENDING"></el-option>
                    <el-option label="APPROVE" value="APPROVE"></el-option>
                    <el-option label="CANCEL" value="CANCEL"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Course category">
                <el-select placeholder="category" v-model="status">
                    <el-option label="PENDING" value="PENDING"></el-option>
                    <el-option label="APPROVE" value="APPROVE"></el-option>
                    <el-option label="CANCEL" value="CANCEL"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="courseFilter()">Fillter</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="listOrganization.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%" :default-sort="{ prop: 'createdAt', order: 'descending' }">
            <el-table-column label="Date" prop="createdAt" :formatter="formatDate" sortable width="100" fixed>
            </el-table-column>
            <el-table-column label="Name" prop="name" width="190">
            </el-table-column>
            <el-table-column label="Status" prop="active" sortable>
            </el-table-column>
            <el-table-column label="Member number" prop="members" sortable>
            </el-table-column>


            <el-table-column fixed="right" width="180">
                <template slot="header">
                    <input v-model="search" placeholder="Type to search course">
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleApprove(scope.$index, scope.row)" type="success"
                        plain>Verify</el-button>
                    <el-button size="mini" type="danger" @click="handleCancel(scope.$index, scope.row)"
                        plain>Disable</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="mt-3" background layout="prev, pager, next" :total="1000" align="right"
            @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize">
        </el-pagination>





    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'OrgManagerment',
    data() {
        return {
            listOrganization:[],
            currentPage: 1, // Trang hiện tại
            pageSize: 20, // Số lượng mục trên mỗi trang
            total: 0,
            search: '',
            startPrice: 0,
            endPrice: 10000000,
            status: '',
            payload: {
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

    },
    computed: {
        
    },
    mounted() {
      this.fetchOrgs()


    },
    methods: {
        fetchOrgs(){
            axios.get("api/v1/list-organizations", {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            },
        }).then(response => {
            // Sau khi nhận được phản hồi, gán danh sách tổ chức vào biến listOrganization
            this.listOrganization = response.data.body; // Giả định rằng response.data chứa danh sách tổ chức
        })
            .catch(error => {
                console.error("Error fetching list of organizations:", error);
                // Xử lý lỗi nếu có
            });
        },
        formatPriceTooltip(val) {
            // Sử dụng Intl.NumberFormat để định dạng số thành tiền tệ Việt Nam
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
        },
        formatPrice(row, column, cellValue) {
            // Kiểm tra xem cellValue có tồn tại không
            if (cellValue) {
                // Sử dụng Intl.NumberFormat để định dạng số thành tiền tệ Việt Nam
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cellValue);
            }
            // Nếu không có giá trị, trả về một chuỗi trống
            return '';
        },
        courseFilter() {
            this.$store.dispatch('fetchListCourse', this.payload)
        },
        formatDate(row, column) {
            const date = new Date(row[column.property]);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        },
        loadData() {
            // Tính toán dữ liệu dựa trên trang hiện tại và số lượng mục trên mỗi trang
            // Ví dụ: this.tableData = dữ liệu từ API hoặc bất kỳ nguồn nào khác
            // Tính tổng số mục

        },
        handleApprove(index, row) {

            axios.get("api/v1/verify-organization", {
                params: { id: row.id },
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
        }).then(() => {
            this.fetchOrgs()
        })
            .catch(error => {
                console.error("Error fetching list of organizations:", error);
                // Xử lý lỗi nếu có
            });

        },
        handleCancel(index, row) {

            this.course = new Object({
                id: row.id,
                status: "CANCEL"
            })
            this.$store.dispatch('fetchUpdateCourse', { 'img': null, 'request': this.course }).then(() => {
                this.$store.dispatch('fetchListCourse', this.payload)
            });
        },
        handleCurrentChange(val) {

            this.payload.page = val - 1;
            // Cập nhật dữ liệu tương ứng với trang mới
            this.$store.dispatch('fetchListCourse', this.payload)

        }
    },
}
</script>