<script setup lang="ts">
import { h, provide, useSlots } from "#imports";

// Set props
type Position = "top" | "bottom";
const props = withDefaults(
  defineProps<{
    group: string;
    position: Position;
  }>(),
  {
    group: "",
    position: "top",
  }
);
// validator: (val: string) => ["top", "bottom"].includes(val),

provide("context", { group: props.group, position: props.position });

const slots = useSlots();

const render = () => {
  if (slots.default) {
    return h("div", slots.default({ group: props.group }));
  }

  return h("span", { title: "Something went wrong" });
};
</script>

<template>
  <render />
</template>
