<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-8">

        <!-- Article Header -->
        <div class="mb-4">
          <h1 class="display-4">{{ article.title }}</h1>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
          v-if="author == 'true'"
          >
            Edit
          </button>

          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Update article</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form class="row g-3">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Title</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1"  v-model="article.title">
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Short description</label>
                  <textarea type="text" class="form-control" id="exampleFormControlInput1" v-model="article.shortDes"></textarea>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                  <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="article.description">
                  </VueEditor>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Content</label>
                  <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="article.content">
                  </VueEditor>
                </div>
                <div class="input-group mb-3">
                  <input v-on:change="changePicArticle()" type="file" class="form-control w-100" id="inputGroupFile02"
                    accept="image/*" ref="articleAvatar">

                  <img :src=imageFile class="img-thumbnail mt-3" alt="..." style="width: 120px;height: 67px;">
                </div>
              </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary"  v-on:click="updateArticle()">Save changes</button>
                </div>
              </div>
            </div>
          </div>
          <p class="text-muted">By <strong>{{ article.user.name }}</strong> | Date: <strong>{{
            formatDate(article.createdAt)}}</strong></p>
        </div>

        <!-- Article Image -->
        <div class="mb-4">
          <img :src=article.media.originUrl class="img-fluid" alt="Ảnh minh họa">
        </div>

        <!-- Article Content -->
        <div>
          <div v-html="article.content"></div>
        </div>

        <!-- Social Share -->

      </div>

      <!-- Sidebar -->
      <div class="col-lg-4">
        <h4>You may want</h4>
        <ul class="list-group">
          <li class="list-group-item"><a href="#">Bài viết 1</a></li>
          <li class="list-group-item"><a href="#">Bài viết 2</a></li>
          <li class="list-group-item"><a href="#">Bài viết 3</a></li>
          <li class="list-group-item"><a href="#">Bài viết 4</a></li>
          <li class="list-group-item"><a href="#">Bài viết 5</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

import axios from "axios";
export default {
  components: {
    // PDFViewer
    VueEditor,
  },
  name: 'ViewBook',

  data() {
    return {
      userName: localStorage.getItem("username"),
      isLoading: true,
      articleId: this.$route.query.articleId,
      article: null,
      author: this.$route.query.author,
      imageFile:null,
    }
  },
  async mounted() {
    const response = await axios.get("api/v1/publish/article", {
      params: { articleId: this.articleId },
    });
    this.article = response.data;
 


  },

  methods: {
    async updateArticle() {
      try {
        const file = this.$refs.articleAvatar.files[0];
        if (file) {
          var formData = new FormData();
          formData.append('file', file);

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
            this.article.mediaId = responseImg.data.body.id;
          } catch (error) {
            this.$message.error("Image upload error:", error.response ? error.response.data : error.message);
          }
        } 

        try {
          await axios.post("api/v1/update-article", this.article, {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          });
          this.$message({
          message: "update article successfully!",
          type: 'success'
        });
        } catch (error) {
          this.$message.error("post article error:", error.response ? error.response.data : error.message);
        }

      } catch (error) {
        this.$message.error("Unexpected error:", error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    changePicArticle() {
      this.imageFile = URL.createObjectURL(this.$refs.articleAvatar.files[0])
    },
  },

}

</script>
<style scoped></style>