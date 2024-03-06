import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
export const store = new Vuex.Store({
  state: {
    userLogined: {
      id: 0,
      accessToken: "",
      name: "",
      imageUrl: "",
      roles: [
        {
          name: "",
        },
      ],
    },
    lstCourseCategory: [],
    lstCourseForLecture: [],
    currentTagetCourse: {
        
    },
  },
  getters: {},
  mutations: {
    loginServer(state, user) {
      state.userLogined = user;

      const accessToken = "Bearer " + state.userLogined.accessToken;

      console.log(state.userLogined.roles[0].name);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", state.userLogined.roles[0].name);
      localStorage.setItem("username", state.userLogined.name);
      localStorage.setItem("userimg", state.userLogined.imageUrl);
      localStorage.setItem("ownerId", state.userLogined.id);
    },

    register(state, userRegisted) {
      state.userLogined = userRegisted;
      const accessToken = "Barear " + state.userLogined.accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", state.userLogined.roles[0].name);
    },
    getListCourseCategory(state, courseCategories) {
      state.lstCourseCategory = courseCategories;
    },
    getListCourseForLecture(state, courses) {
      state.lstCourseForLecture = courses;
    },
    getCourse(state, course) {
      state.currentTagetCourse = course;
    },
  },
  actions: {
    async fetchLogin(context, phone, password) {
      const response = await axios
        .post("api/v1/auth/signin", phone, password)
        .catch((error) => console.log(error));

      if (response !== undefined) {
        if (response.data.roles[0].name == "ROLE_LECTURE") {
          router
            .push({ path: "/LectureStudio" })
            .catch(() => {})
            .then(() => {
              router.go();
            });
        } else {
          router
            .push({ path: "/" })
            .catch(() => {})
            .then(() => {
              router.go();
            });
        }
      } else {
        Swal.fire("something went wrong. !", "Please try again.", "Faild !");
      }
    },
    async fetchAddLesson(context,payload){
 
      if(payload.media != undefined){
        const responseMedia = await axios.post(
          "api/v1/file/upload-video",
          payload.media,
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        payload.request.mediaId = responseMedia.data.body.id
      }

     
      await axios.post("api/v1/create-lesson", payload.request, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
  
    },
    async fetchAddCourse(context, payload) {
      const responseImg = await axios.post(
        "api/v1/file/upload-image",
        payload.img,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      payload.request.mediaId = responseImg.data.body.id;
      await axios.post("api/v1/create-course", payload.request, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      router
        .push({ path: "/LectureStudio" })
        .catch(() => {})
        .then(() => {
          router.go();
        });
    },

    async fetchAddCourseSection(context, payload) {
      await axios.post("api/v1/create-course-section", payload.request, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
    },
    async fetchListCourseCategory(context) {
      const response = await axios.get("api/v1/publish/list-course-categories");
      context.commit("getListCourseCategory", response.data);
    },
    async fetchCourse(context, courseId) {
      const response = await axios.get("api/v1/publish/get-course", {
        params: { courseId: courseId },
      });
      const response2 = await axios.get("api/v1/publish/list-course-section", {
        params: { courseId: courseId },
      });
      response.data.sections = response2.data
      response.data.sections.lessons = response2.data.lessons
      context.commit("getCourse", response.data);
      router.push({ path: "/DetailCourseStudio" });
    },
    async fetchListCourseForAuthor(context, page) {
      const authorId = localStorage.getItem("ownerId");
      const response = await axios.get("api/v1/publish/list-course", {
        params: { page: page, authorId: authorId },
      });

      context.commit("getListCourseForLecture", response.data);
    },
   
  },
});
