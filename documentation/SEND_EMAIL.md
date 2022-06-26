# Se rendre sur la base de donnée back en local

1. executer le repo api en local `make start`
2. se rendre sur localhost:8025 (Mailhog) => les emails envoyées par le serveur en local devraient se retrouver dans cette boite de réception

S'il n'y est pas, ajouter MAILER_DSN='smtp://mailhog:1025 au .env du repo api puis lancer un `make reset` && `make restart`
