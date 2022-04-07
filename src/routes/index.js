const express= require('express');
const clientController= require('../controller/client');
const versementController= require('../controller/versement');
const retraitController= require('../controller/retrait');
const userController= require('../controller/user');
const router = express.Router();

router.get('/api/client/',clientController.getClients);
router.get('/api/client/:id',clientController.getOneClient);
router.post('/api/client/',clientController.createClient);
router.delete('/api/client/:id',clientController.deleteClient);
router.put('/api/client/:id',clientController.updateClient)


router.get('/api/versement/',versementController.getVersements);
router.get('/api/versement/:id',versementController.getOneVersement);
router.post('/api/versement/',versementController.createVersement);
router.delete('/api/versement/:id',versementController.deleteVersement);
router.put('/api/versement/:id',versementController.updateVersement)

router.get('/api/retrait/',retraitController.getRetraits);
router.get('/api/retrait/:id',retraitController.getOneRetrait);
router.post('/api/retrait/',retraitController.createRetrait);
router.delete('/api/retrait/:id',retraitController.deleteRetrait);
router.put('/api/retrait/:id',retraitController.updateRetrait)


router.get('/api/user/',userController.getUsers);
router.post('/api/login/',userController.authenticate);
router.get('/api/user/:id',userController.getOneUser);
router.post('/api/user/',userController.createUser);
router.delete('/api/user/:id',userController.deleteUser);
router.put('/api/user/:id',userController.updateUser)


module.exports=router;
