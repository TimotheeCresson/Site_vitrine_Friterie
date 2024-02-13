"use strict";

const app = Vue.createApp({
    data() {
        return {
          /* Menu */
          isMenuOpen: false,
          /* Défilement menu */
          startX: 0,
          isDragging: false,
          animationFrameId: null,
          accumulatedDistance: 0,
          currentIndex: 0,
          translateValue: 0,
          translateValue: 0,
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
          
          imageSliders: [ 
          { id:1, image: './img/burger.jpg', caption: 'Salade, tomate, oignon', nameDish:'Sandwichs fricadelle/merguez/saucisses (knacki x2)', price: '4,00 €' },
          { id:2, image: './img/frite.jpg', caption: 'Salade, tomate, cheddar', nameDish:'Sandwichs brochettes/cervelas/mexicain/nuggets/steack + fromage (option SFB + 0,50 €)', price: '5,00 €' },
          { id:3, image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwichs crizly', price: '6,00 €' },
          { id:4,image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwichs kebab', price: '6,50 €' },
          { id:5, image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwichs savoyard', price: '7,00 €' },
          { id:6,image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwichs texan', price: '8,00 €' },
        ],
        
        imageSliders2: [
          { id:1, image: './img/pizza.jpg', caption: 'Salade, tomate, oignon', nameDish:'Sandwichs fricadelle/merguez/saucisses (knacki x2)', price: '4,00 €' },
          { id:2, image: './img/frite.jpg', caption: 'Salade, tomate, cheddar', nameDish:'Sandwichs brochettes/cervelas/mexicain/nuggets/steack + fromage (option SFB + 0,50 €)', price: '5,00 €' },
          { id:3, image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwichs crizly', price: '6,00 €' },
          { id:4,image: './img/burger.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwichs kebab', price: '6,50 €' },
          { id:5, image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwichs savoyard', price: '7,00 €' },
          { id:6,image: './img/burger.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwichs texan', price: '8,00 €' },
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
        startDrag(event) {
          document.querySelector('.slider-track').classList.add('dragging');
          const touch = event.touches ? event.touches[0] : event;
          this.startX = touch.clientX;
          this.isDragging = true;
          this.accumulatedDistance = 0;
          this.animationFrameId = requestAnimationFrame(() => this.animateDrag(event));
    
          const moveEvent = event.touches ? 'touchmove' : 'mousemove';
          const endEvent = event.touches ? 'touchend' : 'mouseup';
    
          window.addEventListener(moveEvent, this.drag);
          window.addEventListener(endEvent, this.endDrag);
        },
    
        drag(event) {
          const touch = event.touches ? event.touches[0] : event;
          if (this.isDragging) {
            const delta = touch.clientX - this.startX;
            this.accumulatedDistance += Math.abs(delta);
            this.translateValue += delta;
            this.startX = touch.clientX;
          }
        },
    
        endDrag(event) {
          if (this.isDragging) {
            document.querySelector('.slider-track').classList.remove('dragging');
            this.isDragging = false;
    
            const moveEvent = event.touches ? 'touchmove' : 'mousemove';
            const endEvent = event.touches ? 'touchend' : 'mouseup';
    
            window.removeEventListener(moveEvent, this.drag);
            window.removeEventListener(endEvent, this.endDrag);
            cancelAnimationFrame(this.animationFrameId);
    
            // Limitez le déplacement à gauche (vers la première image)
            if (this.translateValue > 0) {
                this.currentIndex = 0; // Force revenir à la première image
                this.translateValue = 0;
            }
            // Limitez le déplacement à droite (vers la dernière image)
            else if (this.translateValue < 0) {
                const maxIndex = this.imageSliders.length - 1;
                this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
                this.translateValue = Math.max(-maxIndex * 280, this.translateValue);
            }
    
            // Ajoutez ces conditions pour empêcher le glissement au-delà des limites
            if (this.currentIndex === 0) {
                this.translateValue = Math.max(0, this.translateValue);
            }
    
            if (this.currentIndex === this.imageSliders.length - 1) {
                this.translateValue = Math.min(0, this.translateValue);
            }
        }
        },
    
        animateDrag(event) {
          const touch = event.touches ? event.touches[0] : event;
          if (this.isDragging) {
            this.translateValue += (touch.clientX - this.startX) * 0.9;
            this.startX = touch.clientX;
            this.$forceUpdate();
            this.animationFrameId = requestAnimationFrame(() => this.animateDrag(event));
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

