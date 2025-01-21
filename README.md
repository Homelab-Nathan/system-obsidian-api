# Objectifs : 
- Exposer une api pour récupèrer le contenu des notes obsidians

## Réalisation :
### Initialisation :
- Pull le repo si il ne le trouve pas
- fait la commande git ls-remote https://github.com/Homelab-Nathan/system-obsidian-vault | sha256sum, et stocke le hash.
- Toutes les heures (?), il réexecute cette commande, si il y a une diff, on pull les notes.

### Api : 
#### FindAll
- Check si il y a des modifs avec le git ls-remote (si oui pull)
- Liste les fichiers, et renvoi les infos (titre, content, id)

### Config
Fichier .env : 
GIT_TOKEN=