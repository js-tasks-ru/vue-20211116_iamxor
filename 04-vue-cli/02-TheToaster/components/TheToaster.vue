<template>
  <ui-toast-list ref="toasts"/>
</template>

<script>

import UiToastList from './UiToastList.vue';

const defaultDelay = 5000;

export default {

  name: 'TheToaster',

  components: { UiToastList },  

  methods: {
    success(message) {
      this.$refs.toasts.add(message, 'success', defaultDelay, true);
    },
    error(message) {
      this.$refs.toasts.add(message, 'error', defaultDelay, false);
    },
  }

};

</script>

<style scoped></style>