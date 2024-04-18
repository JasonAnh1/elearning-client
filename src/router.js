import Vue from "vue"
import Router from 'vue-router'
import LectureStudio from './components/LectureStudio.vue'
import HomeContent from './components/HomeContent.vue'
import DetailCourseStudio from "./components/DetailCourseStudio.vue"
import CreateLesson from "./components/CreateLesson.vue"
import LessonPage from "./components/LessonPage.vue"
import CreateQuizzes from "./components/CreateQuizzes.vue"
import QuizzPage from "./components/QuizzPage.vue"
import CartPage from "./components/CartPage.vue"
import LearnerPage from "./components/LearnerPage.vue"
import AfterPayment from "./components/AfterPayment.vue"
import CourseTable from "./components/admin/CourseTable.vue"
import RevenueChart from "./components/admin/RevenueChart.vue"
import UpdateQuizzes from "./components/admin/UpdateQuizzes.vue"
import DetailCourse from "./components/DetailCourse.vue"
import LessonStudio from "./components/admin/LessonStudio.vue"
import ChatPage from "./components/chat/ChatPage.vue"
import LearnerChatPage from "./components/chat/LearnerChatPage.vue"
import ViewBook from "@/components/book/ViewBook";
Vue.use(Router)

export default new Router({ 
    routes: [
        { path: '/', component: HomeContent },
        { path: '/LectureStudio', component: LectureStudio },
        { path: '/DetailCourseStudio', component: DetailCourseStudio },
        { path: '/CreateLesson', component: CreateLesson },
        { path: '/LessonPage', component: LessonPage },
        { path: '/CreateQuizzes', component: CreateQuizzes },
        { path: '/QuizzPage', component: QuizzPage }, 
        { path: '/CartPage', component:CartPage},
        { path: '/LearnerPage', component:LearnerPage},
        { path: '/AfterPayment', component:AfterPayment},
        { path: '/CourseTable', component:CourseTable},
        { path: '/RevenueChart', component:RevenueChart},
        { path: '/UpdateQuizzes', component:UpdateQuizzes},
        { path: '/DetailCourse', component: DetailCourse},
        { path: '/LessonStudio', component: LessonStudio},
        { path: '/ChatPage', component: ChatPage},
        { path: '/LearnerChatPage', component: LearnerChatPage},
        { path: '/ViewBook', component: ViewBook}
    ]
})