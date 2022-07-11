import { acceptHMRUpdate, defineStore } from "pinia";

export const useForms = defineStore("forms", {
  state: () => ({
    chapio: {},
    login: {},
    register: {},
  }),
  actions: {
    updateChapio(payload: Object) {
      this.chapio[Object.keys(payload)[0]] = Object.values(payload)[0];
    },
    updateLogin(payload: Object) {
      this.login[Object.keys(payload)[0]] = Object.values(payload)[0];
    },
    updateRegister(payload: Object) {
      this.register[Object.keys(payload)[0]] = Object.values(payload)[0];
    },
    async submitForm(form: String, data: Object) {
      console.log(form, data);
    },
    logout() {},
  },
  getters: {
    chapioForm: state => state.chapio,
    loginForm: state => state.login,
    registerForm: state => state.register,
  },
});

// Make sure to pass the right store definition, `useForms` in this case
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useForms, import.meta.hot));
}
