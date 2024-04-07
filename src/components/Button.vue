<template>
  <button :class="computedClasses" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ButtonComp",
  props: {
    type: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "medium",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClasses() {
      return [
        "btn",
        `btn-${this.type}`,
        `btn-${this.size}`,
        { "btn-disabled": this.disabled },
      ];
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.btn {
  font-family: Arial, sans-serif;
  font-size: 16px;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
}

.btn-default {
  background-color: #f0f0f0;
  color: #333;
}

.btn-default:hover {
  background-color: #e0e0e0;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0069da;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5c646b;
}

.btn-small {
  font-size: 14px;
  padding: 8px 16px;
}

.btn-large {
  font-size: 18px;
  padding: 12px 24px;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
