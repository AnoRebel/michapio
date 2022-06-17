import { acceptHMRUpdate, defineStore } from "pinia";

interface ModalState {
  open: boolean;
}

export const useModal = defineStore("modal", {
  // id: "modal",
  state: (): ModalState => {
    return {
      open: false,
    };
  },
  actions: {
    toggle: () => {},
    setOpen: val => (this.open = val),
  },
  getters: {
    isOpen: state => state.open,
    // isOpen: state => {
    //   return val => state.open == val;
    // },
  },
});

// Make sure to pass the right store definition, `useModal` in this case
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModal, import.meta.hot));
}
