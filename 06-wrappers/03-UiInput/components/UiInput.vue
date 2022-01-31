<template>
  <div
    class="input-group" :class="inputClassList">

    <div v-if="iconLeft" class="input-group__icon">
      <slot name="left-icon" />
    </div>

    <component
      :is="tag"
      v-bind="$attrs"
      ref="input"
      :value="modelValue"
      class="form-control"
      :class="{ 'form-control_sm': small, 'form-control_rounded': rounded }"
      @[eventName]="updateEvent" />

    <div v-if="iconRight" class="input-group__icon">
      <slot name="right-icon" />
    </div>

  </div>
</template>

<script>

const classDefinitions = {
  any: 'input-group_icon',
  left: 'input-group_icon-left',
  right: 'input-group_icon-right',
};

export default {
  name: 'UiInput',
  
  inheritAttrs: false,

  props: {
    
    small: {
      type: Boolean,
      default: false,
    },

    rounded: {
      type: Boolean,
      default: false,
    },

    multiline: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: String,
    },

    modelModifiers: {
      default: () => ({}),
    },

  },

  emits: ['update:modelValue'],

  computed: {
    
    inputClassList() {
      const res = [];
      
      if(this.anyIcon) {
        res.push(classDefinitions['any']);
      }
      
      if(this.iconLeft) {
        res.push(classDefinitions['left']);
      }
      if(this.iconRight) {
        res.push(classDefinitions['right']);
      }

      return res;
    },
    
    tag() {
      return this.multiline ? 'textarea' : 'input';
    },

    anyIcon() {
      return this.iconLeft || this.iconRight;
    },

    iconLeft() {
      return !!this.$slots['left-icon'];
    },

    iconRight() {
      return !!this.$slots['right-icon'];
    },

    eventName() {
      return this.modelModifiers.lazy ? 'change' : 'input';
    },

  },

  expose: ['focus'],

  methods: {
    
    focus() {
      this.$refs.input.focus();
    },
    
    updateEvent($event) {
      this.$emit('update:modelValue', $event.target.value);
    },

  },

};
</script>


<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s border-color;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon-left .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon-right .form-control {
  padding-right: 50px;
}

.input-group.input-group_icon .input-group__icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .input-group__icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .input-group__icon:last-child {
  right: 16px;
}
</style>
