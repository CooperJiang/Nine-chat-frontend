<template>
	<div v-if="isExternal" :style="{ styleExternalIcon }" class="svg-external-icon svg-icon" v-on="$listeners"></div>
	<svg v-else :class="svgClass" :style="{ fontSize }" aria-hidden="true" v-on="$listeners">
		<use :xlink:href="iconName" />
	</svg>
</template>

<script>
import { isExternal } from "@/utils/validate";

export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
    scale: {
      type: String,
      default: '1',
    },
  },
  computed: {
    isExternal() {
      return isExternal(this.name);
    },
    iconName() {
      return `#icon-${this.name}`;
    },
    svgClass() {
      if (this.className) {
        return `svg-icon ${  this.className}`;
      }
      return "svg-icon";
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.name}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.name}) no-repeat 50% 50%`,
        fontSize: this.fontSize,
      };
    },
    fontSize() {
      return `${Number(this.scale) * 8  }px`;
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1.1em;
  height: 1.1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
