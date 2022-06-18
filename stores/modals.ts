import { acceptHMRUpdate, defineStore } from "pinia";

export const useModal = defineStore("modal", {
  // id: "modal",
  state: () => ({
    modals: { auth: false, chapio: false },
  }),
  actions: {
    addModal: (name: string, open = false) => (this.modals[name] = open),
    removeModal: (name: string) => delete this.modals[name],
    toggle: (name: string) => (this.modals[name] = !this.modals[name]),
    setState: (name: string, val: boolean) => {
      console.log("Setting: ", this);
      // this.modals[name] = val;
    },
  },
  getters: {
    // isOpen: state => state.open,
    isOpen: state => {
      return (name: string) => state.modals[name] ?? false;
    },
  },
});

// Make sure to pass the right store definition, `useModal` in this case
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModal, import.meta.hot));
}
