<template>
  <ui-input ref="uiInput" v-model="formattedValue" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import moment from 'moment';
import UiInput from './UiInput';

const dateTypeList = [
  'date',
  'time',
  'datetime-local',
  ];

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => dateTypeList.includes(value),
    },

    modelValue: {
      default: null,
    },
  },

  emits: ['change', 'update:modelValue'],

  computed: {
    
    dateFormat() {
      switch(this.type) {
        case 'time':
          const step = this.$attrs.step;
          
          console.log(step);

          if (step && +step % 60 !== 0) {
            return 'HH:mm:ss';
          }
          return 'HH:mm';          
          break;
        case 'datetime-local':
          return 'YYYY-MM-DDTHH:mm';
          break;
        default:
          return 'YYYY-MM-DD';
      }      
    },

    formattedValue: {
      get() {
        return moment(this.modelValue).utc().format(this.dateFormat);
      },
      set(value) {
        //parsing valueAsNumber
        const newVal = this.$refs.uiInput.$refs.input.valueAsNumber;
        this.$emit('update:modelValue', newVal);
      },
    },
  },
};
</script>