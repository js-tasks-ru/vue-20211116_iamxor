<template>
    <div class="toasts">
        <ui-toast v-for="item in list" :key="item.id" :id="item.id" :message="item.message" :type="item.type" :delay="item.delay" :showClose="item.showClose" v-on:timeout="timeout" v-on:close="close" />
    </div>
</template>

<script>

import UiToast from './UiToast';

let toastId = 0;

export default {
  name: 'UiToastList',

  components: { UiToast },
  
  data() {
      return {
          list: new Set(),
        };
    },

  methods: {

    add(message, type, delay, showClose) {

        this.list.add({
            id: toastId,
            message: message,
            type: type,
            delay: delay,
            showClose: showClose
        });

        toastId++;
    },

    remove(id) {
        for (const item of this.list) if (item.id === id) { this.list.delete(item) };
    },

    timeout(id) {
        this.remove(id);
    },

    close(id)  {
        this.remove(id);
    },

  }  

};

</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>

