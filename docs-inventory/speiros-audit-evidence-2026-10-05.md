# Preuves de l'audit Speiros

Document de travail daté du 5 octobre 2026, associé à `speiros-restructure-2026-10-05.md`. Produit audité sur `wilu-web` `origin/main` à `162f6b07b8bf1011e8f231d0c077a4db4ae82d03`. Trois audits indépendants en lecture seule : découverte/contexte, exécution, comptes/intégrations. Les numéros de ligne correspondent à cette révision, pas au checkout local.

## Vérification de l'interface en production

Le coordinateur a constaté, sans modifier les données :

- Navigation : Start recruiting, Work, Roles, Candidates, Recruiting context.
- Work : Needs you, Sending plan, Candidate activity ; les décisions et réponses doivent être présentées ici.
- Start recruiting : Choose a role, Create a role, Explore without a role. Le dialogue a été fermé sans démarrer de session.
- Recruiting context : recherche des sections, Sources et conversation. Aucun contexte n'a été publié.
- Menu du compte : Settings, How it works, Support, Account & billing.
- Settings → Sender : LinkedIn, WhatsApp, Email ; texte affirmant LinkedIn seul actif V0, autres canaux configurables avant leur rollout ; LinkedIn capabilities ; Sending schedule ; Meeting calendar ; Sender profile.
- Integrations : ATS & candidate systems, explicitement Beta, avec HubSpot/Pipedrive/Attio/Zoho ; Eve tools et Add custom connector.

Les contenus personnels du workspace et les valeurs des comptes ne sont pas reproduits dans ce rapport. Aucune capture de ces données n'est destinée au site documentaire.

## Découverte, contexte et candidats — preuves code

| Sujet | Fichier et ligne | Constat |
| --- | --- | --- |
| Onboarding | `src/lib/gtm/onboarding/fullscreen-contract.ts:21` ; `src/components/gtm/onboarding/fullscreen/workspace-context-step.tsx:114` | Welcome, LinkedIn, Your company ; report des étapes possible ; contexte à examiner avant publication |
| Démarrage | `src/components/gtm/sourcing/start-recruiting-button.tsx:60` | Choisir un rôle ouvert ou explorer sans rôle ; conversation dans `/home?session=...` |
| Conversation | `src/components/gtm/leads/sourcing-workspace.tsx:126` | Recruiting conversation et Show details ; CSV traité par le staging d'import |
| Contexte | `src/components/gtm/settings/knowledge-workspace.tsx:379` et `:554` | Suggested changes ; Reject ; Accept and publish ; Retry publication pour une publication incomplète |
| Candidates | `src/app/(gtm)/leads/page.tsx:18` et `:30` | Titre Candidates ; anciens liens de session redirigés vers Work |
| Import LinkedIn | `src/components/gtm/search-import/search-import-shell.tsx:213` et `:282` | URL, compte, maximum de profils, destination ; maximum récupéré ≠ nombre enregistré |
| Import tableur | `src/components/gtm/leads/import-wizard.tsx:52` et `:487` | CSV/TSV/XLSX/XLS/XLSB/ODS ; feuille, mapping, revue et conflits |
| Listes | `src/components/gtm/list-builder-drawer.tsx:45` ; `src/components/gtm/gtm-list-delete-dialog.tsx:28` | Listes statiques manuelles ou proposées par IA ; archive conserve l'historique |
| Vues personnelles | `src/components/gtm/leads/candidate-view-controls.tsx:129` | Save view et Save changes ; vue personnelle distincte de la liste partagée |
| Sélection | `src/components/gtm/leads/leads-selection-hint.tsx:22` | Sélection par page ; assigner à une mission ne déclenche pas d'outreach |
| Compte de recherche | `src/lib/gtm/leads/import-linkedin/linkedin-account-eligibility.ts:17` | Connexion saine requise ; pause des envois n'empêche pas nécessairement une lecture |

Les opérations Classic, Sales Navigator et Recruiter ont des contrats distincts. Le contrat de sourcing couvre plus d'opérations que le formulaire d'import direct n'en explique : vérifier chaque parcours avant rédaction. Ne pas convertir une capacité du catalogue d'outils en bouton utilisateur supposé.

## Missions, supervision et réponses — preuves code

| Sujet | Fichier et ligne | Constat |
| --- | --- | --- |
| Anciennes créations | `src/app/(gtm)/missions/new/page.tsx:12` ; `src/app/(gtm)/missions/new/manual/page.tsx:12` | Les deux routes redirigent vers le démarrage par rôle |
| Rôle nécessaire | `supabase/migrations/20260928170000_speiros_mission_role_binding.sql:181` | Préparer une mission requiert une session liée à un rôle ouvert |
| Cohorte | `agent/lib/root-tools/prepare_mission_cohort.ts:12` ; `agent/lib/server-functions/sourcing-mission-cohort.ts:122` | Liste statique active exacte, 1–50 personnes, Sender LinkedIn ; préparation sans approbation ni envoi |
| Sender initial | `src/lib/gtm/missions/default-sender.ts:17` | Création résout un Sender LinkedIn connecté ; distinct du compte autorisé ensuite pour une action |
| Confirmation | `src/components/gtm/missions/mission-audience-proposal-card.tsx:150` et `:196` | Confirmer pour recherche et planification ; conflit d'inscription à une autre mission traité explicitement |
| Cockpits | `src/app/(gtm)/missions/[id]/page.tsx:102` | Mission agent et anciennes missions manuelles ont des surfaces distinctes |
| Contrôles | `src/components/gtm/missions/mission-command-header.tsx:406` et `:445` | Pause after this turn, Resume, Review approval, Auto approval, Hold LinkedIn, Complete Mission |
| Auto approval | `src/components/gtm/missions/mission-command-header.tsx:508` | Futures séquences sur canaux autorisés ; ne pas réécrire l'historique des approbations |
| Autorisations de canal | `src/components/gtm/missions/mission-channel-settings.tsx:57` et `:92` | Connexion ≠ autorisation de mission ; révocation bloque les futurs envois et conserve l'historique |
| Sending plan | `src/app/(gtm)/outbox/page.tsx:212` ; `src/components/gtm/work-view-tabs.tsx:5` | `/outbox` présenté comme Sending plan dans Work |
| Approbation | `src/components/gtm/outbox-sequence/outbox-sequence.tsx:1308` et `:2390` | Approve Sequence et Batch approve ; approbation ≠ envoi |
| Réponses | `src/components/gtm/conversation/reply-conversation-actions.tsx:370` | Envoyer, Plus tard, Ne pas répondre, Ne plus contacter ; libellés actuellement français |
| Annulation | `src/app/actions/gtm/home.ts:47` et `:80` | Fenêtre de 10 secondes pour annuler une mise en file ; pas le retrait d'un message déjà envoyé |
| DNC | `src/app/actions/gtm/home.ts:177` ; `docs/product-boundaries.md` | Ne pas répondre et Ne plus contacter ont des effets différents ; DNC global aux canaux/missions |
| Clôture | `src/components/gtm/missions/mission-command-header.tsx:521` | Plan, preuves et historique conservés en lecture seule |

