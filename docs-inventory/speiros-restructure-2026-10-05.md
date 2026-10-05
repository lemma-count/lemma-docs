# Plan de refonte du Help Center Speiros

Date : 5 octobre 2026. Statut : structure approuvée et implémentée dans la PR #7 ; publication non effectuée. Les vérifications et limites sont consignées dans `release-validation-2026-10-05.md`.

## Objectif

Conserver la présentation du Help Center, mais organiser les guides autour du parcours de recrutement actuel : préparer le contexte, choisir un rôle, rechercher et sélectionner des candidats, préparer une mission, superviser les actions et reprendre les conversations.

Le plan ci-dessous a guidé la réécriture des pages et de leur navigation dans une prévisualisation. Le site publié reste consultable sur `https://docs.heylemma.com`. Le retour du lien Documentation est préparé séparément dans la PR produit #2373, à livrer après la documentation.

## Sources et limites de vérification

- Ancienne documentation : `lemma-docs` `origin/main` à `1b74f59f6f74ad9a7b754cd82cf2650c4047cc9b` ; 41 pages MDX publiques, dernière modification le 29 juillet 2026.
- Produit : `wilu-web` `origin/main` actualisé à `162f6b07b8bf1011e8f231d0c077a4db4ae82d03`.
- Contexte produit local : `wilu-web/docs/product-boundaries.md`. Ce contexte décrit la direction et les frontières ; il ne prouve pas à lui seul la disponibilité d'une fonction.
- Inspection en lecture seule du produit authentifié le 5 octobre : navigation principale, Work, dialogue Start recruiting, Recruiting context, Settings → Sender et Integrations. Aucun recrutement, envoi, connexion, publication de contexte ou réglage n'a été exécuté.
- Les parcours nécessitant des candidats, un rôle ouvert, une mission active ou une connexion tierce restent à reproduire avec des données synthétiques avant publication de procédures détaillées. L'inspection du code ne vaut pas validation d'une action en production.

Les captures de juillet ne sont pas des preuves actuelles. Leur recapture doit utiliser un environnement de démonstration et des données synthétiques.

## Ce qui change réellement

| Ancienne logique | Constat actuel | Conséquence documentaire |
| --- | --- | --- |
| Produit de prospection Lemma | Contexte produit et navigation Speiros orientés recrutement | Réécrire les exemples, objectifs et concepts autour du rôle et des candidats |
| Entrer par une mission manuelle ou Lemma-led | Les deux anciennes routes de création redirigent vers `/home?startRecruiting=1` | Retirer le choix de ces deux parcours du démarrage |
| Importer des Leads puis créer une mission | Start recruiting ouvre Choose a role avec Create a role et Explore without a role | Enseigner le rôle et la recherche avant la préparation d'une mission |
| Home, Outbox et Missions comme rubriques séparées | Work regroupe Needs you, Sending plan et Candidate activity | Expliquer les décisions, le plan et l'activité dans une rubrique de supervision |
| About me / About offer comme dossiers isolés | Recruiting context présente des sections, sources et une conversation | Documenter le contexte et sa validation ; distinguer le profil du Sender |
| LinkedIn comme seule capacité documentée | L'écran Sender annonce encore LinkedIn seul actif, malgré un contrat produit multicanal | Vérifier la disponibilité effective par canal avant toute promesse |
| Intégrations exclues de la documentation | ATS & candidate systems est visible avec un statut Beta ; outils connectables visibles | Ajouter une rubrique avancée et indiquer clairement la disponibilité et les prérequis |

Preuves principales dans `wilu-web` : `src/app/(gtm)/missions/new/page.tsx`, `src/app/(gtm)/missions/new/manual/page.tsx`, `src/components/gtm/gtm-sidebar-nav.tsx`, `docs/product-boundaries.md`. Les autres preuves sont consignées dans le rapport d'audit associé.

## Présentation à conserver

- Accueil centré sur la recherche et six tâches concrètes.
- Six rubriques peu profondes, articles courts et parcours guidés.
- Fil d'Ariane, navigation de rubrique, sommaire et liens précédent/suivant.
- Recherche, navigation mobile et règles d'accessibilité existantes.
- Captures ciblées seulement lorsqu'elles expliquent une action.

Les noms de marque, liens vers l'application, contacts et illustrations doivent être revérifiés. Le dépôt contient notamment des valeurs par défaut `app.heylemma.com` et `support@heylemma.com` ; ne pas inventer leur remplacement sans vérifier les destinations officielles.

## Arborescence proposée

Les titres ci-dessous sont exprimés en français pour examiner la structure. Les articles du site actuel sont en anglais : conserver l'anglais pour la première livraison évite de mêler cette refonte à une traduction complète. Une version française pourra suivre si souhaitée.

