<template>
 <div>work {{ articleId }}</div>
</template>
  
  <script>

  import axios from "axios";
  export default {
    components: {
      // PDFViewer
      
    },
    name: 'ViewBook',
  
     data() {
         return {
             userName: localStorage.getItem("username"),
             isLoading: true,
             articleId: this.$route.query.articleId,
             article: null,
           
         }
     },
    async mounted() {
      const response = await axios.get("api/v1/publish/book", {
        params: { bookId: this.bookId },
      });
      this.book = response.data;
      // kiem tra nguoi dung da mua sach chua neu chua thi chi cho doc 5 trang
      const checkResponse = await axios.get("api/v1/publish/user-book-check", {
        params: { bookId: this.bookId },
        headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
      });
      this.readed = checkResponse.data
      // lay chapter hien tai cua nguoi doc
      const pageResponse = await axios.get("api/v1/current-chapter", {
        params: { bookId: this.bookId },
        headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
      });
      this.page = pageResponse.data;
  
  
    },
    methods: {
     
     },
  
  }
  
  </script>
  <style scoped>
  

  </style>