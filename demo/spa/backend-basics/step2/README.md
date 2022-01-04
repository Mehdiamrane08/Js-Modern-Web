# Step2 : sécurisation très légère d'une API à l'aide de l'authentification et l'autorisation via un simple système de token
## How to ? création de l'authentification
- Dans notre API permettant de lire des pizzas, ou d'en ajouter, il n'est pas normal que n'importe qui puisse ajouter des pizzas. On veut que seul le compte adminpizza puisse ajouter des pizza. On va faire ça progressivement. Dans ce step 2, on va créer un token qui sera le même pour tous les utilisateurs. Ainsi, seuls les utilsateurs ayant fourni ce token auront accès aux ressources un tout petit peu sécurisée. Dans le step3, nous passerons à JWT.
- Création d'un router pour traiter de l'authentification et de l'autorisation de ressources / : création de /routes/auths.js soit en adaptant userRouter (/routes/users.js et app.js) en authRouter (/routes/auths.js et app.js), le plus facile, soit en partant de rien et en créant authRouter (et auths.js)
- Gestion de l'opération de création d'un compte utilisateur : pour créer une ressource , il faut faire une requête de type POST /auths/register.
/routes/auths.js doit donc gérer une route créant un nouveau compte utilisateur => ajout d'un Object représentant un utilisateur dans l'Array users.
- Gestion de l'opération d'authentifiation d'un compte utilisateur :
Il faut faire une requête de type POST /auths/login. /routes/auths.js doit donc gérer une route vérifiant les credential d'un compte utilisateur.
- Pour lire toutes les ressources de type users pouvant être authentifiés, il faut faire une requête de type GET /auths/users/unsafe.
/routes/auths.js doit donc gérer une route renvoyant tous les comptes utilisateurs.
Attention, nous créons volontairement un trou de sécurité ! Seuls les utilisateurs authentifiés devraient accéder à la liste des comptes utilisateurs. 
- Pour sécuriser un minimum l'accès en lecture à la liste de comptes utilisateurs, on va créer un système de token qui sera le même pour tous les utilisateurs authentifiés. Un utilisateur authentifié recevra ce token. Il utilisera ensuite ce token pour accéder aux ressources "sécurisées".
- Lorsqu'un utilisateur s'authentifie (soit à la création de compte via POST /auths/register), soit lors d'un login (via POST /auths/login), l'API lui renvoie son username et le token.
- Quand l'utilisateur veut accéder à une ressource "sécurisée", il envoie ce token au sein d'un Authorization header. Voir par exemple la requête du REST Client :
GET http://localhost:3000/auths/users
Authorization: Future signed token
- On a sécurisé la lecture des comptes utilisateur (routes/auths.js via GET /auths/users) via la vérification du token. On a fait de même pour sécuriser l'accès à l'ajout d'une pizza (routes/pizzas.js via POST /pizzas). 
- Tout cela n'est pas encore des plus safe, car le token est le même pour tous, et le token ne contient pas la possibilité d'identifier qui souhaite accéder à la ressource. A la prochaine étape, nous allons utiliser JWT pour sécuriser tout cela.
- Installation des packages associés à l'API : npm install
- Démarrer votre API (par défaut elle est configurée sur le port 3000 au sein de /bin/www) : npm start 
- N'hésitez pas à explorer les requêtes pour voir comment l'API réagit => clic sur Send Request au sein de /tests/auths.http ou /tests/pizzas.http. 