| Rubrique | Question principale | Entrées produit |
| --- | --- | --- |
| Bien démarrer | Comment conduire mon premier recrutement avec Speiros ? | Start recruiting, Work |
| Préparer un recrutement | Quel contexte et quel rôle donner à Speiros ? | Recruiting context, Roles |
| Trouver et sélectionner des candidats | Comment chercher, évaluer et retenir les bonnes personnes ? | Sourcing dans Work, Candidates |
| Superviser le travail | Que dois-je décider, autoriser, suivre ou reprendre ? | Work, Recruiting missions, Sending plan |
| Connecter et configurer | Quels comptes, horaires et outils peut utiliser Speiros ? | Settings, Account & billing |
| Résoudre un problème | Pourquoi le travail est-il bloqué et comment reprendre ? | Statuts, preuves, Audit log, Support |

### Bien démarrer — `/start`

1. Comprendre Speiros et la supervision humaine — `/start/overview`.
2. Se repérer : Work, Roles, Candidates et Recruiting context — `/start/navigation`.
3. Préparer son premier recrutement — `/start/first-recruitment`.
4. Comprendre rôle, candidat, mission, Sender et séquence — `/start/concepts`.
5. Terminer ou reprendre la configuration initiale — `/start/onboarding`.

Le guide de première utilisation relie les articles spécialisés plutôt que de répéter leur contenu. Il s'arrête sur un résultat observable, sans assimiler un brouillon à un envoi ni un clic à un entretien confirmé.

### Préparer un recrutement — `/recruiting`

1. Ajouter le contexte de l'entreprise — `/recruiting/company-context`.
2. Ajouter et gérer les sources de contexte — `/recruiting/context-sources`.
3. Examiner et publier une modification du contexte — `/recruiting/review-context`.
4. Définir et ouvrir un rôle — `/recruiting/create-role`.
5. Suivre un rôle et ses recrutements — `/recruiting/manage-role`.

Préconditions : accès au workspace ; pour les actions propres aux rôles, vérifier les contrôles effectivement proposés. Résultat : contexte accepté et rôle exploitable pour le parcours suivant. La rédaction devra distinguer le profil personnel du Sender du contexte de l'entreprise.

### Trouver et sélectionner des candidats — `/candidates`

1. Démarrer et affiner une recherche avec Speiros — `/candidates/search`.
2. Utiliser LinkedIn Classic, Sales Navigator ou Recruiter — `/candidates/linkedin-products`.
3. Examiner un profil et ses preuves — `/candidates/review-profile`.
4. Importer les personnes retenues — `/candidates/import-linkedin`.
5. Importer un tableur — `/candidates/import-spreadsheet`.
6. Organiser des listes — `/candidates/lists`.
7. Confirmer une sélection pour une mission — `/candidates/confirm-selection`.

Préconditions : produit LinkedIn connecté et accessible pour les recherches correspondantes. Explorer sans rôle ne doit pas être présenté comme suffisant pour préparer une mission : vérifier les préconditions du rôle ouvert, de la sélection et du Sender. Aucun article ne doit suggérer que tous les résultats de recherche seront automatiquement contactés.

La confirmation de la cohorte intervient après la préparation du brouillon de mission : `/candidates/confirm-selection` est une page de transition reliée depuis `/work/prepare-mission`, et non une étape de création préalable de la mission.

### Superviser le travail — `/work`

1. Passer de la sélection à une mission de recrutement — `/work/prepare-mission`.
2. Régler les objectifs, canaux et autorisations — `/work/mission-controls`.
3. Examiner les recherches et les messages préparés — `/work/review-drafts`.
4. Examiner et approuver une séquence — `/work/approve-sequence`.
5. Lire Sending plan et les preuves d'exécution — `/work/sending-plan`.
6. Traiter une décision dans Needs you — `/work/needs-you`.
7. Répondre à un candidat — `/work/replies`.
8. Consulter Candidate activity — `/work/candidate-activity`.
9. Mettre en pause, reprendre ou terminer une mission — `/work/lifecycle`.
10. Reprendre une mission manuelle existante — `/work/existing-manual-missions`, guide secondaire seulement si le parcours reste utile et reproductible.

Préconditions : mission réelle et périmètre autorisé. Chaque article distingue préparation, validation, planification, exécution et confirmation du fournisseur. Les réponses sont reliées à Needs you/Home ; l'ancien titre « Handle replies in Outbox » ne doit pas déterminer le parcours actuel.

### Connecter et configurer — `/settings`

