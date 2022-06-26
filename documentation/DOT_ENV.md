# Surcharge des variables d'environnement

L'application possède plusieurs environnements et elle a donc besoin de plusieurs configurations. Il est possible de
surcharger ces différents environnements via des fichiers de configuration appelés `.env` (prononcé _Dot Env_).

## Commun à tous les environnements

Si votre variable est commune à tous les environnements, celle-ci doit être placée dans le fichier [.env][env] qui se
trouve à la racine du projet.

[env]: ./../.env

## Développement

Pour vos développements en local, il existe un fichier [.env.development][env_dev]. Toutes les variables qui ne sont
nécessaires que pour le développement doivent être placées dans ce fichier.

[env_dev]: ./../.env.development

Dans le cas où vous avez besoin de surcharger une variable, mais qui ne doit pas être commitée par la suite, il est
nécessaire de créer un fichier **.env.development.local**.

## Test

Pour vos tests, il existe un fichier [.env.test][env_test]. Toutes les variables qui ne sont nécessaires que pour les
tests doivent être placées dans ce fichier.

[env_test]: ./../.env.test

Dans le cas où vous avez besoin de surcharger une variable, mais qui ne doit pas être commitée par la suite, il est
nécessaire de créer un fichier **.env.test.local**.

## Production

Pour la production, il existe un fichier [.env.production][env_prod]. Toutes les variables qui ne sont nécessaires que
pour les tests doivent être placées dans ce fichier.

[env_prod]: ./../.env.production

### Recette

Pour un déploiement en recette, le fichier [.env.recette][env_recette], le fichier est renommé en
**.env.production.local** ce qui permet de surcharger le fichier [.env.production][env_prod].

[env_recette]: ./../.env.recette

### Staging

Pour un déploiement en preprod, le fichier [.env.staging][env_pp], le fichier est renommé en **.env.production.local**
ce qui permet de surcharger le fichier [.env.production][env_prod].

[env_pp]: ./../.env.staging

## Source

- [Adding Custom Environment Variables][source]

[source]: https://create-react-app.dev/docs/adding-custom-environment-variables/