const db = require('./db');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

async function createUser({ full_name, email, password, role = 'user' }) {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const q = `insert into users(full_name,email,password_hash,role) values($1,$2,$3,$4) returning id,uuid,full_name,email,role,created_at`;
    const { rows } = await db.query(q, [full_name, email, hash, role]);
    return rows[0];
}

async function verifyUser(email, password) {
    const q = `select id,password_hash,uuid,full_name,email,role from users where lower(email)=lower($1)`;
    const { rows } = await db.query(q, [email]);
    if (!rows.length) {
        console.warn('verifyUser: no user found for email', email);
        return null;
    }
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
        console.warn('verifyUser: password mismatch for user id', user.id);
        return null;
    }
    await db.query('update users set last_login=now() where id=$1', [user.id]);
    delete user.password_hash;
    return user;
}

module.exports = { createUser, verifyUser };