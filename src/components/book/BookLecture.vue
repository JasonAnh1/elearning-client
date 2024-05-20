<template>
        <div class="container mt-5 mb-5">
            <h3 class="fw-bold">My Books:</h3>
            <div class="row row-cols-1 row-cols-md-4 jus">
                <div class="col mt-4" v-for="item in books" v-bind:key="item.id">
                    <div class="card h-100 ">
                        <a class="text-decoration-none text-reset" v-on:click="getDetailBookStudio(item.id)">
                            <img :src=item.avatar.thumbUrl class="card-img-top " alt="..." style="height: 260px;">
                            <!-- <span class=" ms-3" style="font-size: 10px;"><i class="fa-solid fa-user text-muted"></i>
                                <el-rate class="ps-3" value="3.3" disabled show-score text-color="#ff9900"
                                    score-template="{value}">
                                </el-rate>
                            </span> -->
                            <div class="card-body">
                                <h5 class="card-title fw-bold">{{ item.title }}</h5>
                                <p class="card-text">{{ item.author.name }}
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>


import axios from "axios";
import router from '@/router';

export default {
    name: 'LectureStudio',

    data() {
        return {
            books: [],
        }
    },

    computed: {

    },
    async mounted() {
        const response = await axios.get("api/v1/publish/get-books", {
            params: { page: 0, authorId: localStorage.getItem('ownerId'), categoryId: 0, startPrice: 0, endPrice: 0 },
        });
        this.books = response.data;
    },
    methods: {

        getDetailBookStudio(bookId) {

            router.push({ path: "/ViewBook", query: { bookId: bookId , author:true } });

        },

    },
    props: {
        msg: String
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