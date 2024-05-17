const responseModel = {
  id: 'user_id',
  username: 'username',
  email: 'email',
  avatarURL: 'avatar_url',
  type: 'type',
  status: 'status',
  phone: {
    id: 'phone_id',
    ddd: 'phone_ddd',
    number: 'phone_number',
    type: 'phone_type'
  }
}

const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');

// funciones
const existsUser = require('../delete/functions/deleteUser/existsUser');
const getUserData = require('./functions/getUserInfo/getUserData');
const formatToModel = require('../../helpers/formatToModel');

const route = new Route('/get-user', async (req, res) => {
  try {
    const userId = req.user_id;
    if(!await existsUser(userId)){
      throw new ValidationError('El usuario que intentas obtener no existe');
    }
    const user = formatToModel(await getUserData(userId), responseModel);
    res.status(200).json({user});
  }catch(err){
    if(err instanceof ValidationError || err instanceof SQLError){
      return res.status(400).json({error: err.message});
    }
    console.log(err);
    res.status(500).json({error: 'Hubo un error al intentar obtener los datos del usuario'});
  }
});

module.exports = route;