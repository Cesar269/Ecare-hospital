const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const UsersService = require('./../services/usersService');

const router = express.Router();
const service = new UsersService();

// router.get('/', async (req, res) => {
//   try{
//     const users = await service.find();
//     res.status(200).json(
//       users
//     );
//   }catch(error) {
//     res.status(404).json({
//       message: error.message
//     });
//   }
// });

// Registrase
// router.post('/', async (req, res) => {
//   try {
//     const body = req.body;
//     const result = await service.create(body);
//     res.status(201).json({
//       message: 'Usuario registrado exitosamente',
//       result
//     });
//   }catch(error) {
//     res.status(500).json({
//       message: error.message
//     });
//   }
// });

// router.post('/login', async (req,res) =>{
//   try {
//     const body = req.body;
//     const result = await service.login(body);
//     if(result.length != 0){
//       if(result[0].password == md5(body.password)){
//         const userForToken = {
//           user:body.name
//         }
//         const token = jwt.sign(userForToken,'palabraSecreta');

//         res.status(200).json({
//           token
//         });

//       }
//       else{
//         res.status(200).json({
//           message:"Contrasena incorrecta"
//         });
//       }    
//     }else{
//       res.status(200).json({
//         message:"El usuario no existe"
//       });
//     }
    
//   } catch (error) {
//     res.status(500).json({
//       message: error.message
//     });
//   }
// });


module.exports = router;
