"use strict";

const app = Vue.createApp({
    data() {
        return {
          startX: 0,
          isDragging: false,
          isMenuOpen: false,
          halfWindowWidth: window.innerWidth / 2,
          animationFrameId: null,
          accumulatedDistance: 0,
          isInsideDiv: false,
          mouseButtonPressed: false,
          /* liste de nos images (pour les changements dans les triangles) */
          images: [
            './img/burger.jpg',
            './img/frite.jpg',
            './img/pizza.jpg',
            './img/americainS.jpg',
            './img/menu1.jpg',
            './img/menu2.jpg',
            './img/menu3.jpg',
            './img/menu4.jpg',
            './img/panini.jpg',
          ],
            /* on liste nos triangles avec un id et une class */
          triangles: [
            { id: 1, class: 'triangle1', alt: 'Triangle 1', image: '' },
            { id: 2, class: 'triangle2', alt: 'Triangle 2', image: '' },
            { id: 3, class: 'triangle3', alt: 'Triangle 3', image: '' },
            { id: 4, class: 'triangle4', alt: 'Triangle 4', image: '' },
            { id: 5, class: 'triangle5', alt: 'Triangle 5', image: '' },
          ],
          currentIndex: 0,
          translateValue: 0,
          imageSliders: [ { image: './img/burger.jpg', caption: 'Salade, tomate, oignon' },
          { image: './img/frite.jpg', caption: 'Salade, tomate, cheddar' },
          { image: './img/pizza.jpg', caption: 'salade, tomate, steack' },
          { image: './img/pizza.jpg', caption: 'salade, tomate, steack' },
          { image: './img/pizza.jpg', caption: 'salade, tomate, steack' },
          { image: './img/pizza.jpg', caption: 'salade, tomate, steack' },
          { image: './img/pizza.jpg', caption: 'salade, tomate, steack' },
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
          /* On cible notre élément html */
          document.documentElement.classList.toggle('menu-open', this.isMenuOpen);
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
        scrollToSection(sectionId) {
          // on va récupéré l'id de la section spécifié dans notre html
          const targetElement = document.getElementById(sectionId);
          // si on a un id vérifié alors :
          if (targetElement) {
            //window.scrollTo pour faire défiler la page jusqu'à une position spécifique
            window.scrollTo({
              // on prend la distance de l'élément jusqu'au haut de la page - la hauteur de l'élément header
              top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
              // défilement fluide
              behavior: 'smooth',
            });
            document.documentElement.classList.remove('menu-open');
            // on le met à false pour que Vue considère notre menu fermé pour la réactivité de ce dernier
            this.isMenuOpen = false;
          }
        },
        nextSlide() {
          if (this.currentIndex < this.images.length - 1) {
              this.currentIndex++;
              this.updateSlider();
          } else {
              // Facultatif : Si vous voulez revenir à la première image lorsque vous êtes à la dernière
              this.currentIndex = 0;
              this.updateSlider();
          }
      },
      prevSlide() {
          if (this.currentIndex > 0) {
              this.currentIndex--;
              this.updateSlider();
          }
      },
      updateSlider() {
          this.translateValue = -this.currentIndex * 80 + '%';
      },
      startDrag(event) {
        this.startX = event.clientX;
        this.isDragging = true;
        this.accumulatedDistance = 0;
        this.animationFrameId = requestAnimationFrame(this.animateDrag); // Utiliser requestAnimationFrame
        window.addEventListener('mousemove', this.drag);
    },
    drag(event) {
        if (this.isDragging) {
            const delta = event.clientX - this.startX;
            this.accumulatedDistance += Math.abs(delta);
            this.translateValue += delta;
            this.startX = event.clientX;
        }
    },
    endDrag() {
        if (this.isDragging) {
            this.isDragging = false;
            window.removeEventListener('mousemove', this.drag);
            cancelAnimationFrame(this.animationFrameId); // Annuler l'animation frame
            const minDistanceToChangeImage = 50;
            if (this.accumulatedDistance > minDistanceToChangeImage) {
                if (this.translateValue > 0) {
                    this.currentIndex = Math.max(0, this.currentIndex - 1);
                } else {
                    this.currentIndex = Math.min(this.imageSliders.length - 1, this.currentIndex + 1);
                }
            } else {
                this.translateValue = 0;
            }
        }
    },
    animateDrag() {
        if (this.isDragging) {
            this.$forceUpdate(); // Forcer la mise à jour de la vue
            this.animationFrameId = requestAnimationFrame(this.animateDrag);
        }
    },

      },

      mounted() {
        // on met un interval de temps pour les changements d'images
        this.updateTriangles();
        setInterval(this.updateTriangles, 6000);
      },
    });

app.mount("#app");

