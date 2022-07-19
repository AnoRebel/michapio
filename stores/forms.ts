import { acceptHMRUpdate, defineStore } from "pinia";
import { useModals } from "@/stores/modals";
import { useAuth } from "@/stores/auth";

export const useForms = defineStore("forms", {
  state: () => ({
    active: "login",
  }),
  actions: {
    async submitForm(form: String, data: Object) {
      const auth = useAuth();
      const modals = useModals();
      console.log(form, data);
      switch (form) {
        case "login":
          // const { data } = await $fetch("/api/auth/signin", { method: "POST", body: {} }).catch(error => error.data);
          break;
        case "register":
          // const { data } = await $fetch("/api/auth/signup", { method: "POST", body: {} }).catch(error => error.data);
          break;
        case "forgot":
          // const { data } = await $fetch("/api/auth/forgot", { method: "POST", body: {} }).catch(error => error.data);
          break;
        case "add":
          // const { data } = await $fetch("/api/c", { method: "POST", body: {} }).catch(error => error.data);
          break;

        default:
          break;
      }
      modals.setAuthState(false);
    },
    toggleForm(form: string) {
      this.active = form;
    },
    async logout() {
      const { data } = await $fetch("/api/auth/signout", {
        method: "POST",
        body: { id: this.user.id },
      }).catch(error => error.data);
      return data;
    },
  },
  getters: {
    activeForm: state => state.active,
    isActiveForm: state => {
      return (form: string) => state.active === form;
    },
  },
});

// Make sure to pass the right store definition, `useForms` in this case
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useForms, import.meta.hot));
}
