# Step5 : Step5 : Advanced - Harmonisation de la structure du frontend
## How to ? En route vers un code maintenable, des composants fonctionnels, un squelette bien pensé
- Lors des étapes précédentes, le code a volontairement été développé de manière incrémentale, en faisant le strict minimum à chaque étape pour qu'il soit fonctionnel. Il est intéressant maintenant de réfléchir à sa structure, de voir ce qui pourrait être amélioré.
- Cette étape est considérée comme "advanced". Les participants à ce cours ne doivent pas considérer des aujourd'hui écrire du code de cette façon. En effet, il est possible d'avoir un code raisonnablement maintenable en suivant les étapes du step 0 au step 4. 
Néanmoins, la réflexion qui est proposée ici devrait vous permettre d'avoir une source d'inspiration pour vos futurs développement.
- On va réfléchir ici à des principes de bases qui pourrait être utile à harmoniser nos futurs développement, voir à ammener à la mise en place d'un framework. 
- Les idées de base de cette harmonisation : 
  - On souhaite que le code soit structuré en "composants fonctionnels". Disons qu'un composant fonctionnel est défini comme une fonction portant le nom du composant qui est déclarée dans un module externe portant lui aussi le nom du composant (exemple : le composant "Login" qui est déclaré dans le fichier /src/Component/Login.js). - On souhaite que pour chaque page qui doit être affichée, il y corresponde un composant fonctionnel (AddPizza, ListPizzas, Login). Les messages d'erreurs doivent s'afficher au sein même d'une page. 
  - Pour être plus général, on souhaite que pour chaque composant qui doit être rendu de manière dynamique au sein de index.html, il y ait un composant fonctionnel associé (et donc la création des modules associés).
  - Chaque composant fonctionnel associé à un élément HTML devrait implémenter le même genre de comportement : soit il renvoie un élément HTML (comme Login() ou AddPizza() au step4), soit il s'auto-render, comme printPizzas() au step4.
  Ce qui va guider notre choix, c'est que l'on souhaite qu'un composant fonctionnel associé à un élément HTML puisse être rendu à différents endroits. 
  - L'endroit du rendu d'un composant fonctionnel associé à une élément HTML doit être choisi par l'appelant du composant fonctionnel associé à un élément HTML si le composant devant être rendu n'est pas encore rendu (par exemple, on souhaite que Login puisse décider de rendre AddPizza dans la div "#page"). 
  - Il devrait être possible à chaque composant fonctionnel de demander la mise à jour d'un autre composant fonctionnel, sur base de propriétés passées en argument, sans forcément que le composant fonctionnel à mettre à jour doive être entièrement ré-rendu (par exemple, le bouton "#loginBtn" devrait pouvoir être caché sans devoir l'effacer entièrement). 
  - Un composant fonctionnel associé à un élément HTML pourrait être responsable de se rendre lui-même ("auto render"). Ce composant pourrait décider de lui même de s' "auto-render". Cela ne pourra se faire que par le biais de la gestion événementielle associée à ce composant.
- Au regard de ces principes désirés, voici une solution identifiées concernant chaque composant fonctionnel associé à un élément HTML :
  - Création d'un module et d'une fonction portant le nom du composant dans le répertoire /src/Components/Nom_Composant.js et export de cette fonction.
  - La fonction associée au composant peut recevoir en paramètres : un objet props et l'élément HTML parent où devrait se rendre ("auto render") le composant fonctionel. La fonction ne doit pas vraiment renvoyer qqch (à voir plus tard si ça pourrait être utile).
  - L'élement HTML associé à un composant fonctionnel s'auto render dans l'élément HTML parent reçu de l'appelant. 
  - Une fois q'un élement HTML a été rendu par un composant fonctionnel, tout événement associé à l'élément HTML peut amener à une mise à jour de celui-ci.
  - Comment est-ce que l'appelant d'un composant fonctionnel peut déclencher une mise à jour de celui-ci (mise à jour partielle ou re-render complet) ? Il doit simplement appeler le composant fonctionnelle.
  C'est le rôle du composant fonctionnelle de détecter s'il doit créer un nouvel élément HTML ou s'il doit se mettre à jour sur base des props fournies par l'appelant. L'algorithme de détection est expliqué au sein du code, dans /src/utils/render.js
  - En conclusion, le rôle d'un composant fonctionnel est soit de rendre un nouvel élément HTML, soit de mettre à jour un élément HTML existant.
    
