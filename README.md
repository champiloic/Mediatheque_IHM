# Mediatheque Web

Ce projet est une application web de mediatheque permettant aux utilisateurs de rechercher, consulter et gerer une liste de livres. L'application utilise l'API OpenLibrary pour recuperer les donnees des livres, un stockage local (localStorage et IndexedDB) pour la gestion des utilisateurs, et un systeme simple d'authentification.

---

## Fonctionnalites principales

- Recherche de livres via l'API OpenLibrary
- Visualisation des details d'un livre
- Gestion de comptes utilisateurs (inscription, connexion, profil)
- Ajout de livres à une liste de lecture personnelle (Pas encore completement implementee)

---

## Structure du projet

### Fichiers HTML

- `./src/components/mediatheque.html`  
  Page principale avec la barre de recherche et la navigation utilisateur

- `./src/components/detail.html`  
  Page pour afficher les details d'un livre specifique, avec option d'ajout à la liste

- `./src/components/signup.html`
  Page permentant de s'enregistre dans la base des comptes avec un nom d'utilisateur et un mot de passe

- `./src/components/login.html`
  Page permentant de se connecter avec un compte connu dans la base

- `./src/components/profile.html`
  Page pour consulter l'état du profil connecte et la liste des livres "A lire"


### Fichiers JavaScript

- `./src/ulils/mediatheque.js`  
  Gestion de la recherche et affichage des resultats

- `./src/ulils/database.js`  
  Gestion de la base de donnees locale (IndexedDB) pour l'authentification utilisateur

- `./src/ulits/init.sql`
  Pragramme d'initialisation de la base de donnes des profils

### Fichiers CSS

- `./src/styles/mediatheque.css`  
  Styles pour la page principale

- `./src/styles/detail.css`  
  Styles pour la page des details d'un document

- `./src/styles/login.css`  
  Styles pour la page de connection et d'inscription

- `./src/styles/profile.css`  
  Styles pour la page des details du profil connecte avec la liste de lecture personnelle

---

## Fonctionnement

### Recherche de livres

- L'utilisateur entre une requête dans le champ de recherche
- La recherche est effectuee via l'API OpenLibrary (`search.json` pour les titres et coverId + `b/id/${coverId}-M.jpg` pour les images)
- Le nombre de documents obtenus les resultats correspondants s'affichent avec lien vers la page de details pour chacun des titres

### Details du livre

- Recuperation des details via l'API OpenLibrary (`/works/KEY.json`)
- Affichage de la couverture, titre, auteur(s), description, disponibilite
- Possibilite d'ajouter le livre à une liste personnelle

### Authentification utilisateur

- Utilise `localStorage` pour stocker l'utilisateur courant (`currentUser`)
- Inscription et connexion via la base de donnees IndexedDB (`database.js`)
- Affichage du bouton "Profil" lorsque l'utilisateur est connecte

### Consultation du profile + liste de lecture

- Lors de la visualisation du detail, clic sur "A lire" pour sauvegarder le livre dans la base
