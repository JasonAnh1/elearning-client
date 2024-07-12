<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <div class="filter-section">

                    <el-form :inline="true" class="demo-form-inline  ps-5 pt-3 shadow p-3 mb-5 bg-body rounded">

                        <div class="w-50" :inline="true">
                            <span class="demonstration">Start price:</span>
                            <el-slider v-model="payload.startPrice" :max="6000000"
                                :format-tooltip="formatPriceTooltip"></el-slider>
                        </div>
                        <div class=" w-50" :inline="true">
                            <span class="demonstration">End price:</span>
                            <el-slider v-model="payload.endPrice" :max="6000000"
                                :format-tooltip="formatPriceTooltip"></el-slider>
                            
                        </div>
                        <el-form-item label="Author name">
                            <el-input placeholder="Author name" v-model="payload.authorName"></el-input>
                        </el-form-item>
                        <el-form-item label="Title">
                            <el-input placeholder="Title" v-model="payload.title"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="courseFilter()">Fillter</el-button>
                        </el-form-item>
                    </el-form>
                </div>

            </div>
            <div class="col-md-9">
                <div class="course-card d-flex" v-for="item in courses" v-bind:key="item.id"
                    @click="goToDetail(item.id)">
                    <div class="position-relative">
                        <img :src="item.media.thumbUrl" class="card-img-top"
                            :class="{ 'promote-border': item.advertise === 'PROMOTE' }" alt="...">
                        <span v-if="item.advertise === 'PROMOTE'" class="promote-overlay">PROMOTE</span>
                    </div>
                    <div class="course-details">
                        <h5 class="fw-bold">{{ item.title }}</h5>
                        <p>{{ item.shortDes }}</p>
                        <p>{{ item.author.name }}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span>{{ item.rating }} ⭐</span>
                            <div>
                                <span class="course-price">{{ formatPriceTooltip(item.priceSale) }}</span>
                                <span class="course-original-price">{{ formatPriceTooltip(item.price) }}</span>
                       
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'FilterCourse',
    data() {
        return {
      
            payload: {
                page: 0,
                status: 'APPROVE',
                authorName: null,
                startPrice: 0,
                endPrice: 0,
                categoryId: this.$route.query.categoryId,
                authorId: 0,
                title: null
            },
        
        }
    },
    components: {

    },
    computed: {
        courses() {
            return this.$store.state.lstCourse.slice().sort((a, b) => {
                // Kiểm tra nếu a là 'PROMOTE' và b không phải là 'PROMOTE'
                if (a.advertise === 'PROMOTE' && b.advertise !== 'PROMOTE') {
                    return -1;  // Đưa a lên trước b
                }
                // Kiểm tra nếu a không phải là 'PROMOTE' và b là 'PROMOTE'
                else if (a.advertise !== 'PROMOTE' && b.advertise === 'PROMOTE') {
                    return 1;  // Đưa b lên trước a
                }
                // Nếu cả hai đều là 'PROMOTE' hoặc cả hai đều không phải là 'PROMOTE'
                else {
                    return 0;  // Giữ nguyên thứ tự hiện tại
                }
            });
        },
    },
    async mounted() {
        this.$store.dispatch('fetchListCourse', this.payload)
    },

    methods: {
        formatPriceTooltip(val) {
            // Sử dụng Intl.NumberFormat để định dạng số thành tiền tệ Việt Nam
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
        },
        goToDetail(id) {
            this.$router.push({ path: "/DetailCourse", query: { courseId: id } });
        },
        courseFilter() {
            this.$store.dispatch('fetchListCourse', this.payload)
            console.log(this.payload)
        },
    },
    props: {
        msg: String
    },

}
</script>
<style scoped>
.course-card {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
    cursor: pointer; /* Thêm con trỏ để chỉ ra rằng thẻ có thể được nhấp vào */
    transition: transform 0.2s, box-shadow 0.2s;
}

.course-card:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.course-img {
    max-width: 100%;
    border-radius: 5px;
}

.course-details {
    flex: 1;
    padding-left: 15px;
}

.course-price {
    font-size: 1.2em;
    color: #f00;
}

.course-original-price {
    text-decoration: line-through;
    color: #888;
}

.filter-section {
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
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