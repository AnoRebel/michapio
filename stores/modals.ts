import { acceptHMRUpdate, defineStore } from "pinia";

export const useModals = defineStore("modals", {
  state: () => ({
    add: false,
    auth: false,
    chapio: false,
  }),
  actions: {
    toggleAuth() {
      this.auth = !this.auth;
    },
    toggleAdd() {
      this.add = !this.add;
    },
    toggleChapio() {
      this.chapio = !this.chapio;
    },
    setAuthState(val: boolean) {
      this.auth = val;
    },
    setAddState(val: boolean) {
      this.add = val;
    },
    setChapioState(val: boolean) {
      this.chapio = val;
    },
  },
  getters: {
    isAuthOpen: state => state.auth,
    isAddOpen: state => state.add,
    isChapiopen: state => state.chapio,
  },
});

// Make sure to pass the right store definition, `useModals` in this case
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModals, import.meta.hot));
}
