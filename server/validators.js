const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateEmail(email){ return typeof email === 'string' && emailRegex.test(email); }
function validatePassword(p){ return typeof p === 'string' && p.length >= 8; }
module.exports = { validateEmail, validatePassword };