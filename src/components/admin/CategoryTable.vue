<template>
    <div>

        <el-table :data="categories.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%" :default-sort="{ prop: 'createdAt', order: 'descending' }">
            <el-table-column label="Date" prop="createdAt" :formatter="formatDate" sortable width="100" fixed>
            </el-table-column>

            <el-table-column label="Title" prop="title" width="190">
            </el-table-column>

            <el-table-column label="Avatar" prop="avatar.originUrl" width="300">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar.originUrl" alt="avatar" style="width: 100px; height: auto;">
                </template>
            </el-table-column>
            <el-table-column label="Edit" width="300">
                <template slot-scope="scope">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#cate'+ scope.row.id" @click="bindCategory(scope.row)">
                        Edit
                    </button>
                    <div class="modal fade" :id="'cate'+scope.row.id" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title"  :id="'cate'+scope.row.id">Edit category id: {{ scope.row.id }}
                                    </h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form class="row g-3">
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">Title</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="category.title">
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">
                                                description</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                                ref="cShortDes" v-model="category.description">
                                        </div>
                                        <div class="input-group mb-3">
                                            <input v-on:change="changePic()" type="file" class="form-control w-100"
                                                id="inputGroupFile02" accept="image/*" ref="file">

                                            <img :src=imageFile class="img-thumbnail mt-3" alt="..."
                                                style="width: 120px;height: 67px;">
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" @click="saveChange()"  data-bs-dismiss="modal">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

            </el-table-column>
            <el-table-column fixed="right" width="180">
                <template slot="header">
                    <input v-model="search" placeholder="Type to search course">
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'CategoryTable',
    data() {
        return {
            search: '',
            categories:[],
            category:{
                id:0,
                title:null,
                description:null,
                avatarId:null
            },
            imageFile: null,
            file: null
        }
    },
    components: {

    },
    async mounted() {
        const response = await axios.get("api/v1/publish/list-categories");
        this.categories = response.data;
    },
    methods: {
        changePic() {
            this.file = event.target.files[0];
            if ( this.file) {
                this.imageFile = URL.createObjectURL( this.file);
            }
        },
        bindCategory(category) {
            this.category.id = category.id;
            this.category.title = category.title;
            this.category.description = category.description;

        },
        async saveChange() {
            try {
        
                // Check if a file is selected
                if (this.file) {
                    var formData = new FormData();
                     formData.append('file', this.file);
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
                        this.category.avatarId = responseImg.data.body.id;
                    } catch (error) {
                        this.$message.error("Image upload error: " + (error.response ? error.response.data : error.message));
                        return;
                    }
                }


                try {
                    await axios.post("api/v1/update-category", this.category, {
                        headers: {
                            Authorization: localStorage.getItem("accessToken"),
                        },
                    });
                    this.$message({
                        message: "update category successfully!",
                        type: 'success'
                    });
                } catch (error) {
                    this.$message.error("update category error:", error.response ? error.response.data : error.message);
                }


            } catch (error) {
                this.$message.error("Unexpected error:", error);
            }
        },
        formatDate(row, column) {
            const date = new Date(row[column.property]);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        },

        handleApprove(index, row) {

            this.course = new Object({
                id: row.id,
                status: "APPROVE"
            })
            this.$store.dispatch('fetchUpdateCourse', { 'img': null, 'request': this.course }).then(() => {
                this.$store.dispatch('fetchListCourse', this.payload)
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