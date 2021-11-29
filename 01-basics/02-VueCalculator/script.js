import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const RootComponent = defineComponent({    
    name: 'Root',

    data() {
        return {
            operandA: 0,
            operandB: 0,
            operation: 'sum',
        };
    },

    computed: {
        expressionResult() {
            switch(this.operation) {
                case 'sum':
                    return this.operandA + this.operandB;
                case 'subtract':
                    return this.operandA - this.operandB;
                case 'multiply':
                    return this.operandA * this.operandB;
                case 'divide':
                    return this.operandA / this.operandB;
            }
        },
    },

});

const app = createApp(RootComponent);
const vm = app.mount('#app');