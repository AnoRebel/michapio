import { acceptHMRUpdate, defineStore } from "pinia";

export const useForm = defineStore("forms", {
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
  },
  getters: {
    chapioForm: state => state.chapio,
    loginForm: state => state.login,
    registerForm: state => state.register,
  },
});

// Make sure to pass the right store definition, `useModal` in this case
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useForm, import.meta.hot));
}
