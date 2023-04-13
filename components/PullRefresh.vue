<template>
  <div ref="root" class="pull-refresh">
    <div
      class="pull-refresh__track"
      :style="trackStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <div :style="getHeadStyle" class="pull-refresh__head">
        <div v-if="TEXT_STATUS.includes(status)" class="pull-text">{{ getStatusText() }}</div>
        <div v-if="status === 'loading'" class="pull-text-loading">{{ loadingText }}</div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// const DEFAULT_HEAD_HEIGHT = 50;

const getScrollTop = (el: HTMLElement) => {
  const top = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top, 0);
};

function preventDefault(event: TouchEvent, isStopPropagation = false) {
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    event.preventDefault();
  }
  if (isStopPropagation) {
    event.stopPropagation();
  }
}

const props = defineProps({
  disabled: Boolean,
  successText: {
    type: String,
    default: "Refresh successful",
  },
  pullingText: {
    type: String,
    default: "Pull down to refresh...",
  },
  loosingText: {
    type: String,
    default: "Release to refresh...",
  },
  loadingText: {
    type: String,
    default: "Loading...",
  },
  pullDistance: {
    type: Number || String,
    default: 50,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  successDuration: {
    type: [Number, String],
    default: 500,
  },
  animationDuration: {
    type: [Number, String],
    default: 300,
  },
  headHeight: {
    type: Number || String,
    default: 50, // DEFAULT_HEAD_HEIGHT = 50
  },
});
const emit = defineEmits(["refresh", "update:modelValue"]);
const slots = useSlots();

let reachTop = false;
const TEXT_STATUS = ["pulling", "loosing", "success"];

const root = ref(null);
const scrollParent = useScrollParent(root);

const state = reactive({
  status: "normal",
  distance: 0,
  duration: 0,
});

const trackStyle = ref({});

const touch = useTouch();

const getHeadStyle = computed(() => {
  if (props.headHeight !== 50) {
    // DEFAULT_HEAD_HEIGHT = 50
    return {
      height: `${props.headHeight}px`,
    };
  }
  return {};
});

const isTouchable = () =>
  state.status !== "loading" && state.status !== "success" && !props.disabled;

const ease = (distance: number) => {
  const pullDistance = +(props.pullDistance || props.headHeight);

  if (distance > pullDistance) {
    if (distance < pullDistance * 2) {
      distance = pullDistance + (distance - pullDistance) / 2;
    } else {
      distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
    }
  }

  return Math.round(distance);
};

const setTrackStyle = () => {
  return {
    transitionDuration: `${state.duration}ms`,
    transform: state.distance ? `translate3d(0,${state.distance}px, 0)` : "",
  };
};

const setStatus = (distance: number, isLoading = false) => {
  const pullDistance = +(props.pullDistance || props.headHeight);
  state.distance = distance;

  if (isLoading) {
    state.status = "loading";
  } else if (distance === 0) {
    state.status = "normal";
  } else if (distance < pullDistance) {
    state.status = "pulling";
  } else {
    state.status = "loosing";
  }
  trackStyle.value = setTrackStyle();
};

const getStatusText = () => {
  const { status } = state;
  if (status === "normal") {
    return "";
  }
  return props[`${status}Text`] || "";
};

const showSuccessTip = () => {
  state.status = "success";

  setTimeout(() => {
    setStatus(0);
  }, +props.successDuration);
};

const checkPosition = (event: TouchEvent) => {
  reachTop = getScrollTop(scrollParent.value) === 0;

  if (reachTop) {
    state.duration = 0;
    touch.start(event);
  }
};

const onTouchStart = (event: TouchEvent) => {
  if (isTouchable()) {
    checkPosition(event);
  }
};

const onTouchMove = (event: TouchEvent) => {
  if (isTouchable()) {
    if (!reachTop) {
      checkPosition(event);
    }

    const { deltaY } = touch;
    touch.move(event);

    if (reachTop && deltaY.value >= 0 && touch.isVertical()) {
      preventDefault(event);
      setStatus(ease(deltaY.value));
    }
  }
};

const onTouchEnd = () => {
  if (reachTop && touch.deltaY.value && isTouchable()) {
    state.duration = +props.animationDuration;

    if (state.status === "loosing") {
      setStatus(+props.headHeight, true);
      emit("update:modelValue", true);

      // ensure value change can be watched
      nextTick(() => emit("refresh"));
    } else {
      setStatus(0);
    }
  }
};

watch(
  () => props.modelValue,
  value => {
    state.duration = +props.animationDuration;

    if (value) {
      setStatus(+props.headHeight, true);
    } else if (slots.success || props.successText) {
      showSuccessTip();
    } else {
      setStatus(0, false);
    }
  }
);

// const { status, distance, duration } = toRefs(state);
const { status } = toRefs(state);
</script>

<style lang="scss">
:root {
  --pull-refresh-head-height: 50px;
  --pull-refresh-head-font-size: 14px;
  --pull-refresh-head-text-color: #969696;
  --pull-refresh-loading-icon-size: 16px;
}

.pull-refresh {
  overflow: hidden;
  user-select: none;
  height: 100%;
}
.pull-refresh__track {
  position: relative;
  height: 100%;
  transition-property: transform;
}

.pull-refresh__head {
  position: absolute;
  left: 0;
  width: 100%;
  height: var(--pull-refresh-head-height);
  overflow: hidden;
  color: var(--pull-refresh-head-text-color);
  font-size: var(--pull-refresh-head-font-size);
  line-height: var(--pull-refresh-head-height);
  text-align: center;
  transform: translateY(-100%);
}
</style>
