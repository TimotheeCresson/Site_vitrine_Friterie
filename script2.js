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
            './img/sandwichFricadelle.jpg',
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
          
          imageSliders1: [ 
          { id:1, image: './img/sandwichFricadelle.jpg', caption: 'Salade, tomate, oignon', nameDish:'Sandwich fricadelle/merguez/saucisses (knacki x2)', price: '4,00 €', isHovered: false },
          { id:2, image: './img/sandwichSteakFromage.jpg', caption: 'Salade, tomate, cheddar', nameDish:'Sandwich brochettes/cervelas/mexicain/\nnuggets/steack + fromage (option SFB + 0,50 €)', price: '5,00 €',  isHovered: false },
          { id:3, image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwich crizly', price: '6,00 €',  isHovered: false },
          { id:4,image: './img/sandwichKebab.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwich kebab', price: '6,50 €',  isHovered: false },
          { id:5, image: './img/sandwichSavoyard.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwich savoyard', price: '7,00 €',  isHovered: false },
          { id:6,image: './img/pizza.jpg', caption: 'salade, tomate, steack', nameDish:'Sandwich texan', price: '8,00 €',  isHovered: false },
        ],
        
        imageSliders2: [
          { id:1, image: './img/americainFricadelle.jpg', caption: 'Salade, tomate, oignon', nameDish:'Américains fricadelle/jambon/saucisses (knacki x2)', price: '6,50 €',  isHovered: false },
          { id:2, image: './img/americainNuggets.jpg', caption: 'Salade, tomate, cheddar', nameDish:'Américains nuggets/poulet/merguez/thon/\nfromage/crabe/cervelas', price: '7,00 €',  isHovered: false },
          { id:3, image: './img/americainMexicanos.jpg', caption: 'salade, tomate, steack', nameDish:'Américains mexicanos/cervelas/brochette/filet américain/steack + fromage (option SFB + 0,50 €)', price: '8,50 €',  isHovered: false },
          { id:4,image: './img/americainGrizli.jpg', caption: 'salade, tomate, steack', nameDish:'Américains grizli', price: '9,00 €',  isHovered: false },
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
      methods: {
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

        applyZoom(imageSliders, index) {
          imageSliders[index].isHovered = true;
        },
        resetZoom(imageSliders, index) {
          imageSliders[index].isHovered = false;
        },


        startDrag(event, sliderNumber) {
          const isDraggingKey = `isDragging${sliderNumber}`;
          const sliderTrackSelector = `.slider-track${sliderNumber}`;
          const sliderTrack = document.querySelector(sliderTrackSelector);
        
          if (sliderTrack) {
            sliderTrack.classList.add('dragging');
          }
        
          const touch = event.touches ? event.touches[0] : event;
          this.startX = touch.clientX;
          this.$data[isDraggingKey] = true;
          this.accumulatedDistance = 0;
        
          // Démarre l'exécution de la fonction animateDrag lors du prochain rafraîchissement de l'écran pour une animation plus fluide
          this.animationFrameId = requestAnimationFrame(() => this.animateDrag(event, sliderNumber));
        
        },
        
        drag(event, sliderNumber) {
          const touch = event.touches ? event.touches[0] : event;
          const sliderKey = `translateValue${sliderNumber}`;
          const isDraggingKey = `isDragging${sliderNumber}`;
        
          if (this.$data[isDraggingKey]) {
            // console.log(this);
            const delta = touch.clientX - this.startX;
            this.accumulatedDistance += Math.abs(delta);
            this.$data[sliderKey] += delta;
            this.startX = touch.clientX;
          }
        },
        
        endDrag(event, sliderNumber) {
          const sliderKey = `translateValue${sliderNumber}`;
          const currentIndexKey = `currentIndex${sliderNumber}`;
          const isDraggingKey = `isDragging${sliderNumber}`;
        
          if (this.$data[isDraggingKey]) {
            document.querySelector(`.slider-track${sliderNumber}`).classList.remove('dragging');
            this.$data[isDraggingKey] = false;
        
            cancelAnimationFrame(this.animationFrameId);
        
            // condition pour déclencher le défilement seulement si la distance accumulée est suffisante
            if (this.accumulatedDistance > 20) {
              // console.log(this.accumulatedDistance);
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
              applyInertia(sliderNumber);
            }
        
            // Ajoutez ces conditions pour empêcher le glissement au-delà des limites
            if (this.$data[currentIndexKey] === 0) {
              this.$data[sliderKey] = Math.max(0, this.$data[sliderKey]);
            }
        
            if (this.$data[currentIndexKey] === this[`imageSliders${sliderNumber}`].length - 1) {
              this.$data[sliderKey] = Math.min(0, this.$data[sliderKey]);
            }
        
            // Réinitialisez la distance accumulée après la fin du glissement
            this.accumulatedDistance = 0;
            console.log(this.$data, this);
          }
        },
        
        applyInertia(sliderNumber) {
          const sliderKey = `translateValue${sliderNumber}`;
          const velocityKey = `velocity${sliderNumber}`;
          const attenuationFactor = 0.9; // Facteur d'atténuation pour réduire progressivement la vitesse
          const duration = 300; // Durée de l'inertie en millisecondes
          const startTime = performance.now();
          const initialVelocity = this.$data[velocityKey]; // Récupérer la vitesse calculée lors du glissement
      
          requestAnimationFrame(function inertiaStep(timestamp) {
              const elapsed = timestamp - startTime;
              const attenuation = Math.pow(attenuationFactor, elapsed / duration);
              const deltaTranslateX = initialVelocity * attenuation * elapsed;
      
              // Mettre à jour la position du slider en fonction de l'inertie
              this.$data[sliderKey] += deltaTranslateX;
              this.$forceUpdate();
      
              if (Math.abs(deltaTranslateX) > 0.1) {
                  requestAnimationFrame(inertiaStep);
              }
          });
      },

        animateDrag(event, sliderNumber) {
          const touch = event.touches ? event.touches[0] : event;
          const sliderKey = `translateValue${sliderNumber}`;
          const isDraggingKey = `isDragging${sliderNumber}`;
        
          if (this.$data[isDraggingKey]) {
            this.$data[sliderKey] += (touch.clientX - this.startX) * 0.9;
            this.startX = touch.clientX;
            this.$forceUpdate();
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

