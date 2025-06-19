const express = require('express');
const router = express.Router();
const obraController = require('../controllers/obraController');

router.get('/', obraController.getAllObras);
router.post('/', obraController.createObra);
router.get('/:id', obraController.getObraById);
router.put('/:id', obraController.updateObra);
router.delete('/:id', obraController.deleteObra);

router.get('/:id/fiscalizacoes', obraController.getFiscalizacoesByObra);

router.post('/:id/send-email', obraController.sendObraDetails);

module.exports = router;