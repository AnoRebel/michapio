<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { useChapio } from "@/stores/chapio";

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const router = useRouter();

const items = [
  {
    id: 1,
    name: "Text",
    description: "Add freeform text with basic formatting options.",
    url: "#",
    icon: "heroicons:pencil-square",
  },
  // More items...
];
const { recent, searched, selected } = storeToRefs(useChapio());
const query = ref("");
// const recent = ref([items[0]]);
// NOTE: For testing
searched.value = computed(() =>
  query.value === ""
    ? []
    : items.filter(item => {
        return item.name.toLowerCase().includes(query.value.toLowerCase());
      })
);

// const debouncedQuery = refDebounced(query, 700);
watch(query, () => {
  if (query.value === "") {
    return (searched.value = []);
  }
  // if (debounced && item != "") return debounced.cancel();
  debounced = _Debounce(
    async () => {
      const { data, error } = await supabase
        .from("michapio")
        .select()
        .textSearch("fts", query.value);
      if (error) {
        searched.value = [];
      } else {
        searched.value = data;
        recent.value = searched.value[0];
      }
    },
    450,
    { maxWait: 500 }
  );
});

let debounced;
const onSelect = item => {
  selected.value = item;
  recent.value = [item];
  emit("close");
  router.replace({ hash: `#${item.id}` });
};

onBeforeUnmount(() => {
  if (debounced) debounced.cancel();
});
</script>

<template>
  <TransitionRoot :show="open" as="template" appear @after-leave="query = ''">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-slate-700/25 transition-opacity" />
      </TransitionChild>

      <div class="fixed top-16 z-[70] w-full overflow-y-auto p-4 sm:p-6 md:inset-0 md:p-20">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="mx-auto max-w-xl transform divide-y divide-slate-500/10 overflow-hidden rounded-xl bg-white/80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all"
          >
            <Combobox @update:modelValue="onSelect">
              <div class="relative">
                <Icon
                  name="heroicons:magnifying-glass-solid"
                  class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-800/40"
                  aria-hidden="true"
                />
                <ComboboxInput
                  class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-slate-800 placeholder-slate-600 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  @change="query = $event.target.value"
                />
              </div>

              <ComboboxOptions
                v-if="query === '' || searched.length > 0"
                static
                class="max-h-96 scroll-py-3 overflow-y-auto"
              >
                <li class="p-2">
                  <h2
                    v-if="query === '' && recent.length > 0"
                    class="mb-2 mt-4 px-3 text-xs font-semibold text-slate-800"
                  >
                    Recent searches
                  </h2>
                  <ul class="">
                    <ComboboxOption
                      v-for="item in query === '' ? recent : searched"
                      :key="item.id"
                      v-slot="{ active }"
                      :value="item"
                      as="template"
                    >
                      <li
                        :class="[
                          'flex cursor-default select-none rounded-xl p-3',
                          active && 'bg-gray-100',
                        ]"
                      >
                        <div
                          class="flex h-10 w-10 flex-none items-center justify-center rounded-lg"
                        >
                          <nuxt-img
                            provider="dicebear"
                            class="h-full w-full rounded-lg object-contain"
                            src="ano.svg"
                            alt="user.user_metadata.username"
                            crossorigin="anonymous"
                            loading="lazy"
                          />
                        </div>
                        <div class="ml-4 flex-auto">
                          <p
                            :class="[
                              'text-sm font-medium',
                              active ? 'text-gray-900' : 'text-gray-700',
                            ]"
                          >
                            {{ item.name }}
                          </p>
                          <p :class="['text-sm', active ? 'text-gray-700' : 'text-gray-500']">
                            {{ item.description }}
                          </p>
                        </div>
                      </li>
                    </ComboboxOption>
                  </ul>
                </li>
              </ComboboxOptions>

              <div
                v-if="query !== '' && searched.length === 0"
                class="px-6 py-14 text-center text-sm sm:px-14"
              >
                <Icon
                  name="heroicons:exclamation-circle"
                  class="mx-auto h-6 w-6 text-slate-400/40"
                />
                <p class="mt-4 font-semibold text-slate-900">No michapio found</p>
                <p class="mt-2 text-slate-500">
                  No chapio found for this search term. Please try again.
                </p>
              </div>
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
