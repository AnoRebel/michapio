import { DefaultConfigOptions } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";
// import { genesisIcons } from "@formkit/icons";
import genesis from "@formkit/themes/tailwindcss/genesis";
import { createAutoAnimatePlugin, createFloatingLabelsPlugin } from "@formkit/addons";
import "@formkit/addons/css/floatingLabels";

const config: DefaultConfigOptions = {
  // icons: {
  //   ...genesisIcons,
  // },
  config: {
    classes: generateClasses(genesis),
  },
  plugins: [
    createAutoAnimatePlugin(),
    createFloatingLabelsPlugin({
      useAsDefault: true, // defaults to false
    }),
  ],
};

export default config;
