# Migration des 41 pages existantes

Proposition associée à `speiros-restructure-2026-10-05.md`. Les destinations ci-dessous sont proposées et ne sont pas encore publiées. Les redirections ne seront activées que lorsque les nouvelles pages existeront. Conserver les anciennes URLs lorsqu'une page garde le même objectif est possible ; la structure de navigation n'impose pas à elle seule un changement d'URL.

« Réécrire » conserve l'objectif mais nécessite une nouvelle vérification. « Fusionner » retire une répétition. « Remplacer » change le parcours. Les captures doivent toutes être réévaluées, même si le sujet reste valable.

| Page actuelle | Action | Destination proposée / justification |
| --- | --- | --- |
| `/` | Réécrire | Accueil Speiros, six tâches et six rubriques |
| `/start` | Réécrire | `/start` — première utilisation orientée recrutement |
| `/start/lemma-101` | Fusionner | `/start/overview` — éviter trois introductions concurrentes |
| `/start/what-is-lemma` | Fusionner | `/start/overview` — produit, supervision et limites |
| `/start/core-concepts` | Réécrire | `/start/concepts` — rôle, candidat, liste, mission, Sender, séquence |
| `/start/home` | Remplacer | `/start/navigation` — Work, Roles, Candidates, Recruiting context |
| `/start/onboarding` | Réécrire | `/start/onboarding` — Welcome, LinkedIn, Your company et reprise |
| `/start/quickstart` | Remplacer | `/start/first-recruitment` — rôle → recherche → sélection → mission |
| `/start/review-first-sequence` | Fusionner | `/work/approve-sequence` — guide unique, relié au démarrage |
| `/start/verify-first-outcome` | Fusionner | `/work/sending-plan` — preuve de résultat, sans doublonner les états |
| `/sender` | Remplacer | `/settings` — comptes, calendrier et outils |
| `/sender/connect-and-activate` | Réécrire | `/settings/connect-linkedin` — connexion et exécution distinctes |
| `/sender/readiness-and-schedule` | Réécrire | `/settings/schedule-capacity` — prérequis et états reliés au dépannage |
| `/sender/pause-reconnect-replace` | Réécrire | `/settings/recover-sender` — distinguer pause, reconnexion, remplacement, transfert |
| `/leads` | Remplacer | `/candidates` — recherche, examen, import, listes et sélection |
| `/leads/import-from-linkedin` | Réécrire | `/candidates/import-linkedin` — distinguer import direct et recherche conversationnelle |
| `/leads/import-spreadsheet` | Réécrire | `/candidates/import-spreadsheet` — feuille, mapping, conflits et résultats |
| `/leads/create-manage-lists` | Réécrire | `/candidates/lists` — liste statique, revue et archive |
| `/leads/organize-and-protect` | Scinder | `/candidates/review-profile`, `/candidates/lists`, `/help/do-not-contact` ; vue personnelle ≠ liste |
| `/missions` | Remplacer | `/work` — supervision ; la création est reliée au rôle et à la sélection |
| `/missions/create-lemma-led` | Remplacer | `/work/prepare-mission` — préparation à partir du parcours Sourcing actuel |
| `/missions/build-manually` | Retirer du démarrage | `/work/existing-manual-missions` si utile pour les missions historiques ; ne plus enseigner l'ancien wizard |
| `/missions/research-and-drafts` | Réécrire | `/work/review-drafts` — contexte, recherches, preuves et textes |
| `/missions/mission-controls` | Scinder | `/work/mission-controls` et `/work/lifecycle` — autorisations vs pause/arrêt/clôture |
| `/missions/pause-hold-complete` | Fusionner | `/work/lifecycle` — portées et effets des gestes |
| `/outbox` | Remplacer | `/work/sending-plan` — nom visible Sending plan dans Work |
| `/outbox/review-sequences` | Réécrire | `/work/approve-sequence` — validation explicite et préparation d'envoi |
| `/outbox/understand-statuses` | Fusionner | `/help/statuses` — source documentaire unique des états |
| `/outbox/resolve-problems` | Réécrire | `/help/sequence` — diagnostic et reprise sans doublon d'envoi |
| `/outbox/handle-replies` | Remplacer | `/work/replies` — Needs you, fil réel, compte récepteur, report et DNC |
| `/reference` | Remplacer | `/help` — référence utile au dépannage ; configuration dans Settings |
| `/reference/about-me` | Remplacer | `/settings/sender-profile` — profil personnel et coordonnées |
| `/reference/about-offer` | Remplacer | `/recruiting/company-context` — entreprise et contexte de recrutement |
| `/reference/roles-and-access` | Réécrire | `/settings/workspace` — membres/invitations et droits vérifiés ; ne pas confondre accès et rôles à pourvoir |
| `/reference/account-data-billing` | Réécrire | `/settings/account` — capacité en rôles ouverts ; droits/export/suppression à vérifier avant de les décrire |
| `/reference/audit-log` | Réécrire | `/help/audit-log` — périmètre réellement visible |
| `/reference/execution-truth` | Fusionner | `/help/statuses` — distinguer approbation, planification et preuve fournisseur |
| `/reference/safety-boundaries` | Scinder | `/work/mission-controls` et `/help/do-not-contact` — frontières placées dans les tâches pertinentes |
| `/reference/timezones` | Réécrire | `/help/timezones` — distinguer horaire Sender, calendrier et affichage |
| `/reference/troubleshooting` | Remplacer | `/help` — orienter vers recherche/import, Sender, séquence et support |
| `/reference/support` | Réécrire | `/help/support` — widget, informations utiles et contact officiel vérifié |

## Nouveaux besoins sans équivalent direct

- Contexte et sources, suggestions et Accept and publish.
- Création et suivi des rôles à pourvoir.
- Recherche conversationnelle et accès aux produits LinkedIn.
- Confirmation explicite des candidats, conflits d'inscription.
- Needs you et Candidate activity.
- Calendrier, ressources candidats, intégrations Beta et outils connectables.
- Invitations de collègues désormais présentes.
- Guides d'accès développeurs dans une livraison avancée ; Voice Beta à auditer séparément.

Les anciens brouillons dans `docs-inventory/private-drafts/` ne seront pas publiés par défaut. Leurs anciennes hypothèses doivent être vérifiées au même titre que les articles actuels.
