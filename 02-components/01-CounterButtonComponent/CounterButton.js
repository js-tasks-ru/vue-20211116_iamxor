import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    }
  },
  
  emits: ['update:count'],

  template: `<button type="button" @click="incrementCount">{{ count }}</button>`,

  methods: {
    incrementCount() {
      let newVal = this.count + 1;
      this.$emit('update:count', newVal);
    }
  }
});
