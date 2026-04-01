Cette API REST a été développée avec `Node.js` et `Express.js`. Elle permet de gérer les catways, les réservations
et les utilisateurs du port de plaisance Russell.
Toutes les vues sont rendues côté serveur grâce au moteur de templates EJS.
La base de données utilisée est MongoDB, accessible via Mongoose.

## Installation

1. Cloner ce dépôt : https://github.com/Prin0u/devoir-api-port-plaisance-russell
2. Créer un fichier .env contenant ces variables d'environnement nécessaires :
   MONGODB_URI=mongodb://...
   JWT_SECRET=votre_secret
   PORT=3000
3. Lancer le serveur avec `npm start`

## Authentification

L'authentification repose sur des tokens JWT stockés dans un cookie HTTP. Pour accéder aux routes protégées,
l'utilisateur doit d'abord se connecter via `POST /users/login`.
Le token est alors automatiquement inclus dans les requêtes suivantes, et supprimé à la déconnexion via `POST /users/logout`.
Les mots de passe sont hashés en base de données grâce à `bcrypt`.

## Utilisateurs

La gestion des utilisateurs permet de créer un compte via la route `POST /users` et de se connecter via la route `POST /users/login`.
Toutes les routes nécessitent une authentification : consultation, modification et suppression sont accessibles via `GET, PUT` et `DELETE`
sur `/users/:email`, et la liste complète des utilisateurs est disponible sur `GET /users`.

## Catways

Les catways peuvent être créés, listés, consultés, modifiés, et supprimés via les routes classiques CRUD sur `/catways` et `/catways/:id`.
Toutes ces routes nécessitent une authentification.

## Réservations

Les réservations suivent le même fonctionnement CRUD sur `/reservations`et `/reservations/:id`, permettant de créer, lister, consulter, modifier
et supprimer une réservation. Toutes ces routes nécessitent une authentification.

## Tableau de bord et documentation

Le tableau de bord affiche les réservations en cours et est accessible aux utilisateurs connectés. La documentation de l'API est consultable
librement.
