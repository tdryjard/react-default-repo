# Docker

Le projet est entièrement dockerisé pour le développement en local. Pour l'installation du projet, référez-vous à la
documentation correspondante.

## Makefile

Le [Makefile][makefile] est un fichier regroupant diverses commandes servant au projet. Certaines seront explicitées
plus bas dans ce document. Il est vivement conseillé de regarder ce fichier et si besoin le modifier pour ajouter
d'autres commandes utiles au projet.

[makefile]: ../Makefile

Il est possible de taper la commande `make` (ou `make help`) pour connaitre la liste de toutes les commandes disponibles
ainsi que leurs actions.

## Gestion des containers

- Pour lancer les containers : `make start`
- Pour stoper les containers : `make stop`
- Pour relancer les containers : `make restart`

## Connexion au container

- Pour se connecter au container de dev : `make shell`