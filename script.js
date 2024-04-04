"use strict";

const app = Vue.createApp({
    data() {
        return {
          /* video */
          videoSrc: "./video/video.mp4",
          videoEnded: false, 
          
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
          translateValue5: 0,
          currentIndex1: 0,
          currentIndex2: 0,
          currentIndex3: 0,
          currentIndex4: 0,
          currentIndex5: 0,
          isDragging1: false,
          isDragging2: false,
          isDragging3: false,
          isDragging4: false,
          isDragging5: false,
         
          /* liste des images (pour les changements dans les triangles) */
          images: [
            './img/americainFricadelle2.jpg',
            './img/pizzaJambonOignon.jpg',
            './img/americainGrizli.jpg',
            './img/paniniJambonFromage.jpg',
            './img/americainTexan.jpg',
            './img/pizzaFruitsDeMer.jpg',
            './img/americainMexicanos.jpg',
            './img/sandwichKebab.jpg',
            './img/sandwichSavoyard.jpg',
          ],
            /* on liste nos triangles avec un id et une class */
          triangles: [
            { id: 1, class: 'triangle1', alt: 'Triangle 1', image: '' },
            { id: 2, class: 'triangle2', alt: 'Triangle 2', image: '' },
            { id: 3, class: 'triangle3', alt: 'Triangle 3', image: '' },
            { id: 4, class: 'triangle4', alt: 'Triangle 4', image: '' },
            { id: 5, class: 'triangle5', alt: 'Triangle 5', image: '' },
          ],
          

          /* Sliders */
          /* La partie des sliders est susceptible d'être changé pour y incorporer une fonction de modification de l'image, le prix, le caption et le nom selon l'envie de mon client, cela n'étant pas nécessaire car il n'est pas très alaise avec l'informatique et celui-ci ne changeant jamais de carte, seulement de prix de temps en temps*/
          imageSliders1: [ 
          { id:1, image: './img/sandwichFricadelle.jpg', caption: 'Salade, tomate, oignon', nameDish:'Sandwich fricadelle/merguez/saucisses (knacki x2)', price: '4,00 €', isHovered: false },
          { id:2, image: './img/sandwichSteakFromage.jpg', caption: 'Salade, tomate, cheddar', nameDish:'Sandwich brochettes/cervelas/mexicain/\nnuggets/steack + fromage (option SFB + 0,50 €)', price: '5,00 €',  isHovered: false },
          { id:3, image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwich grizzly', price: '6,00 €',  isHovered: false },
          { id:4,image: './img/sandwichKebab.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwich kebab', price: '6,50 €',  isHovered: false },
          { id:5, image: './img/sandwichSavoyard.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwich savoyard', price: '7,00 €',  isHovered: false },
          { id:6,image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwich texan', price: '8,00 €',  isHovered: false },
        ],
        
        imageSliders2: [
          { id:1, image: './img/americainFricadelle2.jpg', caption: 'Salade, tomate, oignon', nameDish:'Américains fricadelle/jambon/saucisses (knacki x2)', price: '6,50 €',  isHovered: false },
          { id:2, image: './img/americainNuggets.jpg', caption: 'Salade, tomate, cheddar', nameDish:'Américains nuggets/poulet/merguez/thon/\nfromage/crabe/cervelas', price: '7,00 €',  isHovered: false },
          { id:3, image: './img/americainMexicanos.jpg', caption: 'salade, tomate, steack', nameDish:'Américains mexicanos/cervelas/brochette/filet américain/steack + fromage (option SFB + 0,50 €)', price: '8,50 €',  isHovered: false },
          { id:4,image: './img/americainGrizli.jpg', caption: 'salade, tomate, steack', nameDish:'Américains grizzly', price: '9,00 €',  isHovered: false },
          { id:5, image: './img/americainSavoyard.jpg', caption: 'salade, tomate, steack', nameDish:'Américains savoyard/montagnard (+ 1,00 €)', price: '7,00 €',  isHovered: false },
          { id:6,image: './img/americainTexan.jpg', caption: 'salade, tomate, steack', nameDish:`Américains texan/ch'ti`, price: '10,50 €',  isHovered: false },
        ],


        imageSliders3: [
          { id:1, image: './img/Pizza4fromages.jpg', caption: 'Salade, tomate, oignon', nameDish:'Pizza 4 fromages', price: 'petite: 7,00 € grande: 9,00 €',  isHovered: false },
          { id:2, image: './img/pizzajambonfromage.jpg', caption: 'Salade, tomate, cheddar', nameDish:'Pizza jambon-fromage', price: 'petite: 7,00 € grande: 9,00 €',  isHovered: false },
          { id:3, image: './img/pizzaJambonOignon.jpg', caption: 'salade, tomate, steack', nameDish:'Pizza jambon-oignons', price: 'petite: 7,00 € grande: 9,00 €',  isHovered: false },
          { id:4,image: './img/pizzaChorizo.jpg', caption: 'salade, tomate, steack', nameDish:'Pizza chorizo', price: 'petite: 7,00 € grande: 9,00 €',  isHovered: false },
          { id:5, image: './img/pizzaJambonChampi.jpg', caption: 'salade, tomate, steack', nameDish:'Pizza jambon-champignons', price: 'petite: 7,00 € grande: 9,60 €',  isHovered: false },
          { id:6,image: './img/pizzaFruitsDeMer.jpg', caption: 'salade, tomate, steack', nameDish:`Pizza fruits de mer`, price: 'petite: 7,00 € grande: 9,60 €',  isHovered: false },
          { id:7,image: './img/pizzaAnchois.jpg', caption: 'salade, tomate, steack', nameDish:`Pizza jambon-anchois`, price: 'petite: 7,00 € grande: 9,60 €',  isHovered: false },
        ],

        imageSliders4: [
          { id:1, image: './img/paniniClassique.jpg', caption: 'mozzarella + tomates', nameDish:'Panini classique', price: '4,50 €',  isHovered: false },
          { id:2, image: './img/paniniSaucisses.jpg', caption: 'mozzarella + tomates + saucisses', nameDish:'Panini Saucisses', price: '4,50 €',  isHovered: false },
          { id:3, image: './img/paniniJambonFromage.jpg', caption: 'mozzarella + tomates + jambon + emmental', nameDish:'Panini jambon-fromage', price: '5,50 €',  isHovered: false },
          { id:4, image: './img/pizza.jpg', caption: 'mozzarella + tomates + raclette', nameDish:'Panini raclette', price: '5,50 €',  isHovered: false },
          { id:5,image: './img/pizza.jpg', caption: 'mozzarella + tomates + chèvre + mimolette', nameDish:'Panini 3 fromages', price: '5,50 €',  isHovered: false },
          { id:6, image: './img/pizza.jpg', caption: 'mozzarella + tomates + mimolette + emmental + saucisse', nameDish:'Panini savoyard', price: '5,50 €',  isHovered: false },
          { id:7,image: './img/burger.jpg', caption: 'mozzarella + tomates + mimolette + emmental + steack', nameDish:`Panini montagnard`, price: '5,50 €',  isHovered: false },
        ],

        imageSliders5: [
          { id:1, image: './img/filetamericain.jpg', caption: 'Salade, tomate, oignon', nameDish:'Filet américain/jambon/poulet', price: '4,00 €',  isHovered: false },
          { id:2, image: './img/frite.jpg', caption: 'Salade, tomate, oignon', nameDish:'Surimi-crabe', price: '4,00 €',  isHovered: false },
          { id:3, image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Thon', price: '4,00 €',  isHovered: false },
        ],

        /* Tableaux */
        platsAvecFrites: [
          { nom: 'Fricadelle / Merguez / Nuggets / Saucisse (knacki x2)', prix: '6,00 €' },
          { nom: 'Cervelas / Mexicain / Poulet / Steak', prix: '7,00 €'},
          { nom: 'Filet américain', prix: '7,00 €' },
          { nom: 'Kebab', prix: '7,00 €' },
        ],
        platsSansFrites: [
          { nom: 'Croque Monsieur', prix: '3,00 €' },
          { nom: 'Hamburger (option SFB + 0,50 €) / Cheese-burger / Chicken-burger', prix: '4,50 €' },
          { nom: 'Texan', prix: '8,00 €' },
          { nom: 'Saucisse de friterie (x1) / Saucisses de strasbourg (x2)', prix: '2,00 €' },
          { nom: 'Merguez / Fricadelle', prix: '2,00 €' },
          { nom: 'Cervelas', prix: '2,90 €' },
          { nom: 'Mexicanos', prix: '3,00 €' },
          { nom: 'Barquette de 5 nuggets', prix: '4,00 €' },
          { nom: 'Galette de pomme de terre', prix: '1,20 €' },
        ],
        };
      },

      /* propriété de calcul */
      computed: {
        iconClass() {
          return this.isMenuOpen ? 'fa-xmark show' : 'fa-burger show';
        },
      },

      /* Toutes mes méthodes */
      methods: {

        /* Mon toggle Burger */
        toggleMenu() {
          this.isMenuOpen = !this.isMenuOpen;
          /* On cible notre élément html */
          document.documentElement.classList.toggle('menu-open', this.isMenuOpen);
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


        /* Mes images sous format polygonal */
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

        /* Application d'un zoom au hover */
        applyZoom(imageSliders, index) {
          imageSliders[index].isHovered = true;
        },
        resetZoom(imageSliders, index) {
          imageSliders[index].isHovered = false;
        },


      /* Toute les fonctions pour mes sliders */

      // Fonction de throttling pour limiter la fréquence d'appel pendant le déplacement
    throttle(callback, delay) {
      // on initialise la dernière heure à 0
      let lastTime = 0;
      // Retourne une fonction qui encapsule la logique de throttling
      return function(event, sliderNumber) {
         // on récupère le temps actuel en millisecondes
          const now = new Date().getTime();
          // Vérifie si le temps écoulé depuis la dernière exécution est supérieur ou égal au délai
          if (now - lastTime >= delay) {
            // Appelle la fonction callback avec les paramètres fournis
              callback(event, sliderNumber);
                // Met à jour le dernier temps d'exécution avec le temps actuel
              lastTime = now;
          }
      };
  },

  // Méthode appelée au début du glissement
  startDragThrottled: function(event, sliderNumber) {
      // Crée une clé pour indiquer si le glissement est en cours pour ce curseur
      const isDraggingKey = `isDragging${sliderNumber}`;

      // Sélectionne l'élément du curseur glissable
      const sliderTrackSelector = `.slider-track${sliderNumber}`;
      const sliderTrack = document.querySelector(sliderTrackSelector);

      // Ajoute une classe pour indiquer que le curseur est en train d'être déplacé
      if (sliderTrack) {
          sliderTrack.classList.add('dragging');
      }

      // Récupère la position de départ du toucher ou de la souris
      const touch = event.touches ? event.touches[0] : event;
      this.startX = touch.clientX; // Enregistre la position horizontale du toucher ou de la souris
      this.$data[isDraggingKey] = true; // Indique que le glissement est en cours
      this.accumulatedDistance = 0; // Initialise la distance accumulée

      // Démarre l'exécution de la fonction animateDrag lors du prochain rafraîchissement de l'écran
      // pour obtenir une animation fluide pendant le glissement
      this.animationFrameId = requestAnimationFrame(() => this.animateDragThrottled(event, sliderNumber));
  },

  // Méthode appelée pendant le glissement
  dragThrottled: function(event, sliderNumber) {
    // Récupère la position du toucher du premier doigt toucher ou si pas de toucher de la position de la souris
    const touch = event.touches ? event.touches[0] : event;

    // Crée des clés dynamiques pour les valeurs du curseur et pour indiquer si le glissement est en cours et associe la valeur du curseur et l'associe au nom de propriété soit si sliderNumber1 alors translateValue1 et isDragging1
    const sliderKey = `translateValue${sliderNumber}`;
    const isDraggingKey = `isDragging${sliderNumber}`;

    // Vérifie si le glissement est en cours pour ce curseur
    if (this.$data[isDraggingKey]) {
        // Calcule le déplacement depuis la dernière position enregistrée
        const delta = touch.clientX - this.startX;

        // Ajoute la valeur absolue du déplacement à la distance accumulée
        this.accumulatedDistance += Math.abs(delta);

        // Met à jour la valeur du curseur en fonction du déplacement
        this.$data[sliderKey] += delta;

        // Met à jour la position de départ pour le prochain calcul de déplacement
        this.startX = touch.clientX;
    }
  },

    // Méthode appelée à la fin du glissement
  endDragThrottled: function(event, sliderNumber) {
    // Crée des clés dynamiques pour accéder aux valeurs du curseur, de l'index actuel et pour indiquer si le glissement est en cours
    const sliderKey = `translateValue${sliderNumber}`;
    const currentIndexKey = `currentIndex${sliderNumber}`;
    const isDraggingKey = `isDragging${sliderNumber}`;

    // Vérifie si le glissement est en cours pour ce curseur
    if (this.$data[isDraggingKey]) {
        // Retire la classe 'dragging' de l'élément du curseur pour indiquer la fin du glissement
        document.querySelector(`.slider-track${sliderNumber}`).classList.remove('dragging');

        // Indique que le glissement n'est plus en cours
        this.$data[isDraggingKey] = false;

        // Annule la demande d'animation frame pour arrêter l'animation du glissement
        cancelAnimationFrame(this.animationFrameId);

        // Condition pour déclencher le défilement seulement si la distance est plus grande que 5
        if (this.accumulatedDistance > 5) {
            // Limite le déplacement à gauche (vers la première image)
            if (this.$data[sliderKey] > 0) {
              // Si la valeur du curseur est supérieure à 0, cela signifie que nous sommes au-delà de la première image.
              // Donc, nous ramenons l'index actuel à 0 pour afficher la première image.
              // Nous ramenons également la valeur du curseur à 0 pour que l'image commence depuis la gauche.
                this.$data[currentIndexKey] = 0;
                this.$data[sliderKey] = 0;
            }
            // Limite le déplacement à droite (vers la dernière image)
            else if (this.$data[sliderKey] < 0) {
              // Si la valeur du curseur est inférieure à 0, cela signifie que nous sommes au-delà de la dernière image.
              // Nous ajustons l'index actuel pour qu'il ne dépasse pas l'index de la dernière image.
                const maxIndex = this[`imageSliders${sliderNumber}`].length - 1;
                this.$data[currentIndexKey] = Math.min(maxIndex, this.$data[currentIndexKey] + 1);
                // Nous ajustons également la valeur du curseur pour empêcher le déplacement au-delà de la dernière image.
                // Nous utilisons -maxIndex * 290 comme limite pour garantir que le curseur ne dépasse pas la dernière image.
                this.$data[sliderKey] = Math.max(-maxIndex * 290, this.$data[sliderKey]);
            }
        }

        // Ajoute des conditions pour empêcher le glissement au-delà des limites
        if (this.$data[currentIndexKey] === 0) {
            this.$data[sliderKey] = Math.max(0, this.$data[sliderKey]);
        }

        if (this.$data[currentIndexKey] === this[`imageSliders${sliderNumber}`].length - 1) {
            this.$data[sliderKey] = Math.min(0, this.$data[sliderKey]);
        }

        // Réinitialise la distance accumulée après la fin du glissement
        this.accumulatedDistance = 0;
    }
  },


    // Méthode appelée pour animer le glissement
      animateDragThrottled: function(event, sliderNumber) {
        // Récupère la position du toucher ou de la souris
        const touch = event.touches ? event.touches[0] : event;

        // Clés dynamiques pour accéder aux valeurs du curseur et pour vérifier si le glissement est en cours
        const sliderKey = `translateValue${sliderNumber}`;
        const isDraggingKey = `isDragging${sliderNumber}`;

        // Vérifie si le glissement est en cours pour ce curseur
        if (this.$data[isDraggingKey]) {
            // Calcule le déplacement du curseur en fonction du mouvement de la souris/toucher
            // Multiplie le déplacement par 0.9 pour une animation plus douce
            const delta = (touch.clientX - this.startX) * 0.9;

            // Met à jour la valeur du curseur en ajoutant le déplacement calculé
            this.$data[sliderKey] += delta;

            // Met à jour la position de départ pour le prochain calcul de déplacement
            this.startX = touch.clientX;

            // Planifie l'exécution de cette fonction lors du prochain rafraîchissement de l'écran pour continuer l'animation fluide pendant le glissement
            // Ceci est réalisé en utilisant la fonction requestAnimationFrame qui synchronise l'animation avec les rafraîchissements de l'écran
            this.animationFrameId = requestAnimationFrame(() => this.animateDragThrottled(event, sliderNumber));
        }
      }
    },

    /*  exécuter du code après que le composant a été rendu dans le DOM et est prêt à être utilisé */
    mounted() {
      // on met un interval de temps pour les changements d'images
        this.updateTriangles();
        setInterval(this.updateTriangles, 6000);

        // Ces fonctions throttled sont créées en utilisant la méthode throttle pour les différents événements de glissement
        // Elles garantissent que les événements ne sont déclenchés que selon le délai spécifié permettant de contrôler la fréquence d'exécution de ces événements
        this.startDrag = this.throttle(this.startDragThrottled, 100); 
        this.drag = this.throttle(this.dragThrottled, 25); 
        this.endDrag = this.throttle(this.endDragThrottled, 150); 
        this.animateDrag = this.throttle(this.animateDragThrottled, 15);

        
        /* Pour la vidéo */
        /* Nous inspectons la vidéo, une fois celle-ci fini, this.videoEnded passe à true pour laisser place au contenu principal  */
        const video = document.querySelector('.video-background');
      video.addEventListener('ended', () => {
        this.videoEnded = true;
      });
    },
  });

app.mount("#app");

