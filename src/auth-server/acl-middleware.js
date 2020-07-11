'use strict';

const Users = require('./users');

module.exports= (capability)=>{
  return (req,res,next) =>{
    console.log('role:::: ',req.users.role);
    console.log({capability});
    return Users.can(req.users.role.includes(capability))
      .then(result =>{
        result ? next() : next('access Denied');
      });
  };
};