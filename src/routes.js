import {createWebHistory,createRouter} from 'vue-router'
import StudentAttendance from "@/components/Home/StudentAttendance.vue";
import UserList from "@/components/Home/UserList.vue";
import StudentList from "@/components/Home/StudentList.vue";

const routes = [
    {
        path: '/student-attendance',
        name: 'StudentAttendance',
        component: StudentAttendance
    },
    {
        path: '/user-list',
        name: 'UserList',
        component: UserList
    },
    {
        path: '/student-list',
        name: 'StudentList',
        component: StudentList
    }
    ];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;