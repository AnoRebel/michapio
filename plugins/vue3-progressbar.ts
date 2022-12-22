import VueProgressBar from "@aacassandra/vue3-progressbar";

const options = {
  color: "#bffaf3",
  failedColor: "#874b4b",
  thickness: "10px",
  transition: {
    speed: "0.2s",
    opactiy: "0.7s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueProgressBar, options);
});
