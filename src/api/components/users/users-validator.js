const joi = require('joi');

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      password: joi.string().min(6).max(32).required().label('Password'),
      confirmPassword: joi
        .string()
        .min(6)
        .max(32)
        .required()
        .label('confirmPassword'),
    },
  },

  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  // Nomor 3
  changePassword: {
    body: {
      passwordLama: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .label('passwordLama'),
      passwordBaru: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .label('passwordBaru'),
      konfirmasiPassword: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .label('konfirmasiPassword'),
    },
  },
};
