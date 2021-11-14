<template>
  <components
    :is="tagName"
    :class="classes"
    :disabled="disabled"
    v-bind="tagProps"
    @click="handleClickLink"
  >
    <icon
      v-if="loading"
      class="z-load-loop"
      scale="1.8"
      name="btn-loading"
    ></icon>
    <icon
      v-if="icon && !loading && !iconOnRight"
      :size="14"
      :name="icon"
    ></icon>
    <span v-if="showSlot" ref="slot"><slot></slot></span>
    <icon v-if="icon && !loading && iconOnRight" :size="14" :name="icon"></icon>
  </components>
</template>

<script>
import { oneOf } from "@/assets/js/tools";
import mixinsLink from "@/assets/js/link";

const prefixCls = "z-btn";

export default {
  name: "Btn",
  mixins: [mixinsLink],
  props: {
    theme: {
      type: String,
      validator(value) {
        return oneOf(value, [
          "gradient",
          "default",
          "primary",
          "info",
          "success",
          "warning",
          "error",
          "dashed",
          "text",
          "white",
          "assist",
        ]);
      },
      default: "default",
    },
    shape: {
      type: String,
      validator(value) {
        return oneOf(value, ["rect", "radius", "circle"]);
      },
      default: "radius",
    },
    size: {
      type: String,
      validator(value) {
        return oneOf(value, ["small", "large", "default"]);
      },
      default: "default",
    },
    long: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    iconOnRight: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    ghost: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showSlot: true,
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.theme}`,
        {
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-ghost`]: this.ghost,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-${this.size}`]: this.size !== "default",
          [`${prefixCls}-loading`]: this.loading != null && this.loading,
          [`${prefixCls}-icon-only`]:
            !this.showSlot && (!!this.icon || this.loading),
        },
      ];
    },
    isHrefPattern() {
      const { to } = this;
      return !!to;
    },
    tagName() {
      const { isHrefPattern } = this;
      return isHrefPattern ? "a" : "button";
    },
    tagProps() {
      const { isHrefPattern } = this;
      if (isHrefPattern) {
        const { linkUrl, target } = this;
        return { href: linkUrl, target };
      } else {
        const { htmlType } = this;
        return { type: htmlType };
      }
    },
  },
  mounted() {
    this.showSlot = this.$slots.default !== undefined;
  },
  methods: {
    handleClickLink(event) {
      this.$emit("click", event);
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/variables.less");
.z-btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 4px 15px 4px;
  font-size: 14px;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear, box-shadow 0.2s linear;
  color: #515a6e;
  background-color: #fff;
  border-color: #dcdee2;
  user-select: none;
  outline: none;
  line-height: 1.5;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: @colorPrimary;
    background-color: #fff;
    border-color: @colorPrimary;
  }
  &:active {
    filter: brightness(1.2);
  }
  &::before {
    position: absolute;
    top: -1px;
    left: -1px;
    bottom: -1px;
    right: -1px;
    background: #fff;
    opacity: 0.35;
    content: "";
    border-radius: inherit;
    z-index: 1;
    transition: opacity 0.2s;
    pointer-events: none;
    display: none;
  }

  > span {
    vertical-align: middle;
  }
  .z-icon {
    line-height: 1.5;
    vertical-align: middle;
  }
  .z-icon + span {
    margin-left: 4px;
  }

  &-icon-only {
    padding: 0 15px;
    font-size: 18px;
  }

  // long
  &-long {
    width: 100%;
  }

  // size
  &-large {
    padding: 6px 15px;
    font-size: 14px;
  }
  &-small {
    padding: 2px 8px;
    font-size: 12px;
  }
  &-icon-only&-small {
    padding: 2px 8px;
    font-size: 12px;
  }
  &-icon-only&-large {
    padding: 6px 15px;
    font-size: 14px;
  }
  & > a:only-child {
    color: currentColor;
  }

  // shape
  &-rect {
    border-radius: 0;
  }
  &-circle {
    border-radius: 1000px;
  }
  &-circle&-icon-only {
    width: 32px;
    height: 32px;
    padding: 0;
    font-size: 16px;
  }
  &-circle &-icon-only &-large {
    width: 36px;
    height: 36px;
    padding: 0;
    font-size: 16px;
  }
  &-circle&-icon-only&-large {
    width: 24px;
    height: 24px;
    padding: 0;
    font-size: 14px;
  }
  &-circle&-icon-only:not(a) > .z-icon {
    vertical-align: baseline;
  }

  &-radius {
    border-radius: 4px;
  }
  &-radius&-icon-only {
    border-radius: 4px;
  }
  &-radius&-large {
    border-radius: 3px;
  }
  &-radius&-small {
    border-radius: 4px;
  }
  &-radius&-icon-only&-large {
    border-radius: 4px;
  }
  &-radius&-icon-only&-small {
    border-radius: 3px;
  }

  // theme
  &-gradient {
    color: #fff;
    border-color: @colorPrimary;
    background: @color;
    opacity: 0.9;
    &:hover {
      color: #fff;
      background: @color;
      background-color: @colorPrimaryLight;
      opacity: 1;
    }
  }

  &-primary {
    color: #fff;
    background-color: @colorPrimary;
    border-color: @colorPrimary;
    &:hover {
      color: #fff;
      background-color: @colorPrimaryLight;
      border-color: @colorPrimaryLight;
    }
  }

  &-info {
    color: #fff;
    background-color: @colorInfo;
    border-color: @colorInfo;
    &:hover {
      color: #fff;
      background-color: @colorInfoLight;
      border-color: @colorInfoLight;
    }
  }

  &-success {
    color: #fff;
    background-color: @colorSuccess;
    border-color: @colorSuccess;
    &:hover {
      color: #fff;
      background-color: @colorSuccessLight;
      border-color: @colorSuccessLight;
    }
  }

  &-warning {
    color: #fff;
    background-color: @colorWarning;
    border-color: @colorWarning;
    &:hover {
      color: #fff;
      background-color: @colorWarningLight;
      border-color: @colorWarningLight;
    }
  }

  &-error {
    color: #fff;
    background-color: @colorError;
    border-color: @colorError;
    &:hover {
      color: #fff;
      background-color: @colorErrorLight;
      border-color: @colorErrorLight;
    }
  }

  &-assist {
    color: #fff;
    background-color: @colorAssist;
    border-color: @colorAssist;
    &:hover {
      color: #fff;
      background-color: @colorAssistLight;
      border-color: @colorAssistLight;
    }
  }

  // dashed
  &-dashed {
    color: #515a6e;
    background-color: #fff;
    border-color: #dcdee2;
    border-style: dashed;
  }

  // text
  &-text {
    color: #515a6e;
    background-color: transparent;
    border-color: transparent;
    &:hover {
      color: @colorPrimary;
      background-color: transparent;
      border-color: transparent;
    }
  }

  // white
  &-white {
    color: #ccc;
    background-color: transparent;
    border-color: transparent;
    &:hover {
      color: #fff;
      background-color: transparent;
      border-color: transparent;
    }
  }

  // ghost
  &-ghost&-dashed,
  &-ghost&-default {
    color: #fff;
    border-color: #fff;
    &:hover {
      color: @colorPrimary;
      border-color: @colorPrimary;
    }
  }
  &-ghost&-primary {
    color: @colorPrimary;
    &:hover {
      color: @colorPrimary;
      background: fade(@colorPrimary, 10%);
    }
  }
  &-ghost&-info {
    color: @colorInfo;
    &:hover {
      color: @colorInfo;
      background: fade(@colorInfo, 10%);
    }
  }
  &-ghost&-success {
    color: @colorSuccess;
    &:hover {
      color: @colorSuccess;
      background: fade(@colorSuccess, 10%);
    }
  }
  &-ghost&-warning {
    color: @colorWarning;
    &:hover {
      color: @colorWarning;
      background: fade(@colorWarning, 10%);
    }
  }
  &-ghost&-error {
    color: @colorError;
    &:hover {
      color: @colorError;
      background: fade(@colorError, 10%);
    }
  }
  &-ghost {
    color: #fff;
    background: 0 0;
    &:hover {
      background: 0 0;
    }
  }

  // disabled
  &-default[disabled],
  &-primary[disabled],
  &-primary[disabled].active,
  &-primary[disabled]:active,
  &-primary[disabled]:focus,
  &-primary[disabled]:hover,
  &-info[disabled],
  &-info[disabled].active,
  &-info[disabled]:active,
  &-info[disabled]:focus,
  &-info[disabled]:hover,
  &-success[disabled],
  &-success[disabled].active,
  &-success[disabled]:active,
  &-success[disabled]:focus,
  &-success[disabled]:hover,
  &-warning[disabled],
  &-warning[disabled].active,
  &-warning[disabled]:active,
  &-warning[disabled]:focus,
  &-warning[disabled]:hover,
  &-error[disabled],
  &-error[disabled].active,
  &-error[disabled]:active,
  &-error[disabled]:focus,
  &-error[disabled]:hover {
    color: #c5c8ce;
    background-color: #f7f7f7;
    border-color: #dcdee2;
  }

  // loading
  &&-loading {
    pointer-events: none;
    position: relative;
    &::before {
      display: block;
    }
  }
}
a[disabled] {
  color: #ccc;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
