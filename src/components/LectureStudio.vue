<template>
  <div>
    <div class="my-learning container-fluid bg-dark " style="height: 200px;">
      <h1 class="t ms-5 pt-5 fw-bold ps-5 text-primary">ElearnCenter Studio</h1>
      <h1 class="btn btn-outline-primary  mt-3" style="margin-left:90px ;" data-bs-toggle="modal"
        data-bs-target="#createCourseModal">Create new course</h1>
      <div class="modal fade" id="createCourseModal" tabindex="-1" aria-labelledby="createCourseModal"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createCourseModal">Create course</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row g-3">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Category</label>
                  <select v-model="cCategoryId" class="form-select" aria-label="Default select example">
                    <option :value="item.id" v-for="item in listCourseCategories" v-bind:key="item.id">{{ item.title }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Title</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1" ref="cTitle">
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Short description</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1" ref="cShortDes">
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                  <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="cDescription">
                  </VueEditor>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Content</label>
                  <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="cContent">
                  </VueEditor>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Requirement</label>
                  <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="cRequirement">
                  </VueEditor>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Detail</label>
                  <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="cDetail">
                  </VueEditor>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Price</label>
                  <input type="number" class="form-control" id="exampleFormControlInput1" ref="cPrice">
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">PriceSale</label>
                  <input type="number" class="form-control" id="exampleFormControlInput1" ref="cPriceSale">
                </div>

                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Level</label>
                  <select v-model="cLevel" class="form-select" aria-label="Default select example">
                    <option value="BEGINNER">BEGINNER</option>
                    <option value="ADVANCED">ADVANCED</option>
                    <option value="INTERMEDIATE">INTERMEDIATE</option>
                    <option value="EXPERT">EXPERT</option>
                  </select>
                </div>
                <div class="input-group mb-3">
                  <input v-on:change="changePic()" type="file" class="form-control w-100" id="inputGroupFile02"
                    accept="image/*" ref="file">

                  <img :src=imageFile class="img-thumbnail mt-3" alt="..." style="width: 120px;height: 67px;">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" v-on:click="addCourse()">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5 mb-5">
      <h3 class="fw-bold">My course:</h3>
      <div class="row row-cols-1 row-cols-md-4 jus">
        <div class="col" v-for="item in listCourseForAuthor" v-bind:key="item.id" >
          <div class="card h-100 " >

            <a class="text-decoration-none text-reset" v-on:click="getDetailCourseStudio(item.id)">
              <img
                :src=item.media.thumbUrl
                class="card-img-top " alt="...">

              <div class="card-body">
                <h5 class="card-title fw-bold">{{item.title}}</h5>
                <p class="card-text">{{item.author.name}}</p>
              </div>
              <div class="card-footer">
                <i class="fa-solid fa-star text-warning" v-for="n in item.rating" v-bind:key="n"></i><span class="text-muted text-decoration-none"
                  style="font-size: 11px;">99999 Learner <i class="fa-solid fa-user"></i></span>
              </div>
            </a>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: 'LectureStudio',
  data() {
    return {
      imageFile: null,
      cLevel: null,
      cDescription: null,
      course: new Object(),
      cContent: null,
      cDetail: null,
      cCategoryId: 0,
      cRequirement: null
    }
  },
  components: {
    VueEditor
  },
  computed: {
    listCourseCategories() {
      return this.$store.state.lstCourseCategory;
    },
    listCourseForAuthor()
    {
      return this.$store.state.lstCourseForLecture;
    }
  },
  mounted() {
  
      this.$store.dispatch('fetchListCourseForAuthor',0);
    },
  methods: {

    loginIntoSystem() {
      this.$store.dispatch('fetchLogin', {
        phone: this.phone,
        password: this.password
      });
    },
    changePic() {
      this.imageFile = URL.createObjectURL(this.$refs.file.files[0])
    },
    getDetailCourseStudio(courseId){
      this.$store.dispatch('fetchCourse',courseId);

    },
    addCourse() {
      var formData = new FormData();
      formData.append('file', this.$refs.file.files[0]);
      this.course = new Object({
        title: this.$refs.cTitle.value,
        categoryId: this.cCategoryId,
        shortDes: this.$refs.cShortDes.value,
        requirement: this.cRequirement,
        detail: this.cDetail,
        price: this.$refs.cPrice.value,
        priceSale: this.$refs.cPriceSale.value,
        courseContent: this.cContent,
        level: this.cLevel,
        description: this.cDescription
      })
      this.$store.dispatch('fetchAddCourse', { 'img': formData, 'request': this.course });
    }
  },
  props: {
    msg: String
  },

}
</script>