1. Connecter un Sender LinkedIn — `/settings/connect-linkedin`.
2. Vérifier les produits LinkedIn disponibles — `/settings/linkedin-access`.
3. Régler les horaires, capacités et délais — `/settings/schedule-capacity`.
4. Actualiser, reconnecter ou remplacer un Sender — `/settings/recover-sender`.
5. Vérifier le profil du Sender et ses coordonnées — `/settings/sender-profile`.
6. Connecter un calendrier et régler les disponibilités — `/settings/calendar`.
7. Configurer les ressources proposées aux candidats — `/settings/candidate-resources`.
8. Comprendre les intégrations ATS et systèmes candidats — `/settings/candidate-systems`, statut Beta.
9. Connecter un outil utilisable dans les conversations — `/settings/tools`.
10. Changer d'espace et inviter un collègue — `/settings/workspace`.
11. Comprendre le compte et la capacité de rôles — `/settings/account`.

Les accès développeurs (clés API, autorisation d'agents externes et automatisations) forment un ensemble avancé à livrer après le parcours principal. Les connecteurs utilisables par Speiros et les agents externes autorisés à agir dans Speiros doivent rester deux notions distinctes.

Les canaux autres que LinkedIn doivent avoir un statut déterminé par une vérification dédiée avant d'obtenir un guide d'envoi. Les outils tiers nécessitent leur compte et leurs autorisations ; une carte « Ready to connect » ne prouve pas la connexion ni une action réussie.

### Résoudre un problème — `/help`

1. Comprendre les états et les preuves — `/help/statuses`.
2. Diagnostiquer une recherche ou un import bloqué — `/help/search-import`.
3. Diagnostiquer une séquence bloquée ou en échec — `/help/sequence`.
4. Gérer Do not contact — `/help/do-not-contact`.
5. Comprendre les fuseaux horaires — `/help/timezones`.
6. Lire Audit log — `/help/audit-log`.
7. Contacter le support avec les informations utiles — `/help/support`.

La section Voice Agents reste hors du parcours principal : son accès, son statut Beta et ses préconditions doivent faire l'objet d'un audit distinct si l'on décide de la documenter.

## Questions à résoudre avant publication

| Sujet | Preuve disponible | Vérification requise |
| --- | --- | --- |
| Disponibilité multicanal | Contrat produit multicanal ; texte d'interface encore LinkedIn V0 seulement | Vérifier par canal les connexions, autorisations et exécutions réellement disponibles ; résoudre les contradictions |
| Nouveau recrutement complet | Dialogue Start recruiting visible ; code des routes de création vérifié | Reproduire rôle → recherche → sélection → mission → approbation avec données synthétiques |
| Replies | Code et contexte décrivent le retour à Home | Reproduire une réponse reçue, sa validation et le compte destinataire |
| Intégrations | Cartes et étiquettes Beta visibles | Distinguer import, synchronisation, lecture, écriture et reconnect par fournisseur |
| Compte et facturation | Surface Account & billing et autorisations dans le code | Vérifier les offres et les droits affichés ; éviter chiffres ou promesses issus du seul code |
| Domaines et support | Ancienne documentation toujours accessible ; application sur app.speiros.com | Confirmer l'adresse documentaire pérenne et le contact officiel avant adaptation de la marque |

## Organisation de la rédaction parallèle

1. Valider cette structure et les frontières de publication.
2. Première vague de trois rédacteurs : contexte/rôles, recherche/candidats, configuration. Un agent coordinateur conserve la responsabilité des fichiers de navigation et des composants partagés.
3. Deuxième vague : supervision/exécution, démarrage, dépannage. Chaque rédacteur possède une rubrique entière et rédige ses articles un à un ; pas d'édition concurrente d'un même fichier.
4. Relecture croisée des preuves, libellés, prérequis et liens. Réconcilier la terminologie avant assemblage.
5. Vérification des liens et du build ; test responsive et parcours complets ; captures synthétiques actuelles.
6. Publication du Help Center, puis restauration de son lien dans l'application via un changement distinct.

Chaque article doit définir son objectif, ses prérequis, ses étapes, le résultat observable, la reprise en cas d'échec et l'étape suivante. Sa preuve conserve le commit produit et les chemins vérifiés dans `docs-inventory/` ; les détails d'implémentation restent hors des guides destinés aux utilisateurs.

## Entretien

Conserver les inventaires existants comme autorités : mettre à jour `product-map.md`, `coverage-matrix.md`, `screenshot-manifest.md` et `product-defects.md` lors de la rédaction. Ce document est une proposition datée, pas un deuxième catalogue permanent de capacités. À chaque changement d'un parcours produit, réexaminer les articles et captures qui le décrivent.
