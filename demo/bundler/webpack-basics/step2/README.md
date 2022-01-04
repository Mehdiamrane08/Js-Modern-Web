# Step2 : Configurer Webpack pour démarrer l'application via un serveur de développement et pour charger les assets de façon moderne
## How to ? Configuration de Webpack
- Généralement, quand vous allez créer un frontend tournant sous Webpack, vous allez utiliser un boilerplate fournissant déjà un fichier package.json contenant tous les packages à installer, ainsi qu'une configuration de Webpack (webpack.config.js). Ici, nous vous expliquons tout ce qui a été fait pour créer ces démos, afin de vous permettre de comprendre les mécanismes de Webpack.
- Mise à jour du fichier package.json pour ajouter "start" : 
 "scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "start": "webpack-dev-server --mode development"
  },
- Installation des packages pour le développement serveur, ainsi que toutes les dépendances pour charger des assets via Webpack (et pour transpiler du JS) : npm i webpack webpack-cli webpack-dev-server css-loader style-loader file-loader babel-loader @babel/core @babel/preset-env html-webpack-plugin
- Création du fichier de configuration de Webpack /webpack.config.js permettant de gérer des assets (modules file-loader, css-loader et style-loader), de gérer le développement serveur (interfaces réseaux sur lesquelles le serveur écoutents, port du serveur web, lancement automatique d'un browser, proxy vers une API si nécessaire), de gérer un module permettant de mapper le JS du bundle au JS des sources (cheap-module-eval-source-map) afin de pouvoir débugger facilement, de créer le bundle dans /dist/bundle.js (au lieu de /dist/main.js par défaut) et de générer un fichier /dist/index.html sur base d'un template /src/index.html. Il est à noter que /src/index.html ne doit plus contenir la balise  <script src="./main.js"></script> ou  <script src="./bundle.js"></script> comme c'est configuré ici.
## How to ? lancer l'application avec le development server
- Déplacer le fichier /dist/index.html vers /src/index.html. Il est plus pratique de retrouver tant le fichier index.js qu'index.html dans /src (plutôt que de devoir mettre des choses dans /dist, là où va être généré le bundle.). Supprimer <script src="./main.js"></script> de /src/index.html. L'idée est de mieux structurer nos répertoires et contenus, et que dans une prochaine étape, tout ce qui se trouve dans /dist soit généré par webpack sur base de tout ce qui se trouve dans /src.
- Démarrer votre application : npm start
- Votre bundle a été généré (bundle.js) ainsi que index.html, mais tout est géré par le serveur de développement, il n'y a rien de mis dans /dist !
WARNING : problème de dépendances pour Webpack 5 (en fin 2020, Webpack est passé en version 5). Résolution : installation d'une version plus ancienne pour webpack-cli et webpack => changer package.json pour vos dépendances :
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
## How to ? charger les assets de façon moderne avec Webpack
- Le but ultime est de ne rien devoir mettre dans le output directory (/dist). On souhaite, pour une SPA, avoir tous nos assets présents dans /src, et demander à Webpack de charger ceux-ci une fois qu'il aura créé le bundle.
- Mettre tous vos assets dans /dist => pour le step 2, /img et /sound et /stylesheets sont donc mis dans /src
- Chargement du css (grâce aux modules css-loader et style-loader) dans un index.js (ou tout autre module .js) : import "./stylesheets/style.css";
- Chargement d'une image (grâce au module file-loader) dans index.js (ou tout autre module.js) : import logo from "./img/js-logo.png";
Le file-loader va transformer le chemin de la photo vers le chemin de la photo qui se trouvera dans le répertoire de sortie (/dist) => utilisation de logo comme src d'une image : footerPhoto.src = logo;
- Chargement d'une photo via le css : il n'y a rien de spécial à faire, du moment que la photo est dans /src, le file-loader reconnaît la photo localement et va remplacer le chemin final de la photo lorsque le projet a été "build" (ou "bundlé" ; ): par exemple, dans style.css :  background-image : url(../img/pizza.jpg);
- Chargement d'un fichier son : idem que pour une photo, voir le code ! 
## Conclusion : pourquoi avoir fait tout ça ? 
- Voir le step 3, où l'on peut intégrer n'importe quel package du monde node.js ! Gestion incroyable et simple des dépendances et des assets !
- Sachez que quand vous faites un build pour la production (npm run build), le bundle est optimisé pour la production ! Cela signifie que tous vos commentaires sont enlevés de vos scripts, tous les espaces sont enlevés, toutes les dépendances non utilisées sont retirées, certains fichiers sont convertis en base64... Dès lors, vous avez un bundle des plus compacts !
# Resources
- photo de : https://unsplash.com/ (Sahand Hoseini)
- musique de : https://freemusicarchive.org/music/Infecticide : Infecticide - Chansons Tristes - 11. Infecticide - Pizza Spinoza