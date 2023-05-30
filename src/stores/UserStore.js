import {defineStore} from "pinia";

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        userName: '',
    }),
    actions: {
        setUserName(name) {
            this.userName = name;
        },
    },
    getters: {
        getUserName() {
            return this.userName;
        }
    }
});