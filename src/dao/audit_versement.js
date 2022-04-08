const db= require('../../db/db');

class audit_versementDAO {

  async getAudit(first_date,second_date)
  {
    if(first_date && second_date)
    {
      return await db.select(
        'id','ops','date',
        'audit_versement.numCompte', 'anc_montant',
        'n_montant','client.nomClient',
        'user.username','user.name'
      ).from('audit_versement')
        .leftJoin('client','audit_versement.numCompte','client.numCompte')
        .leftJoin('user','audit_versement.username','user.username')
        .whereBetween('audit_versement.date',[first_date,second_date]);
    }

      return await db.select(
        'id','ops','date',
        'audit_versement.numCompte', 'anc_montant',
        'n_montant','client.nomClient',
        'user.username','user.name'
      ).from('audit_versement')
        .leftJoin('client','audit_versement.numCompte','client.numCompte')
        .leftJoin('user','audit_versement.username','user.username')
  }
}

module.exports = new audit_versementDAO();
