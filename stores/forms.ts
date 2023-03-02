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
      const notify = useNotify();
      switch (form) {
        case "login":
          try {
            const accept = await auth.login(data as any);
            // console.log(accept);
            // const { data } = await $fetch("/api/auth/signin", { method: "POST", body: {} }).catch(error => error.data);
            notify(
              {
                group: "messages",
                type: "success",
                title: "Login",
                text: `${accept?.user?.user_metadata?.username} logged in.`,
              },
              4000
            );
            modals.setAuthState(false);
          } catch (error) {
            notify(
              {
                group: "errors",
                title: "Login",
                text: error.message,
              },
              4000
            );
          }
          break;
        case "register":
          try {
            const registered = await auth.register(data as any);
            // const { data } = await $fetch("/api/auth/signup", { method: "POST", body: {} }).catch(error => error.data);
            notify(
              {
                group: "messages",
                type: "success",
                title: "Register",
                text: `${registered?.user?.user_metadata?.username} registered succefully.`,
              },
              4000
            );
            modals.setAuthState(false);
          } catch (error) {
            notify(
              {
                group: "errors",
                title: "Register",
                text: error.message,
              },
              4000
            );
          }
          break;
        case "forgot":
          try {
            const resMail = await auth.resetEmail(data as any);
            // const { data } = await $fetch("/api/auth/forgot", { method: "POST", body: {} }).catch(error => error.data);
            modals.setAuthState(false);
          } catch (error) {
            notify(
              {
                group: "errors",
                title: "Recover",
                text: error.message,
              },
              4000
            );
          }
          break;
        case "add":
          try {
            // const { data: resp, error } = await client.from("michapio").insert(data).select();
            // const { data } = await $fetch("/api/c", { method: "POST", body: {} }).catch(error => error.data);
            modals.setAuthState(false);
          } catch (error) {
            notify(
              {
                group: "errors",
                title: "Michapio",
                text: error.message,
              },
              4000
            );
          }
          break;

        default:
          notify(
            {
              group: "messages",
              type: "info",
              title: "Michapio",
              text: "Fuck Off.! 👿",
            },
            4000
          );
          modals.setAuthState(false);
          break;
      }
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
