import { createRouter,createWebHistory } from "vue-router";

const routes = [
    {
        path:"/",
        component:() => import("../components/HomePage.vue"),
        name:"HomePage",
    },
    {
        path:"/quizz-page",
        component:() => import("../components/QuizzPage.vue"),
        name:"QuizzPage",
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router