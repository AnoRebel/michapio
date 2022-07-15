import { acceptHMRUpdate, defineStore } from "pinia";
import { useForms } from "@/stores/forms";

export const useModals = defineStore("modals", {
  state: () => ({
    open: false,
    active: "",
  }),
  actions: {
    toggleModal(modal: string) {
      this.open = false;
      this.active = modal;
      this.open = true;
    },
    setAuthState(val: boolean, form = undefined) {
      const forms = useForms();
      this.open = val;
      if (form === "register" || form === "login" || form === "forgot") {
        this.active = "auth";
      } else {
        this.active = form;
      }
      if (!val) this.active = undefined;
      if (form) forms.toggleForm(form);
    },
  },
  getters: {
    isOpen: state => state.open,
    activeModal: state => state.active,
    isActiveModal: state => {
      return (modal: string) => state.active === modal;
    },
  },
});

// Make sure to pass the right store definition, `useModals` in this case
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModals, import.meta.hot));
}
