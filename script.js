"use strict";

const app = Vue.createApp({
    data() {
        return {
          isMenuOpen: false,
        };
      },
      computed: {
        iconClass() {
          return this.isMenuOpen ? 'fa-xmark' : 'fa-burger';
        },
      },
      methods: {
        toggleMenu() {
          this.isMenuOpen = !this.isMenuOpen;
          document.body.classList.toggle('menu-open', this.isMenuOpen);
        },
      },
    });

app.mount("#app");