L'historique se trouve dans `src/components/gtm/outbox-sequence/execution-history.tsx` : Current canonical truth, Ambiguous truth, Projection update pending et Partial evidence sont des états distincts. Les tutoriels devront reproduire ces états avec une mission synthétique.

Distinguer cinq gestes : arrêter le tour agent, mettre la mission en pause, suspendre LinkedIn, révoquer un canal et terminer la mission. Une action déjà prise en charge peut continuer après certains de ces gestes. Une réponse reste liée au compte, canal et fil effectivement récepteurs.

## Comptes, intégrations et accès — preuves code

| Sujet | Fichier et ligne | Constat |
| --- | --- | --- |
| Sender | `src/app/(gtm)/settings/channels/page.tsx:68` | Menu Settings → Sender ; anciens `/senders` et `/settings/calendar` redirigés |
| Contradiction des canaux | `src/components/gtm/settings/settings-sender-channel-picker.tsx:48` ; `docs/product-boundaries.md` | Texte V0 LinkedIn-only contre frontière produit multicanal ; disponibilité à vérifier |
| Produits LinkedIn | `src/components/gtm/settings/settings-sender-status.tsx:56` | Classic, Sales Navigator, Recruiter ; Premium ne garantit pas une connexion de ces deux derniers |
| Récupération | `src/components/gtm/settings/settings-sender-shell.tsx:172` et `:291` | Refresh peut ouvrir l'authentification ; remplacement bloqué si travail inachevé lié au Sender |
| Transfert | `src/components/gtm/settings/settings-sender-shell.tsx:260` | Use with Speiros peut arrêter des campagnes ailleurs ; ne pas assimiler à une reconnexion sans conséquences |
| Calendrier | `src/components/gtm/settings/settings-calendar-shell.tsx:143` et `:209` | Un calendrier Google ou Outlook à la fois ; horaires, buffers et notice minimum |
| ATS | `src/components/gtm/settings/crm-integrations-beta.tsx:169` et `:195` | Beta ; contrôles d'import différents par fournisseur, pas de parité Zoho présumée |
| Listes synchronisées | `src/components/gtm/settings/crm-integrations-beta.tsx:350` | Liste mise à jour, sélection d'une mission conservée ; déconnexion ≠ suppression des candidats |
| Outils de Speiros | `src/lib/gtm/mcp/curated-catalog.ts:16` ; `src/components/gtm/settings/public-mcp-servers.tsx:119` | Catalogue et connecteur personnalisé ; autorisations à établir, pas implicites |
| Agents externes | `src/app/(gtm)/settings/developers/page.tsx:39` | Accès développeurs distinct des outils que Speiros utilise |
| Invitations | `src/app/actions/workspace-invitations.ts:60` ; `src/app/(gtm)/settings/workspace/page.tsx:59` | Invitations et demandes d'accès existent ; pas de modèle admin/editor/viewer supposé |
| Facturation | `src/components/gtm/billing/gtm-billing-section.tsx:228` | Capacité en rôles ouverts ; fermer un rôle libère une place ; renvoyer à la page actuelle pour les tarifs |
| Support | `src/components/support/support-widget.tsx:214` | Conversations support et images jointes ; pas de données sensibles dans les captures publiques |
| Voice | `src/app/(gtm)/voice-agents/page.tsx:37` | Beta séparée, profil validé et contexte publié ; audit approfondi avant tutoriel |

## Divergences à ne pas reproduire

- `docs/gtm/mission-assistant-runtime.md` conserve du vocabulaire LinkedIn V0 et des affirmations sur les séquences mixtes qui divergent du schéma et du contexte plus récents. Ne pas sélectionner silencieusement l'une de ces versions.
- Des libellés internes disent encore Home, Outbox, Leads, Knowledge, Eve et prospects. Les titres de guides doivent suivre les écrans Speiros effectivement affichés, en signalant un ancien nom seulement s'il aide à se repérer.
- Le profil legacy de `app.heylemma.com` n'est pas le parcours Speiros par défaut ; ne pas mélanger les deux captures.
- L'ancien inventaire documentaire interdit les invitations, intégrations, sourcing automatique et réutilisation du contexte : ces interdictions datant de juillet doivent être réévaluées, pas reconduites comme vérité actuelle.
- Une intégration visible, un champ de configuration ou une écriture de schéma ne suffit pas à prouver une exécution externe réussie.
