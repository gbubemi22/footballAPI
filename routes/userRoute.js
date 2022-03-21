const express = require('express');
//const { get } = require('mongoose');
const router = express.Router()
const {
getAllUsers,
getSingleUser,
getAdminAndSuperAdmin,
updateUser,
updatePassword,
} = require('../controllers/userController');

const {
    authenticateUser,
    authorizePermissions
} = require('../middleware/authentication')


router.route('/')
.get(authenticateUser,authorizePermissions('admin','superAdmin'), getAllUsers)


router.route('/admins')
.get(authenticateUser,authorizePermissions('superAdmin'), getAdminAndSuperAdmin)

// router.route('/:id')
// .get(authenticateUser,authorizePermissions('superAdmin'), getSuperAdmin)




router.route('/:id')
.get(authenticateUser,getSingleUser)

router
.route('/updateUser')
.patch(authenticateUser, updateUser)
router.route('/updatePassword').patch(authenticateUser, updatePassword)



module.exports = router;