# Step4 : Consommer une RESTFul API
## How to ? Consommation d'une RESTFul API non protégée
- Les steps 1 à 3 de la démo backend-basics doivent avoir été faits (/demo/spa/backend-basics) et le backend doit avoir été démarré.
- Maintenant que nous avons une API qui permet d'authentifier des utilisateurs et d'autoriser des opérations sur des ressources via JWT, nous allons les utiliser pour afficher la liste des pizzas (opération non protogée) sur la page d'acceuil.
- Mise à jour du proxy de Webpack pour rediriger les requêtes vers l'API: 
On veut que tout appel sur http://localhost/api/pizzas soit redirigé sur http://localhost:3000/api/pizzas
=> mise à jour de webpack.config.js :
proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: {'^/api' : ''}
      },
    },
- Nous allong maintenant gérer l'intégration de notre frontend et du backend, via l'affichage de la liste des pizzas, le menu.
- Création d'un tableau reprenant le menu de pizza au sein de la homepage : voir le code dans /src/index.js => appel de la méthode fetch (GET /api/pizzas qui sera transformé en GET http://localhost:3000/pizzas par le proxy) pour recevoir un Array d'Object. Puis génération dynamique d'HTML sur base des données reçues par l'API. 
- Styler le menu via le CSS : voir le nouveau code dans /src/stylesheets/style.css
## How to ? Consommation d'une RESTFul API protégée par une autorisation JWT
- Pour consommer une RESTFul API protégée par un JWT, il faut d'abord authentifier les utilisateurs.
- Ici, on veut juste que l'admin du site puisse ajouter des pizzas. On ajoute donc un bouton permettant de le logger, et un autre pour revenir à la Homepage. 
Mise à jour de /src/index.html pour ajouter un "menu" statique, deux simples boutons.
- Gestion des événements sur ces boutons : lors d'un clic, on souhaite afficher ce que renvoie un composant fonctionnel (une fonction). Dès lors, on effacera le contenu du container permettant d'afficher les composants fonctionnels (c'est la balise div identifiée par "page") et l'on appellera un composant fonctionnel (Login() par exemple) pour afficher soit le formulaire de login, soit le menu des pizzas. 
- Plutôt que de mettre le code permettant l'authentification au sein de /src/index.js, afin d'éviter d'avoir un script surchargé, on va mettre le code dans un script /src/Login.js.
- Au sein de /src/Components/Login.js, on aura un composant fonctionnel, une fonction, qui retourne un HTMLFormElement sur lequel on a ajouté un écouteur d'événement de type "submit". Au submit du formulaire, un appel est fait à l'API (POST /auths/login).
Si l'utilisateur a donné un bon username & password (voir API, l'admin c'est pizzaadmin avec Pizzaadmin comme password), l'API renvoie le username ainsi que le token de l'utilisateur (lui même contenant le username dans le payload du token). Il faut sauvegarder ce token, ainsi que le username, dans le sessionStorage. Cela permettra d'utiliser ces infos lors d'appels à des API sécurisées. Une fois authentifié, le bouton identifié par "loginBtn" est caché, et l'on appelle le composant fonctionelle AddPizza().
- AddPizza(), définit au sein de /src/Components/AddPizza.js, renvoie un HTMLFormElement sur lequel on a ajouté un écouteur d'événement de type "submit". Au submit du formulaire, un appel est fait à l'API (POST /pizza) pour une opération d'ajout d'une ressource. Comme cette opération est sécurisée par un token, il faut, lors de l'appel de l'API, ajouter un authorization header contenant le token qui a été enregistré dans le sessionStorage (voir code de /src/Components/AddPizzas.js). 
# Conclusion
- Nous avons maintenant une SPA qui est moderne, dont le frontend est géré indépendamment du backend, dont les données de session sont sauvegardées côté client, et dont l'accès à des opérations sur certaines ressources sont très bien sécurisées.
- Le code associé a volontairement été développé de manière incrémentale, en faisant le strict minimum à chaque étape pour qu'il soit fonctionnel. Une prochaine étape pourrait être d'améliorer la structure du code, sa maintenabilité. On voit ici que des composants fonctionnels ont été créés pour le formulaire de login et pour le formulaire d'ajout de pizza. On pourrait faire la même chose pour le composant d'affichage du menu, qui se baserait donc sur la fonction printPizzas() donnée dans /src/index.js. Notons aussi que printPizzas() s'occupe de s'auto-afficher dans la div "page". Il serait utile que chaque composant fonctionnel implémente le même genre de comportement : soit il renvoie un élément HTML (comme Login() our AddPizza()), soit il s'auto-render, comme printPizzas() actuellement.
Toutes ces changements rendrait le script d'entrée du programme (/src/index.js) plus clair.
- Bons développements ; )

# Resources
- photo de : https://unsplash.com/ (Sahand Hoseini)
- musique de : https://freemusicarchive.org/music/Infecticide : Infecticide - Chansons Tristes - 11. Infecticide - Pizza Spinoza