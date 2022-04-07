const db= require('../../db/db');

class audit_CompteDAO {

  async getAudit(first_date,second_date)
  {
    return await db.select(
      'id','ops','date',
      'audit_versement.numCompte', 'anc_montant',
      'n_montant','client.nomClient',
      'user.username','user.name'
    ).from('audit_versement')
      .innerJoin('client','audit_versement.numCompte','client.numCompte')
      .innerJoin('user','audit_versement.username','user.username')
      .whereBetween('audit_versement.date',[first_date,second_date]);
      //.where('audit_versement.date','<', second_date)
      //  .andWhere('audit_versement.date','>', first_date);
  }
}

module.exports = new audit_CompteDAO();