import { acceptHMRUpdate, defineStore } from "pinia";

export const useChapio = defineStore("chapio", {
  state: () => ({
    open: false,
    active: "",
    selected: {},
    michapio: [],
    recent: [],
    searched: [],
  }),
  actions: {
    toggleChapio(chapio: Object) {
      this.open = false;
      this.active = chapio.id;
      this.selected = chapio;
      this.open = true;
    },
  },
  getters: {
    isOpen: state => state.open,
    activeChapio: state => state.active,
    selectedChapio: state => state.selected,
  },
});

// Make sure to pass the right store definition, `useChapio` in this case
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChapio, import.meta.hot));
}