- Nous allons donc mettre à jour le code selon les principes identifiés ci-dessus :
  - Mise à jour de /src/Components/Login.js
  - Mise à jour de /src/Components/AddPizza.js
  - Création de /src/Components/ListPizzas.js. 
  NB : Pour tester notre principe d'ajout de composants fonctionnels là où on le souhaite, on pourrait aller jusqu'à créer un composant PizzaLine.js. Une PizzaLine permettrait notamment d'écouter les clics qui se produiraient sur cet élément, potentiellement afin de gérer des futurs opérations sur une pizza (modification ou effacement d'une pizza par un admin, affichage d'une description plus détaillée avec photo...). Cela ne sera pas fait dans le cadre de ce step-ci.
  - Création de /src/Components/Navigation.js pour traiter de la navigation, ici les boutons "#loginBtn" et "#homeBtn". Ces boutons ne seront plus intégré statiquement à /src/index.html, mais devront être rendu dynamiquement dans un container, une div, appelé "navigation", au sein du header.
  - Création de /src/Components/PrintError.js afin d'afficher les erreurs survenant dans les composants principaux.
  - Création de deux simples composants /src/Components/Header.js et /src/Component/Footer.js afin de finaliser la structure de nos composants.
  - Mise à jour de /src/index.js pour appeler les composants fonctionnels.
- De plus, l'appel de l'API pourrait être facilité en utilisant une fonction utilitaire qui recevrait en argument la URI associés aux ressources, le type de méthode HTTP (GET / POST / DELETE / PATCH ...), les données éventuelles (pour les requêtes de type POST / PATCH ...), le token éventuelle à utiliser lors d'un appel vers une opération sur des ressources protégéés par JWT.
En cas d'erreur, on va afficher ce message d'erreur à l'aide d'un nouveau composant fonctionnel :
  - Création du script utilitaire /src/utils/api.js exportant la fonction callAPI()
  - Au lieu d'appeler fetch() directement, appel de callAPI() dans /src/Components/Login.js, /src/Components/ListPizza.js et /src/Component/AddPizza.js. En cas d'erreur, au sein de ces composants, faire l'appel au composant Error.
  - Création du composant fonctionnel /src/Components/Error.js
- Le render des propriétés de base d'un composant fonctionnels a été généralisé au sein de src/utils/render.js. Il n'a pas été évident de mettre en place un système permettant à un composant de détecter s'il doit se mettre à jour où se créer. Mais une fois le système mis en place, celui-ci est simple à utiliser.
# Conclusion
- Nous avons maintenant du code qui est bien structuré, en terme de composant fonctionnels. Néanmoins, il reste encore des améliorations à faire pour harmoniser la structure du frontend afin d'arriver à une structure générique applicable sous tout type de projet.
- Une telle structure générique pourrait s'apparenter au dévellopement d'un framework.
- Voici les améliorations proposées, dans l'optique d'un frontend pleinement harmonisé : 
  - Pour la navigation, on ne devrait pas créer autant de gestionnaire d'événements qu'il y a de "menu items", de "boutons". Il faudrait faire en sorte de pouvoir généraliser la gestion des clics sur des éléments de navigation. C'est donc un principe de routeur de composant de type "page" à mettre en place.
  - Il faudrait gérer le fait que quand des pages sont affichées (affichage de composants fonctionnels de type page), on change l'URL au sein du browser et on enregistre cela dans l'historique du browser. Cela permettra de revenir en arrière ou d'aller en avant en fonction de l'historique du browser.
  - On devrait plus facilement pouvoir se rendre compte de quel composant fonctionnel est une page.
  - Il faudrait pouvoir de manière plus naturelle créer un composant fonctionnel générique, que celui soit directement attaché au DOM et rendu si on le souhaite, ou que le rendu soit retardé si nécessaire. Nous pourrions utiliser la notion de "High Order Function" pour le faire.
  - Il serait utile de pouvoir gérer l'état d'un composant. Cet état pourrait être passé de composants fonctionnels parents vers leurs enfants, et vice-versa.
  L'auto-render de composant fonctionnel serait basé sur cet état.


# Resources
- photo de : https://unsplash.com/ (Sahand Hoseini)
- musique de : https://freemusicarchive.org/music/Infecticide : Infecticide - Chansons Tristes - 11. Infecticide - Pizza Spinoza