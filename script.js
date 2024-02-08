"use strict";

const app = Vue.createApp({
    data() {
        return {
          isMenuOpen: false,
          /* liste de nos images (pour les changements dans les triangles) */
          images: [
            '/img/burger.jpg',
            '/img/frite.jpg',
            '/img/pizza.jpg',
            '/img/americainS.jpg',
            '/img/menu1.jpg',
            '/img/menu2.jpg',
            '/img/menu3.jpg',
            '/img/menu4.jpg',
            '/img/panini.jpg',
          ],
          /* on liste nos triangles avec un id et une class */
          triangles: [
            { id: 1, class: 'triangle1', alt: 'Triangle 1', image: '' },
            { id: 2, class: 'triangle2', alt: 'Triangle 2', image: '' },
            { id: 3, class: 'triangle3', alt: 'Triangle 3', image: '' },
            { id: 4, class: 'triangle4', alt: 'Triangle 4', image: '' },
            { id: 5, class: 'triangle5', alt: 'Triangle 5', image: '' },
          ],
        };
      },
      /* propriété de calcul */
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
        getRandomImage() {
          // on filtre nos images dispos avec filter qui crée un nouveau tableau contenant uniquement les images qui ne sont pas encore attribuées à un triangle spécifique, aisni une image sélectionnée alétoirement ne sera pas utilisé par 2 mêmes triangles. (some = vérifie si au moins un élément remplit la condition qui est entre ())
          const availableImages = this.images.filter(image => !this.triangles.some(triangle => triangle.image === image));

          // si pas d'image disponible on retourne un string vide
          if (availableImages.length === 0) return ''; 
          
          // sinon on retourne une image aléatoire parmis nos images dispos
          return availableImages[Math.floor(Math.random() * availableImages.length)];
        },
        updateTriangles() {
          // on met à jour les images des triangles en appelant notre fonction getRandomImage pour chacun
          this.triangles.forEach(triangle => {
            triangle.image = this.getRandomImage();
          });
        },
      },
      mounted() {
        // on met un interval de temps pour les changements d'images
        this.updateTriangles();
        setInterval(this.updateTriangles, 6000);
      },
    });

app.mount("#app");

