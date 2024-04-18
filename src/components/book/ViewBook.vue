<template>
  <!-- <PDFViewer
      source="ABC's-of-Science.pdf"
      style="height: 100vh; width: 100vw"
  
    /> -->
    <div class="row  bg-dark ">
        <h2 class="fw-bold text-primary m-5" style="font-size: 36px;">ABC's-of-Science</h2>
      
  <div class="col-2 ">
    <button class="btn btn-outline-primary ms-5 "  :disabled="page <= 1" @click="page--">❮</button>
       

  </div>
     <div class="col-8">
       <div class="d-flex justify-content-center text-white " style="font-size: 20px;  "> {{ page }} / {{ pageCount }}</div>
   
                <vue-pdf-embed class=" mb-5"   source="http://localhost:8080/api/download/2024_04_11_21_03_50_957_KTEC0_compressed.tracemonkey-pldi-09.pdf" :textLayer=true
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
       }
   },
  mounted() {

  },
   computed: {

   },
   methods: {
    handleDocumentRender() {
      this.isLoading = false
      this.pageCount = this.$refs.pdfRef.pageCount
    },
    nextPage(){
        this.page++;
        this.$notify({
          title: 'Success',
          message: 'Next page',
          type: 'success'
        });
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