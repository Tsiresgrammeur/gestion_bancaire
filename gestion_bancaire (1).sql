CREATE TRIGGER `delRetrait` AFTER DELETE ON `retrait`
 FOR EACH ROW INSERT INTO `audit_retrait` (`ops`, `date`, `numRetrait`, `numCompte`, `anc_montant`, `n_montant`, `username`) VALUES ('delRetrait', CURRENT_DATE, old.numRetrait, old.numCompte, old.montant, '0', (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))

CREATE TRIGGER `deleteCompte` AFTER DELETE ON `client`
 FOR EACH ROW INSERT INTO `audit_compte` (`ops`, `date`, `numCompte`, `anc_solde`, `n_solde`, `username`) VALUES ('delAccount', current_timestamp(), old.numCompte, old.solde, 0, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))

CREATE TRIGGER `delete_versement` AFTER DELETE ON `versement`
 FOR EACH ROW INSERT INTO `audit_versement` (`ops`, `date`, `numVersement`, `numCompte`, `anc_montant`, `n_montant`, `username`) VALUES ('Suppression', CURRENT_DATE, old.numVersement, old.numCompte, old.montant, '0', (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))

CREATE TRIGGER `historiqueRetrait` AFTER INSERT ON `retrait`
 FOR EACH ROW INSERT INTO `audit_operation` (`ops`, `date`, `numCheck`, `numCompte`, `montant`, `username`) VALUES ('Retrait', new.date, new.numCheck, new.numCompte, new.montant, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))

CREATE TRIGGER `historiqueVersement` AFTER INSERT ON `versement`
 FOR EACH ROW INSERT INTO `audit_operation` (`ops`, `date`, `numCheck`, `numCompte`, `montant`, `username`) VALUES ('Versement', new.date, new.numCheck, new.numCompte, new.montant, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))

CREATE TRIGGER `insertCompte` BEFORE INSERT ON `client`
 FOR EACH ROW INSERT INTO `audit_compte` (`ops`, `date`, `numCompte`, `anc_solde`, `n_solde`, `username`) VALUES ('creation', current_timestamp(), new.numCompte, 0, new.solde, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))

CREATE TRIGGER `modification` AFTER UPDATE ON `retrait`
 FOR EACH ROW INSERT INTO `audit_retrait` (`ops`, `date`,`numRetrait`,`numCompte`,`anc_montant`,`n_montant`,`username`) VALUES ('Mise à jour', current_timestamp(),old.numRetrait, old.numCompte, old.montant, new.montant, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))

CREATE TRIGGER `nouveau_retrait` AFTER INSERT ON `retrait`
 FOR EACH ROW UPDATE client SET client.solde= client.solde-new.montant WHERE client.numCompte=new.numCompte

CREATE TRIGGER `nouveau_versement` AFTER INSERT ON `versement`
 FOR EACH ROW UPDATE client SET client.solde= client.solde+new.montant WHERE client.numCompte=new.numCompte

CREATE TRIGGER `updateCompte` AFTER UPDATE ON `client`
 FOR EACH ROW INSERT INTO `audit_compte` (`ops`, `date`, `numCompte`, `anc_solde`, `n_solde`, `username`) VALUES ('Mise à jour', current_timestamp(), old.numCompte, old.solde, new.solde, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))

CREATE TRIGGER `update_versement` AFTER UPDATE ON `versement`
 FOR EACH ROW INSERT INTO `audit_versement` (`ops`, `date`, `numVersement`, `numCompte`, `anc_montant`, `n_montant`, `username`) VALUES ('mise a jour', CURRENT_DATE, old.numVersement, old.numCompte, old.montant, new.montant, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))

CREATE TRIGGER `updatesolde` BEFORE INSERT ON `audit_retrait`
 FOR EACH ROW UPDATE client SET client.solde=client.solde+new.anc_montant-new.n_montant WHERE client.numCompte=new.numCompte

CREATE TRIGGER `updatesoldeVersement` BEFORE INSERT ON `audit_versement`
 FOR EACH ROW UPDATE client SET client.solde=client.solde-new.anc_montant+new.n_montant WHERE client.numCompte=new.numCompte

