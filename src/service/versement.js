const versementDAO = require('../dao/versement');

class VersementService 
{
  async getVersements()
  {
    return await versementDAO.getVersements();
  }

  async getOneVersement(numVersement)
  {
    return await versementDAO.getOneVersement(numVersement);
  }

  async createVersement(versement)
  {
    const { numCheck, numCompte, montant, date} = versement;
    return await versementDAO.createVersement( numCheck, numCompte, montant, date);
  }

  deleteVersement(numVersement)
  {
    return versementDAO.deleteVersement(numVersement);
  }

  updateVersement(numVersement,versement)
  {
    const { numCheck, numCompte, montant, date} = versement;
    return versementDAO.updateVersement(numVersement, numCheck, numCompte, montant, date);
  }
}

module.exports = new VersementService();
