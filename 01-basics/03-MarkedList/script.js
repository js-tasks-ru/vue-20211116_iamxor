import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
];

const RootComponent = defineComponent({

    name: 'Root',

    data() {
        return {
          searchQuery: '',
          originEmails: emails.map((item) => ({
            email: item,
            highlighted: false,
          })),
        }
    },

    computed: {

      filteredEmails() {
        return this.originEmails.map((item) => ({
          email: item.email,
          highlighted: this.searchQuery && item.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        }));
      }

    }

});

const app = createApp(RootComponent);
const vm = app.mount('#app');