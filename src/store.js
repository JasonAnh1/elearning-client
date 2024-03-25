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
      active:"",
      roles: [
        {
          name: "",
        },
      ],
    },

    lstCourseCategory: [],
    lstCourseForLecture: [],
    currentTagetCourse: {
      sections: [],
    },
    currentTargetLesson: {},
    currentQuizzes: [],
    lstCourse: [],
    cart: [],
    listCourseForLearner: [],
    totalCartMoney: 0,
  },
  getters: {},
  mutations: {
    updateCart(state, cartItems) {
      state.cart = cartItems;
    },
    updateTotalCartMoney(state, total) {
      state.totalCartMoney = total;
    },
    loginServer(state, user) {
      state.userLogined = user;

      const accessToken = "Bearer " + state.userLogined.accessToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", state.userLogined.roles[0].name);
      localStorage.setItem("username", state.userLogined.name);
      localStorage.setItem("userimg", state.userLogined.imageUrl);
      localStorage.setItem("ownerId", state.userLogined.id);
      localStorage.setItem("active", state.userLogined.active);
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
    getListCourse(state, courses) {
      state.lstCourse = courses;
    },
    getCourse(state, course) {
      state.currentTagetCourse = course;
    },
    getUpdatedListSection(state, sections) {
      state.currentTagetCourse.sections = sections;
    },
    getCurrentTargetLesson(state, lesson) {
      state.currentTargetLesson = lesson;
    },
    getQuizzes(state, lesson) {
      state.currentQuizzes = lesson;
    },
    removeUser(state) {
      state.userLogined = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("userimg");
      localStorage.removeItem("ownerId");
      setTimeout(location.reload.bind(location), 90);
      router.push({ path: "/" }).catch(() => {});
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
      let totalMoney = 0;
      state.cart.forEach((item) => {
        totalMoney += item.priceSale;
      });
      state.totalCartMoney = totalMoney;
    },
  },
  actions: {
    async submitVerifyPaymentSuccess(context, payload) {
      const response = await axios.post("api/v1/verify-transaction", payload, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      console.log(response.data);
      localStorage.removeItem("transactionObj");
      context.commit("loginServer", response.data);
    },
    async submitPaymentSuccess(context, payload) {
      const response = await axios.post("api/v1/content-payment", payload, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      console.log(response.data);
      localStorage.setItem("transactionObj", null);
      console.log(JSON.parse(localStorage.getItem("transactionObj")));
      // window.open(response.data.body.URL)
    },
    async goPaidPage(context, payload) {
      const response = await axios.get("api/v1/publish/pay2", {
        params: { bankCode: payload.bankCode, amountRequest: payload.total },
      });
      window.location.href = response.data.body.url;
      // window.open(response.data.body.URL)
    },
    deleteItemFormCart(context, index) {
      context.commit("removeFromCart", index);
    },
    changeCartItems(context, cartItems) {
      let totalMoney = 0;
      cartItems.forEach((item) => {
        totalMoney += item.priceSale;
      });
      context.commit("updateCart", cartItems);
      context.commit("updateTotalCartMoney", totalMoney);
    },
    logOut(context) {
      context.commit("removeUser");
    },
    async fetchTargetLesson(context, id) {
      const response = await axios.get("api/v1/publish/get-lesson", {
        params: { lessonId: id },
      });

      context.commit("getCurrentTargetLesson", response.data);
    },
    async lectureSignUp(context, payload) {
      const response = await axios
        .post("api/v1/auth/signupaslecture", payload)
        .catch((error) => console.log(error));
      if (response !== undefined) {
        context.commit("loginServer", response.data.body);
        router.push({ path: "/LectureStudio" }).catch(() => {});
      }
    },
    async fetchLogin(context, phone, password) {
      const response = await axios
        .post("api/v1/auth/signin", phone, password)
        .catch((error) => console.log(error));
      if (response !== undefined) {
        console.log(response.data);
        context.commit("loginServer", response.data);
        if (response.data.roles[0].name == "ROLE_LECTURE") {
          router.push({ path: "/LectureStudio" }).catch(() => {});
        } else if (response.data.roles[0].name == "ROLE_LEARNER") {
          router.push({ path: "/LearnerPage" }).catch(() => {});
        } else {
          setTimeout(location.reload.bind(location), 90);
          router.push({ path: "/CourseTable" }).catch(() => {});
        }
      } else {
        Swal.fire("something went wrong. !", "Please try again.", "Faild !");
      }
    },
    async fetchAddLesson(context, payload) {
      if (payload.media != undefined) {
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
        payload.request.mediaId = responseMedia.data.body.id;
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
  
    async fetchUpdateCourse(context, payload) {
      if (payload.img) {
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
      }
      await axios.post("api/v1/update-course", payload.request, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
    },
    async fetchUpdateCourseSection(context, payload) {
      await axios.post("api/v1/update-section", payload.request, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      const response = await axios.get("api/v1/publish/list-course-section", {
        params: { courseId: payload.courseId },
      });
      console.log(payload);
      context.commit("getUpdatedListSection", response.data);
    },
    async fetchAddCourseSection(context, payload) {
      await axios.post("api/v1/create-course-section", payload.request, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });

      window.location.reload();
    },
    async fetchAddQuizzes(context, payload) {
      // console.log(payload)
      await axios.post("api/v1/create-quizzes", payload, {
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
      response.data.sections = response2.data;
      response.data.sections.lessons = response2.data.lessons;
      context.commit("getCourse", response.data);
    },
    async fetchQuizzes(context, lessonId) {
      const response = await axios.get("api/v1/get-quizzes", {
        params: { lessonId: lessonId },
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      context.commit("getQuizzes", response.data);
    },
    async fetchListCourseForAuthor(context, page) {
      const authorId = localStorage.getItem("ownerId");
      const response = await axios.get("api/v1/publish/list-course", {
        params: { page: page, authorId: authorId },
      });

      context.commit("getListCourseForLecture", response.data.body);
    },
    async fetchListCourseFoUser(context, page) {
      const userId = localStorage.getItem("ownerId");
      const response = await axios.get("api/v1/publish/list-course-enrolled", {
        params: { page: page, userId: userId },
      });

      context.commit("getListCourseForLecture", response.data.body);
    },

    async fetchListCourse(context, payload) {
      const response = await axios.get("api/v1/publish/list-course", {
        params: { page: payload.page,
          status: payload.status,
          startPrice: payload.startPrice,
          endPrice: payload.endPrice,
          authorId: payload.authorId,
          authorName: payload.authorName,
          categoryId: payload.categoryId},

          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },},);

      context.commit("getListCourse", response.data.body);
    },
     
  },
});
