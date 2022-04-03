const express= require('express');
const clientController= require('../controller/client');
const router = express.Router();

router.get('/api/client/',clientController.getClients);
router.get('/api/client/:id',clientController.getOneClient);
router.post('/api/client/',clientController.createClient);
router.delete('/api/client/:id',clientController.deleteClient);
router.put('/api/client/:id',clientController.updateClient)

module.exports=router;
