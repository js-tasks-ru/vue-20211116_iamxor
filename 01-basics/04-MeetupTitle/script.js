import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

function fetchMeetups() {
  return fetch(`${API_URL}/meetups`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const RootComponent = defineComponent({

    name: 'Root',

    data() {
        return {
          meetups: [],
          selectedMeetupId: 0,
          selectedMeetup: { title: 'Выберите встречу' },
        }
    },

    created() {

      fetchMeetups().then(data => {
        this.meetups = data;
        this.selectedMeetupId = this.meetups[0].id;
      });

    },

    watch: {
      selectedMeetupId: {
        immediate: true,
        handler() {
          if(this.selectedMeetupId !== 0) {
            fetchMeetupById(this.selectedMeetupId).then(data => {
              this.selectedMeetup = data;  
            });
          }
        },
      }
    }

});

const app = createApp(RootComponent);
const vm = app.mount('#app');