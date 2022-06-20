import { acceptHMRUpdate, defineStore } from "pinia";

export const useModal = defineStore("modal", {
  state: () => ({
    auth: false,
    chapio: false,
  }),
  actions: {
    toggleAuth() {
      this.auth = !this.auth;
    },
    setAuthState(val: boolean) {
      this.auth = val;
    },
  },
  getters: {
    isAuthOpen: state => state.auth,
  },
});

// Make sure to pass the right store definition, `useModal` in this case
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModal, import.meta.hot));
}
