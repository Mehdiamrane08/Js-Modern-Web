# Step3 : sécurisation d'une API à l'aide de l'authentification et l'autorisation via JWT
## How to ? création de token signé à l'aide d'un secret
- Dans notre API permettant de lire des pizzas, ou d'en ajouter, il n'est pas normal que n'importe qui puisse ajouter des pizzas. On veut que seul le compte adminpizza puisse ajouter des pizza, et que tout utilisateur authentifié puisse voir la liste des comptes utilisateurs. Dans ce step 3, on va créer un token sécurisé, un JWT, contenant une signature protégée par un secret, et on ajoutera le username dans le token afin de sauvegarder les données de session côté client. Ainsi, seuls les utilsateurs ayant fourni un token valide auront accès aux ressources sécurisées, et l'on pourra même autoriser l'accès à un ou plusieurs username particulier(s).
- Au step2, nous avions créé un token qui n'était pas vraiment sécurisé. Dans ce step3, nous allons transformer ce token en JWT, avec  un secret "ilovemypizza!" pour la signature, le username comme donnée de session que l'on mettra dans le payload du token, et une durée de vie du token de 24h (LIFETIME_JWT dans le code).
- Installation du package jsonwebtoken permettant de créer un JWT : npm i jsonwebtoken
- Utilisation de jsonwebtoken pour créer le token : voir le code dans /routes/auths.js pour la méthode jwt.sign() 
- Amélioration de l'autorisation des opérations sur les ressources : voir le code dans /routes/pizzas.js et /routes/users.js pour voir comment vérifier que le token est valide.
- Afin de sécuriser l'opération d'ajout d'une pizza par pizzaadmin seulement, dans /routes/pizzas.js, le code a été écrit sans souci de structurer son code (et sans souci de duplication de variables, comme jwtSecret) : appel de la méthode jwt.verify() pour vérifier la signature et parser les infos qui sont dans le payload (token.username).
- Dans /routes/users.js, le code a été restructuré. On a créé un middleware d'autorisation des ressources, que l'on appelle avant de traiter l'accès à l'opération protégée sur des ressources (lecture des comptes utilisateurs /GET auths/users). Cela a le même genre d'effets que la façon dont nous avons protégé l'opération de création d'une pizza. Mais le code est plus facilement réutilisable et lisible. 
- Comme la liste d'utilisateur potentiellement authentifiable doit être accédée dans plusieurs module (/utils/auths.js et /routes/auths.js), nous avons restructuré le code pour que cette liste puisse être importée là où nécessaire. Cette liste est maintenant exportée par /utils/auths.js et sera utilisée là où nécessaire. 
- Si ça n'est pas fait, installation des packages associés à l'API : npm install
- Démarrer l'API (par défaut elle est configurée sur le port 3000 au sein de /bin/www) : npm start 
- N'hésitez pas à explorer les requêtes pour voir comment l'API réagit => clic sur Send Request au sein de /tests/auths.http ou /tests/pizzas.http.
# Conclusion
- Nous avons une RESTFul API entièrement testée et développée indépendemment du frontend.
- Nous avons choisi de sécuriser que deux opérations sur des ressources : la lecture des comptes utilisateurs (pour tout utilisateur connecté) et la création de pizzas (pour l'utilisateur pizzaadmin uniquement).
- Le mécanisme de JWT est robuste pour gérer l'authentification et l'autorisation d'opération sur des ressources.
- Il nous reste maintenant à consommer cette RESTFul api par le frontend. => step4 du frontend (/demo/bundler/webpack-basics/step4).
- Bien sûr, cette API ne gère pas la persistence des données. A chaque démarrage de l'API, les données qui avaient été ajoutées seront perdues.
- La persistance des données pourrait être ajouté dans les futures étapes. Elle pourraient se faire soit via un fichier .json ou via une base de données.