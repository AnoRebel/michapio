import { acceptHMRUpdate, defineStore } from "pinia";
import { useModals } from "@/stores/modals";
// import { useAuth } from "@/stores/auth";

export const useForms = defineStore("forms", {
  state: () => ({
    active: "login",
  }),
  actions: {
    async submitForm(form: String, data: Object) {
      const auth = useAuth();
      const client = useSupabaseClient();
      const modals = useModals();
      console.log(form, data);
      switch (form) {
        case "login":
          await auth.login(data);
          // const { data } = await $fetch("/api/auth/signin", { method: "POST", body: {} }).catch(error => error.data);
          break;
        case "register":
          await auth.register(data);
          // const { data } = await $fetch("/api/auth/signup", { method: "POST", body: {} }).catch(error => error.data);
          break;
        case "forgot":
          await auth.resetEmail(data);
          // const { data } = await $fetch("/api/auth/forgot", { method: "POST", body: {} }).catch(error => error.data);
          break;
        case "add":
          // const { data } = await $fetch("/api/c", { method: "POST", body: {} }).catch(error => error.data);
          const { data, error } = await client.from("michapio").insert(data).select();
          break;

        default:
          break;
      }
      modals.setAuthState(false);
    },
    toggleForm(form: string) {
      this.active = form;
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
