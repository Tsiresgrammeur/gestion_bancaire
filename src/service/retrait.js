
const retraitDAO = require('../dao/retrait');
const clientDAO = require('../dao/client')

class RetraitService 
{
  async getRetraits()
  {
    return await retraitDAO.getRetraits();
  }

  async getOneRetrait(numRetrait)
  {
    return await retraitDAO.getOneRetrait(numRetrait);
  }

  async createRetrait(retrait)
  {
    const { numCheck, numCompte, montant, date} = retrait;
    const client = await clientDAO.getOneClient(numCompte);
    console.log(client.solde)
    if(client.solde >= montant )
    {
      return await retraitDAO.createRetrait( numCheck, numCompte, montant, date);
    }
  }

  deleteRetrait(numRetrait)
  {
    return retraitDAO.deleteRetrait(numRetrait);
  }

  updateRetrait(numRetrait,retrait)
  {
    const { numCheck, numCompte, montant, date} = retrait;
    return retraitDAO.updateRetrait(numRetrait, numCheck, numCompte, montant, date);
  }
}

module.exports = new RetraitService();
