import { acceptHMRUpdate, defineStore } from "pinia";

export const useForms = defineStore("forms", {
  state: () => ({
    user: "",
    token: "",
  }),
  actions: {
    async submitForm(form: String, data: Object) {
      console.log(form, data);
    },
    logout() {},
  },
  getters: {
    getUser: state => state.user,
    isLoggedIn: state => !!state.token,
  },
});

// Make sure to pass the right store definition, `useForms` in this case
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useForms, import.meta.hot));
}
