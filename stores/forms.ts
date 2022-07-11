import { acceptHMRUpdate, defineStore } from "pinia";

export const useForms = defineStore("forms", {
  state: () => ({
    user: "",
    token: "",
    active: "login",
  }),
  actions: {
    async submitForm(form: String, data: Object) {
      console.log(form, data);
      // const { data } = await $fetch("/api/auth/login", { method: "POST", body: {} }).catch(error => error.data);
    },
    toggleForm(form: string) {
      this.active = form;
    },
    logout() {},
  },
  getters: {
    getUser: state => state.user,
    activeForm: state => state.active,
    isActiveForm: state => {
      return (form: string) => state.active === form;
    },
    isLoggedIn: state => !!state.token,
  },
});

// Make sure to pass the right store definition, `useForms` in this case
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useForms, import.meta.hot));
}
