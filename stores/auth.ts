import { acceptHMRUpdate, defineStore } from "pinia";

export const useAuth = defineStore("auth", () => {
  state: () => ({
    user: {},
    token: "",
  }),
  actions: {
    setUser(user: Object) {
      this.user = user;
    },
    removeUser() {
      this.user = {};
    },
    setToken(token: String) {
      this.token = token;
    },
    removeToken() {
      this.token = "";
    },
    logout() {
      this.user = {};
      this.token = "";
    },
  },
  getters: {
    getUser: state => state.user,
    isLoggedIn: state => !!state.token,
  },
});

// Make sure to pass the right store definition, `useAuth` in this case
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
