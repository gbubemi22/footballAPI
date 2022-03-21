const express = require('express');
const router = express.Router()


const {
    createTeam,
    getSingleTeam,
    getAllTeams,
    updateTeam,
    deleteTeam,
} = require('../controllers/teamController')

const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');



router
.route('/')
.post(authenticateUser,authorizePermissions('superAdmin'),createTeam)
.get(getAllTeams)


router.route('/:id')
.get(authenticateUser,getSingleTeam)
.patch(authenticateUser,authorizePermissions('superAdmin'),updateTeam)
.delete(authenticateUser,authorizePermissions('superAdmin'),deleteTeam)


module.exports = router;


