const db= require('../../db/db');

class versementDAO {

  async getVersements()
  {
    return await db.select().table('versement');
  }

  async getOneVersement(numVersement)
  {
    return await db('versement').where('numCompte',numVersement).first();
  }

  async createVersement(numCheck, numCompte, montant, date)
  {
    await db('versement').insert({
      numCheck,
      numCompte,
      montant,
      date
    });

    return numCompte;
  }

  async deleteVersement(numVersement)
  {
   console.log('fjdk');
   return await db('versement').where('numVersement',numVersement).del();
  }

  async updateVersement(numVersement,numCheck, numCompte, montant, date)
  {
     return db('versement').where({ numVersement: numVersement}).update({
      numCheck,
      numCompte,
      montant,
      date
    });
  }

}

module.exports = new versementDAO();
