# Step1 : création basique d'une API indépendante d'un frontend à partir du générateur Express
## How to ? Création de l'authentification
- Installation du générateur d'applications Express (si c'est pas déjà fait): npm install -g express-generator
NB : info via https://expressjs.com/en/starter/generator.html
- Création d'une application Express sans vue dans le répertoire de projet /step1 (on crée une SPA, pas une MPA) : express step1 --no-view
NB : le --no-view permet de ne pas avoir à effacer certains répertoires inutiles à une SPA comme /views.
- NB : Pour une API indépendante, on a pas besoin d'avoir un répertoire public, ni d'un serveur statique. On peut donc effacer le répertoire /public et enlever le middleware de serveur de fichiers statiques : app.use(express.static(path.join(__dirname, 'public'))); 
Pour se simplifier la vie dans un premier temps, on ne va rien enlever.
- Aller dans le répertoir du projet /step1 : cd step1 (ou via VSCode, clic droit sur le répertoire /step1, Open in Integrated Terminal)
- Installation des packages (package d'express): npm install
- Notre API doit traiter de ressources de type "pizza".
- Création d'un router pour traiter des ressources /pizzas : création de /routes/pizzas.js soit en adaptant indexRouter (/routers/index.js et app.js) en pizzaRouter (/routes/pizzas.js et app.js), le plus facile, soit en partant de rien et en créant pizzaRouter (et pizzas.js).
- Gestion de l'opération de lecture de toutes les pizzas : selon les conventions RESTFul, pour lire toutes les ressources, il faut faire une requête de type GET /pizzas.
/routes/pizza.js doit donc gérer une route renvoyant toutes les pizzas qui existent dans le menu : le menu est un Array d'Objects (chaque Object représente une pizza)
- Démarrer votre API (par défaut elle est configurée sur le port 3000 au sein de /bin/www) : npm start
- Consommer son API via un browser pour lire toutes les ressources de type pizza : http://localhost:3000/pizzas
- Gestion de l'opération de création d'une nouvelle pizza : selon les conventions RESTFul, pour créer une ressource, il faut faire une requête de type POST /pizzas.
/routes/pizza.js doit donc gérer une route créant une nouvelle pizza => ajout d'un Object représentant une pizza dans le menu.
- Comment tester POST /pizzas ? Il faudrait soit développer un formulaire de pizza au niveau du frontend, soit tester la requête via un REST client.
## How to ? Test rapide de son API via REST Client
- Installer le REST Client au sein des extensions de VSCode si ça n'est pas déjà fait.
- Créer un fichier qui va contenir les requêtes de tests : /tests/pizza.http.
- Création de requêtes GET /pizzas et POST /pizzas : voir exemples au sein de /tests/pizza.http. Les données associées à une pizza, lors d'une requête POST, sont envoyées au format JSON.
- Exécuter les requêtes pour voir comment l'API réagit => clic sur Send Request au sein de /tests/pizzas.http. 

## How to ? Redémarrer automatiquement votre application à chaque changement de fichier
- installer nodemon de manière globale : npm i -g nodemon
- lancer nodemon (au lieu du simple node) quand on tape npm run dev : ajout de la ligne "dev": "nodemon /bin/www"
dans package.json :
"scripts": {
    "dev": "nodemon ./bin/www",
    "start": "node ./bin/www"
  },

