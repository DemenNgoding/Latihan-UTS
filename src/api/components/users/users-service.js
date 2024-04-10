const usersRepository = require('./users-repository');
const { hashPassword } = require('../../../utils/password');
const bcrypt = require('bcrypt');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

// nomor 1
/**
 * mendapatkan detail dari user
 * @param {string} id
 * @returns {Object}
 */
async function cekEmailAmbil(email) {
  const exits = await usersRepository.checkEmail(email);
  return exits;
}

// Nomor 3
/**
 * komparasi passwords
 * @param {string} inputPassword
 * @param {string} hashedPassword
 * @returns {boolean}
 */
async function comparePasswords(inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}

/**
 * Change user password
 * @param {string} id - User ID
 * @param {string} passwordLama - Old Password
 * @param {string} passwordBaru - New Password
 * @param {string} konfirmasiPassword - Confirm New Password
 * @returns {boolean}
 */
async function changePassword(id, passwordLama, passwordBaru, confirmPassword) {
  const user = await usersRepository.getUser(id);

  if (!user) {
    return null; // User not found
  }

  // Check if old password matches
  const isOldPasswordCorrect = await comparePasswords(
    passwordLama,
    user.password
  );
  if (!isOldPasswordCorrect) {
    return false;
  }

  if (passwordBaru !== confirmPassword) {
    return false;
  }

  const hashedNewPassword = await hashPassword(passwordBaru);

  try {
    await usersRepository.updatePassword(id, hashedNewPassword);
  } catch (err) {
    return false;
  }

  return true;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  cekEmailAmbil,
  changePassword,
  comparePasswords,
};
