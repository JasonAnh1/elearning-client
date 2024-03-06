import Vue from "vue"
import Router from 'vue-router'
import LectureStudio from './components/LectureStudio.vue'
import HomeContent from './components/HomeContent.vue'
import DetailCourseStudio from "./components/DetailCourseStudio.vue"
import CreateLesson from "./components/CreateLesson.vue"
Vue.use(Router)

export default new Router({ 
    routes: [
        { path: '/', component: HomeContent },
        { path: '/LectureStudio', component: LectureStudio },
        { path: '/DetailCourseStudio', component: DetailCourseStudio },
        { path: '/CreateLesson', component: CreateLesson },
    ]
})