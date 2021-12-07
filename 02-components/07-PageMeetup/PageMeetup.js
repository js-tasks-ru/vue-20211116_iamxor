import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById, fetchStateEnum } from './meetupService.js';
import MeetupView from './MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  data() {
    return {
      meetup: null,
      fetchState: null,
      errorMessage: null,
      fetchStateEnum,
    }
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  methods: {
    fetchMeetup() {

      if (!this.meetupId)
        return;

      this.fetchState = fetchStateEnum.busy;

      fetchMeetupById(this.meetupId).then(

        meetup => { 
          this.fetchState = fetchStateEnum.success;
          this.meetup = meetup; 
        },

        error => { 
          this.fetchState = fetchStateEnum.error;
          this.errorMessage = error.message;
        }

      );

    }
  },

  watch: {

    meetupId: {
      immediate: true,
      handler() {
        this.fetchMeetup();
      },
    },
      
  },

  template: `
    <div class="page-meetup">      
      <template v-if="fetchState === fetchStateEnum.success">
        <meetup-view :meetup="meetup"/>
      </template>
      <ui-container v-else-if="fetchState === fetchStateEnum.error">
        <ui-alert>
          {{ errorMessage }}
        </ui-alert>
      </ui-container>
      <ui-container v-else>
        <ui-alert>
          Загрузка...
        </ui-alert>
      </ui-container>
    </div>
  `,
});
