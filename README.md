# Projet 6 d'Openclassrooms: Piquante #

Réalisation du projet par **Alexandre MARIE**
## Piquante: Construisez une API sécurisée pour une application d'avis gastronomiques. ##

- Implémenter un modèle logique de données conformément à la réglementation.
- Stocker des données de manière sécurisée.
- Mettre en œuvre des opérations CRUD de manière sécurisée.
- Mettre en place une API REST.

### Conditions préalables à l'initialisation du front-end ###

- Vous aurez besoin d'avoir Node et `npm` installés localement sur votre machine.
- Les dépendances suivantes doivent êtres installées pour lancer l'application:
    - NodeJS 12.14 or 14.0.+
    - Angular CLI 7.0.2.+
    - Node-sass

A la racine du dossier front-end via le terminal saisissez `run npm install` si windows ou `sudo npm install` pour macOs (sudo: mot de passe necessaire) et ensuite `npm install --save-dev run-script-os` 

## Initalisation front-end ##

Il suffit ensuite d'utiliser le terminal via la commande `cd` ce rendre à la racine du dossier `front-end`. Une fois positionné sur le dossier `front-end` exécutez « npm start ». Cela devrait à la fois exécuter le serveur local et lancer votre navigateur.
Si votre navigateur ne démarre pas ou affiche une erreur 404, accédez à http://localhost:8080 dans votre navigateur.
L'application devrait se recharger automatiquement lorsque vous modifiez un fichier.
Utilisez `Ctrl+C` dans le terminal pour arrêter le serveur local.
  
### Conditions préalables à l'initialisation du back-end ###
Vous aurez besoin d'avoir Node et `npm` installés localement sur votre machine.
A la racine du dossier back-end via le terminal saisissez `run npm install` si windows ou `sudo npm install` pour macOs (sudo: mot de passe necessaire) 

- Renommer le fichier env.exemple fourni dans le dossier back-end en ".env" pour intégrer le pattern si dessous et y mettre vos informations personnelles (base de données, clé secrète ect...).

- PORT = 3000
- DB_USERNAME = "Username de la base de donnée MONGO_DB"
- DB_PASSWORD = "Password de la base de donnée MONGO_DB"
- DB_CLUSTER = "Cluster de votre base de donnée au format "(Clusterx.xxxx)"
- DB_NAME = "Mon de votre base de donnée MONGO_DB"
- CRYPTOJS_EMAIL = "Votre clé crypto secrète (Chaine de caractère à insérer via générateur de mot de passe recommandé)"
- JWT_KEY_TOKEN = "Votre token secret (Chaine de caractère à insérer via générateur de mot de passe recommandé)"
## Initialisation back-end ##

Il suffit ensuite d'utiliser le terminal via la commande `cd` ce rendre à la racine du dossier `back-end`. Une fois positionné sur le dossier `back-end` saisissez sur le terminal `node server.js`, il devrait alors y avoir un message de confirmation "Listening on port 3000". 