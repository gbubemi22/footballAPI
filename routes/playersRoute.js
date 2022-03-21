const express = require('express');
const router = express.Router()


const {
    createPlayer,
    getSinglePlayer,
    getAllPlayers,
    updatePlayer,
    deletePlayer,
   
} = require('../controllers/playerController')

const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');
  
  



router
.route('/')
.post(authenticateUser,authorizePermissions('superAdmin'),createPlayer)
.get(getAllPlayers)


router.route('/:id')
.get(authenticateUser,getSinglePlayer)
.get(authenticateUser,getSinglePlayer)
.patch(authenticateUser,authorizePermissions('superAdmin'),updatePlayer)
.delete(authenticateUser,authorizePermissions('superAdmin'),deletePlayer)



module.exports = router;


