# Step1 : Migrer votre frontend classique (step 0) vers Webpack sans fichier de configuration de Webpack
## How to ?
- Créer votre /src and /dist dans le répertoire de votre projet.
- Le script d'entrée de votre application (index.js) doit se trouver dans : /src/index.js
- Les assets associés à votre frontend (html, images, sons, css...) doivent se trouver dans : /dist (exemple /dist/index.html, /dist/img/js-logo.png...)
- Votre index.html, dans /dist/index.html, doit référencer le bundle au sein d'une balise script : modification de <script src="./index.js"></script> vers <script src="./main.js"></script>
- Créer votre fichier de configuration de votre projet : npm init -y
- Installer les packages pour Webpack : npm i webpack webpack-cli
- Lancer un build via le CLI (command line interface) : npx webpack
- Votre bundle a été généré au sein de /dist/main.js
- Pour démarrez votre application, il suffit de servir votre répertoire /dist via n'importe quel serveur. Utilisation de VSCode Live Server (installer l'extension Live Server si ça n'est pas déjà fait) : clic droit sur /dist/index.html, Open with Live Server.
### Générer un bundle via npm run dev OU npm run build
- Mettre à jour le fichier package.json : 
 "scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
  }
- Lancer un build du bundle : npm run dev (OU npm run build)
NB : npm run build est l'équivalent de npx webpack
- Votre bundle a été généré au sein de /dist/main.js
# Resources
- photo de : https://unsplash.com/ (Sahand Hoseini)
- musique de : https://freemusicarchive.org/music/Infecticide : Infecticide - Chansons Tristes - 11. Infecticide - Pizza Spinoza