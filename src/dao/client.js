const db= require('../../db/db');

class clientDAO {

  async getClients()
  {
    return await db.select().table('client');
  }

  async getOneClient(numCompte)
  {
    return await db('client').where('numCompte',numCompte).first();
  }

  async createClient(numCompte, nomClient)
  {
    await db('client').insert({
      numCompte,
      nomClient,
      solde:0
    });

    return numCompte;
  }

  async deleteClient(numCompte)
  {
   return await db('client').where('numCompte',numCompte).del();
  }

  async updateClient(numCompte, nomClient,solde)
  {
     return db('client').where({ numCompte: numCompte}).update({
      nomClient,
      solde
    });
  }

}

module.exports = new clientDAO();
