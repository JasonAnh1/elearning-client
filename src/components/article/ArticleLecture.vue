<template>
    <div class="container mt-5 mb-5">
        <h3 class="fw-bold" v-if="forAll !== 'yes'">My Article:</h3>
        <div class="card mb-3 shadow-sm" style="border: none; " v-for="item in articles" v-bind:key="item.id">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src=item.media.thumbUrl class="img-fluid rounded-start h-100" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title fw-bold" @click="getDetailArticle(item.id)" v-if="forAll === 'yes'">{{
                            item.title }} </h5>
                        <h5 class="card-title fw-bold" @click="getDetailArticleStudio(item.id)" v-else>{{ item.title }}
                        </h5>
                        <p class="card-text">{{ item.shortDes }} </p>
                        <p class="card-text text-muted" style="font-size: 12px;">{{ item.user.name }} <span class="ms-2"
                                style="color: #dd4b1f;font-size: 13px;">1223 <i class="fa-solid fa-fire"></i></span></p>
                        <p class="card-text"><small class="text-primary" style="font-size: 11px;">{{
                            timePassed(item.createdAt)
                                }}</small></p>
                    </div>
                </div>
            </div>
        </div>
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item" v-if="page + 1 > 1">
                    <a class="page-link" href="#" @click="prevPage">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous page</span>
                    </a>
                </li>
                <li class="page-item" v-for="n in pageNumbers" :key="n">
                    <a class="page-link" href="#" :class="{ active: n === page + 1 }" @click="goToPage(n)">
                        {{ n }}
                    </a>
                </li>
                <li class="page-item" v-if="page + 1 < totalPages">
                    <a class="page-link" href="#" @click="nextPage">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next page</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>


import axios from "axios";
import router from '@/router';

export default {
    name: 'ArticleLecture',
    props: {
        forAll: String

    },
    data() {
        return {
            page: 0,
            totalPages: 0,
            pageNumbers: 0,
            pageSize:4,
            articles: [],
            totalRecord:0,
        }
    },

    computed: {
    },
    async mounted() {
        this.getArticles()
        console.log(this.totalRecord)
    },
    methods: {
        async getArticles() {
            let response;
            if (this.forAll) {
                response = await axios.get("api/v1/publish/get-articles", {
                    params: { page: this.page, ownerId: 0 },
                });
            } else {
                 response = await axios.get("api/v1/publish/get-articles", {
                    params: { page: this.page, ownerId: localStorage.getItem('ownerId') },
                });
            }
            this.articles = response.data.body;
            this.totalRecord = response.data.totalRecord
            this.generatePagination();
        },
        generatePagination() {
            this.totalPages = Math.ceil(this.totalRecord / this.pageSize);
            const pageNumbers = [];
            for (let i = 1; i <= this.totalPages; i++) {
                pageNumbers.push(i);
            }

            this.pageNumbers = pageNumbers;
        },
        prevPage() {
            if (this.page + 1 > 1) {
                this.page--;
                this.getArticles();
            }
        },
        nextPage() {
            if (this.page + 1 < this.totalPages) {
                this.page ++;
                this.getArticles();
            }
        },
        goToPage(n) {
            this.page = n - 1;
            this.getArticles();
        },

        getDetailArticleStudio(articleId) {

            router.push({ path: "/ViewArticle", query: { articleId: articleId, author: true } });

        },
        getDetailArticle(articleId) {

            router.push({ path: "/ViewArticle", query: { articleId: articleId } });

        },
        timePassed(createdAt) {
            // Thời điểm đã lưu
            const savedMoment = new Date(createdAt);

            // Thời điểm hiện tại
            const currentMoment = new Date();

            // Tính toán thời gian đã trôi qua (tính bằng milliseconds)
            const timeDifference = currentMoment - savedMoment;

            // Chuyển đổi thời gian từ milliseconds sang giờ, phút, giây
            const seconds = Math.floor(timeDifference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (minutes < 3) {
                return `just now`;
            }

            if (hours < 1) {
                return `${minutes} minutes ago`;
            } else if (hours < 24) {
                return `${hours} hours ago`;
            } else if (days < 30) {
                return `${days} days ago`;
            }
            else {
                const months = Math.floor(days / 30);
                return `${months} months ago`;
            }
        },
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
</style>