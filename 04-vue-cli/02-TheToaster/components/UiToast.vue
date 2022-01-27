<template>
    <div class="toast" :class="toastClass">
        <ui-icon class="toast__icon" :icon="toastIcon" />        
        <span>{{ message }}</span>
        <ui-icon v-if="showClose" class="toast__close" icon="trash" @click="close" />
    </div>
</template>

<script>

import UiIcon from './UiIcon';

let timer = null;

const icons = {
  success: 'check-circle',
  error: 'alert-circle',
};

const classes = {
  success: 'toast toast_success',
  error: 'toast toast_error',
};

export default {
  name: 'UiToast',

  components: { UiIcon },

  emits: ['timeout', 'close'],

  props: {
    
    id: {
      type: Number,
      required: true,
    },

    message: {
      type: String,
      require: true,
    },

    type: {
      type: String,
      required: true,
    },

    delay: {
      type: Number,
      default: 3000
    },

    showClose: {
      type: Boolean,
      default: false
    },

  },

  computed: {
    
    toastIcon() {
      return icons[this.type];
    },
    
    toastClass() {
      return classes[this.type];
    },

  },

  methods: {

      close() {
          clearTimeout(timer);
          this.$emit('close', this.id);
      }

  },

   created: function() {
       if(this.delay > 0) {
           timer = setTimeout(() => {
               this.$emit('timeout', this.id);
            }, this.delay);
        }
   }

};

</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
  position: relative;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast__close {
  position: absolute;
  right: -12px;
  top: -12px;
  width: 25px;
  height: 25px;
  padding: 2px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 25px;
  cursor:pointer; 
  cursor:hand;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

</style>

