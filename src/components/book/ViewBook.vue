<template>
  <!-- <PDFViewer
      source="ABC's-of-Science.pdf"
      style="height: 100vh; width: 100vw"
  
    /> -->
    <div class="row  bg-dark ">
        <h2 class="fw-bold text-primary m-5" style="font-size: 36px;">{{book.title}}</h2>
      
  <div class="col-2 ">
    <button class="btn btn-outline-primary ms-5 "  :disabled="page <= 1" @click="page--">❮</button>
       

  </div>
     <div class="col-8">
       <div class="d-flex justify-content-center text-white " style="font-size: 20px;  "> {{ page }} / {{ pageCount }}</div>
   
                <vue-pdf-embed class=" mb-5"  :textLayer=true  :source=book.media.originUrl
                :page="page" @rendered="handleDocumentRender" ref="pdfRef"></vue-pdf-embed>

   

     </div>
  
     <div class="col-2 ps-5">

    <button  class="btn btn-outline-primary ms-5"  :disabled="page >= pageCount" @click="nextPage">❯</button>
  </div>

    </div>
</template>

<script>
// import PDFViewer from 'pdf-viewer-vue/dist/vue2-pdf-viewer'
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
import axios from "axios";
export default {
  components: {
    // PDFViewer
    VuePdfEmbed
  },
  name: 'ViewBook',

   data() {
       return {
           userName: localStorage.getItem("username"),
           isLoading: true,
           page: 1,
           pageCount: 1,
           bookId: this.$route.query.bookId,
           book: null,
           chapter:null,
           readed: null
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
    handleDocumentRender() {
      this.isLoading = false
      this.pageCount = this.$refs.pdfRef.pageCount
    },
    nextPage() {
      if(this.readed === false && this.page === 5){
        this.$notify.error({
          title: 'Error',
          message: 'Please buy the book first',
          position: 'bottom-right'
        });
      }else{
        this.page++;
      
      axios.get("api/v1/update-chapter", {
        params: { bookId: this.bookId, chapter:this.page },
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      this.$notify({
        title: 'Success',
        message: 'Next page',
        type: 'success',
        position: 'bottom-right'
      });

      }
     

    }
   },

}

</script>
<style scoped>

.vue-pdf-embed > div {
  margin-bottom: 8px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
}
</style>