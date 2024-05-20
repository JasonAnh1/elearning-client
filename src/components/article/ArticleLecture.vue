<template>
    <div class="container mt-5 mb-5">
        <h3 class="fw-bold">My Article:</h3>
        <div class="card mb-3 shadow-sm" style="border: none; " v-for="item in articles" v-bind:key="item.id" @click="getDetailArticleStudio(item.id)">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src=item.media.thumbUrl class="img-fluid rounded-start h-100" alt="...">s
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">{{ item.title }} </h5>
                        <p class="card-text">{{ item.shortDes }} </p>
                        <p class="card-text text-muted" style="font-size: 12px;">{{ item.user.name }} <span class="ms-2"
                                style="color: #dd4b1f;font-size: 13px;">1223 <i class="fa-solid fa-fire"></i></span></p>
                        <p class="card-text"><small class="text-primary" style="font-size: 11px;">{{ timePassed(item.createdAt)
                                }}</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


import axios from "axios";
import router from '@/router';

export default {
    name: 'ArticleLecture',

    data() {
        return {
            articles: [],
        }
    },

    computed: {

    },
    async mounted() {
        const response = await axios.get("api/v1/publish/get-articles", {
            params: { page: 0, authorId: localStorage.getItem('ownerId'), categoryId: 0, startPrice: 0, endPrice: 0 },
        });
        this.articles = response.data;
    },
    methods: {

        getDetailArticleStudio(articleId) {

            router.push({ path: "/ViewArticle", query: { articleId: articleId, author: true } });

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
      const days =  Math.floor(hours / 24);

      if(minutes < 3){
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