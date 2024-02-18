const {db, collection  } = require('../config')

const User = collection(db, 'Users');
const Service = collection(db, 'Services');

module.exports = { User, Service}