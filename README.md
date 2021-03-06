Test technique Axis
---------------------------------------

Stack utilisée: Php 7.3, symfony 4.3, ReactJs 16.12

Connaissances avant de commencer:
- php: php5 dernière manipulation ~2012 basique sans framework
- symfony: aucune
- reacJS: aucune
-> départ de zéro

Structure projet:
- api: dossier contenant le back-end
  méthodes:
    /get/
        users: renvoie la liste des utilisateurs
        groups: renvoie la liste des groupes
    /post/
        user: créé un utilisateur
        group: créé un group
        deleteusers: supprimer une liste d'utilisateurs
- front: dossier contenant le front-end
  réalisé avec des icones libre de droits
- init: dossier contenant le script de création de la bdd (schéma + user spécifique à l'application) à utiliser en root
- screenshots: dossier d'illustration du projet

Initialiser la bdd: créer le schéma de base et le user de l'application avec le script du dossier init, puis lancer la commande 'php bin/console doctrine:schema:create' dans le dossier api pour générer les tables
Lancer le back-end: lancer la commande 'symfony server:start' dans le dossier api (necessite la cli symfony)
Lancer le front-end: lancer la commande 'npm start' dans le dossier front (necessite NodeJs)
Toutes les demandes de l'énnoncé ont été réalisées

Ajouts personnels:
- reactjs-popup pour les popup modal
- react-datepicker pour le choix de la date de naissance
- méthode API POST pour ajouter un groupe pour éviter de faire des inserts à la main

Pistes d'evolutions:
- vérifier la sécurité des données des formulaires
- gérer les accès de l'api
- ajouter popup d'édition d'utilisateur

Temps passé:

J1 (2019/11/17)
setup tools et environnements + tutos reac/symfony: ~2h30
dev back-end: ~4h15
dev front-end: ~3h10

J2 (2019/11/18)
dev front-end: ~4h30

TOTAL = 14h25 (~2 jours-hommes)

---------------------------------------