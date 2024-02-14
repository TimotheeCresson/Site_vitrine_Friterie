"use strict";

const app = Vue.createApp({
    data() {
        return {
          /* Menu */
          isMenuOpen: false,
          /* Défilement menu */
          startX: 0,
  
          animationFrameId: null,
          accumulatedDistance: 0,
          translateValue1: 0,
          translateValue2: 0,
          translateValue3: 0,
          translateValue4: 0,
          currentIndex1: 0,
          currentIndex2: 0,
          currentIndex3: 0,
          currentIndex4: 0,
          isDragging1: false,
          isDragging2: false,
          isDragging3: false,
          isDragging4: false,
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
          
          imageSliders1: [ 
          { id:1, image: './img/burger.jpg', caption: 'Salade, tomate, oignon', nameDish:'Sandwichs fricadelle/merguez/saucisses (knacki x2)', price: '4,00 €' },
          { id:2, image: './img/frite.jpg', caption: 'Salade, tomate, cheddar', nameDish:'Sandwichs brochettes/cervelas/mexicain/nuggets/steack + fromage (option SFB + 0,50 €)', price: '5,00 €' },
          { id:3, image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwichs crizly', price: '6,00 €' },
          { id:4,image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwichs kebab', price: '6,50 €' },
          { id:5, image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwichs savoyard', price: '7,00 €' },
          { id:6,image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwichs texan', price: '8,00 €' },
        ],
        
        imageSliders2: [
          { id:1, image: './img/pizza.jpg', caption: 'Salade, tomate, oignon', nameDish:'Américains fricadelle/jambon/saucisses (knacki x2)', price: '6,50 €' },
          { id:2, image: './img/frite.jpg', caption: 'Salade, tomate, cheddar', nameDish:'Américains nuggets/poulet/merguez/thon/fromage/crabe/cervelas', price: '7,00 €' },
          { id:3, image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Américains cervelas/mexicanos/brochette/filet américain/steack + fromage (option SFB + 0,50 €)', price: '8,50 €' },
          { id:4,image: './img/burger.jpg', caption: 'salade, tomate, steack', nameDish:'Américains grizli', price: '9,00 €' },
          { id:5, image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Américains savoyard/montagnard (+ 1,00 €)', price: '7,00 €' },
          { id:6,image: './img/burger.jpg', caption: 'salade, tomate, steack', nameDish:`Américains texan/ch'ti`, price: '10,50 €' },
        ],


        imageSliders3: [
          { id:1, image: './img/pizza.jpg', caption: 'Salade, tomate, oignon', nameDish:'Pizza 4 fromages', price: 'petite: 7,00 € grande: 9,00 €' },
          { id:2, image: './img/frite.jpg', caption: 'Salade, tomate, cheddar', nameDish:'Pizza jambon-fromage', price: 'petite: 7,00 € grande: 9,00 €' },
          { id:3, image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Pizza jambon-oignons', price: 'petite: 7,00 € grande: 9,00 €' },
          { id:4,image: './img/burger.jpg', caption: 'salade, tomate, steack', nameDish:'Pizza chorizo', price: 'petite: 7,00 € grande: 9,00 €' },
          { id:5, image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Pizza jambon-champignons', price: 'petite: 7,00 € grande: 9,60 €' },
          { id:6,image: './img/burger.jpg', caption: 'salade, tomate, steack', nameDish:`Pizza fruits de mer`, price: 'petite: 7,00 € grande: 9,60 €' },
          { id:7,image: './img/burger.jpg', caption: 'salade, tomate, steack', nameDish:`Pizza jambon-anchois`, price: 'petite: 7,00 € grande: 9,60 €' },
        ],

        imageSliders4: [
          { id:1, image: './img/pizza.jpg', caption: 'mozzarella + tomates', nameDish:'Panini classique', price: '4,50 €' },
          { id:2, image: './img/frite.jpg', caption: 'mozzarella + tomates + jambon + emmental', nameDish:'Panini jambon-fromage', price: '5,50 €' },
          { id:3, image: './img/pizza.jpg', caption: 'mozzarella + tomates + raclette', nameDish:'Panini raclette', price: '5,50 €' },
          { id:4,image: './img/burger.jpg', caption: 'mozzarella + tomates + chèvre + mimolette', nameDish:'Panini 3 fromages', price: '5,50 €' },
          { id:5, image: './img/pizza.jpg', caption: 'mozzarella + tomates + mimolette + emmental + saucisse', nameDish:'Panini savoyard', price: '5,50 €' },
          { id:6,image: './img/burger.jpg', caption: 'mozzarella + tomates + mimolette + emmental + steack', nameDish:`Panini montagnard`, price: '5,50 €' },
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


        startDrag(event, sliderNumber) {
    const isDraggingKey = `isDragging${sliderNumber}`;

    const sliderTrackSelector = `.slider-track${sliderNumber}`;
    console.log('Slider Track Selector:', sliderTrackSelector);
    const sliderTrack = document.querySelector(sliderTrackSelector);
    if (sliderTrack) {
      sliderTrack.classList.add('dragging');
    }
    // on vérifie si l'événement est un événement tactile et si c'est le cas on récupère le premier point de contact sinon on utilise l'événement event
    const touch = event.touches ? event.touches[0] : event;
    // on enregistre les coordonnées du point de contact pour suivre l'avancement dans le slider
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    
    // on met à jour notre propriété isDragging pour dire que le défilement est en cours
    this.$data[isDraggingKey] = true;
    this.accumulatedDistance = 0;

    // planifie l'exécution de la fonction animateDrag lors du prochain rafraîchissement de l'écran pour une animation plus fluide
    this.animationFrameId = requestAnimationFrame(() => this.animateDrag(event, sliderNumber));

    // on définie les noms des événements de défilement si on est en tactile ou souris
    const moveEvent = event.touches ? 'touchmove' : 'mousemove';
    const endEvent = event.touches ? 'touchend' : 'mouseup';

    // on ajoute des écouteurs d'événements de déplacement, de fin de glissement et de défilement vertical à la fenêtre.
    // window.addEventListener(moveEvent, (e) => this.drag(e, sliderNumber), { passive: false });
    // window.addEventListener(endEvent, (e) => this.endDrag(e, sliderNumber), { passive: false });
    // window.addEventListener('touchmove', this.handleVerticalScroll, { passive: false });
        },
        
        handleVerticalScroll(event) {
          // on calcule les distances horizontales et verticales parcourues pendant le défilement
          const touch = event.touches ? event.touches[0] : event;
          //Math.abs (mesure la distance entre deux points sur une échelle numérique, indépendamment de la direction pour toujours avoir une distance positive)
          // on calcule la différence absolue entre  entre la coordonnée horizontale actuelle du point de contact et la coordonnée horizontale initiale pour avoir la distance horizontal parcourue depuis le début
          const deltaX = Math.abs(touch.clientX - this.startX);
          const deltaY = Math.abs(touch.clientY - this.startY);
        
          // Autoriser le défilement vertical si le mouvement est principalement vertical
          if (deltaY > deltaX) {
            // Empêcher la propagation de l'événement au-delà du slider
            console.log('Vertical scroll detected inside the slider. Stopping event propagation.');
            event.stopPropagation();
            return;
          }
        
        },
        
        drag(event, sliderNumber) {
          const touch = event.touches ? event.touches[0] : event;
          const sliderKey = `translateValue${sliderNumber}`;
          const isDraggingKey = `isDragging${sliderNumber}`;
        
          // on calcule les variations horizontales et verticales pendant le glissement.
          const deltaX = touch.clientX - this.startX;
          const deltaY = touch.clientY - this.startY;
        
          // Si le mouvement est principalement vertical, laisser le navigateur gérer le défilement
          if (Math.abs(deltaY) > Math.abs(deltaX)) {
            console.log('Vertical scroll detected. Allowing browser to handle scrolling.');
            return;
          }
        
          //Si le glissement est en cours (isDraggingKey est vrai), les propriétés du slider sont mises à jour en fonction du mouvement horizontal.
          if (this.$data[isDraggingKey]) {
            this.accumulatedDistance += Math.abs(deltaX);
            this.$data[sliderKey] += deltaX;
            this.startX = touch.clientX;
            this.startY = touch.clientY;
          }
        },
        
        endDrag(event, sliderNumber) {
          const sliderKey = `translateValue${sliderNumber}`;
          const currentIndexKey = `currentIndex${sliderNumber}`;
          const isDraggingKey = `isDragging${sliderNumber}`;
        
          // Si le glissement est en cours, la classe 'dragging' est retirée du slider et l'état de glissement est réinitialisé.
          if (this.$data[isDraggingKey]) {
            document.querySelector(`.slider-track${sliderNumber}`).classList.remove('dragging');
            this.$data[isDraggingKey] = false;
        
            const moveEvent = event.touches ? 'touchmove' : 'mousemove';
            const endEvent = event.touches ? 'touchend' : 'mouseup';
        
            // on retire les événements
            window.removeEventListener(moveEvent, (e) => this.drag(e, sliderNumber));
            window.removeEventListener(endEvent, (e) => this.endDrag(e, sliderNumber));
            window.removeEventListener('touchmove', this.handleVerticalScroll);
            cancelAnimationFrame(this.animationFrameId);
        
            // Limitez le déplacement à gauche (vers la première image)
            if (this.$data[sliderKey] > 0) {
              this.$data[currentIndexKey] = 0;
              this.$data[sliderKey] = 0;
            }
            // Limitez le déplacement à droite (vers la dernière image)
            else if (this.$data[sliderKey] < 0) {
              const maxIndex = this[`imageSliders${sliderNumber}`].length - 1;
              this.$data[currentIndexKey] = Math.min(maxIndex, this.$data[currentIndexKey] + 1);
              this.$data[sliderKey] = Math.max(-maxIndex * 280, this.$data[sliderKey]);
            }
        
            // Ajoutez ces conditions pour empêcher le glissement au-delà des limites
            if (this.$data[currentIndexKey] === 0) {
              this.$data[sliderKey] = Math.max(0, this.$data[sliderKey]);
            }
        
            if (this.$data[currentIndexKey] === this[`imageSliders${sliderNumber}`].length - 1) {
              this.$data[sliderKey] = Math.min(0, this.$data[sliderKey]);
            }
          }
        },
        
      
        animateDrag(event, sliderNumber) {
          // on récupére les coordonnées et les clés nécessaires.
          const touch = event.touches ? event.touches[0] : event;
          const sliderKey = `translateValue${sliderNumber}`;
          const isDraggingKey = `isDragging${sliderNumber}`;

          //Si le glissement est en cours, la position du slider est ajustée pendant l'animation avec une diminution de vitesse, et rendre l'animation plus fluide.
          if (this.$data[isDraggingKey]) {
            this.$data[sliderKey] += (touch.clientX - this.startX) * 0.9;
          this.startX = touch.clientX;
            this.animationFrameId = requestAnimationFrame(() => this.animateDrag(event, sliderNumber));
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

