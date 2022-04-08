const db= require('../../db/db');

class audit_retraitDAO {

  async getAudit(first_date,second_date)
  {
    if(first_date && second_date)
    {
    return await db.select(
      'id','ops','date',
      'audit_retrait.numCompte', 'anc_montant',
      'n_montant','audit_retrait.nomClient',
      'user.username','user.name'
    ).from('audit_retrait')
      .leftJoin('user','audit_retrait.username','user.username')
      .whereBetween('audit_retrait.date',[first_date,second_date]);
    }

    return await db.select(
      'id','ops','date',
      'audit_retrait.numCompte', 'anc_montant',
      'n_montant','audit_retrait.nomClient',
      'user.username','user.name'
    ).from('audit_retrait')
      .leftJoin('user','audit_retrait.username','user.username')
  }
}

module.exports = new audit_retraitDAO();
