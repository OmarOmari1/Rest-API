import dotenv from 'dotenv'
dotenv.config()

import mysql from 'mysql2'

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise()

export async function getPokemons() {
    const result = await connection.query("SELECT * FROM pokemon")
    const rows = result[0]
    return rows;
}

export async function getPokemon(id) {
    const result = await connection.query(
    'SELECT * FROM pokemon WHERE id = ?', [id])
    const rows = result[0]; 
    return rows[0];
}

export async function addPokemon(name, level, type) {
    const result = await connection.query(
    'INSERT INTO pokemon (name, level, type) VALUES (?, ?, ?)'
    , [name, level, type])
    return result;
}

export async function delPokemon(id) {
    const result = await connection.query(
    'DELETE from pokemon WHERE id = ?', [id])
    return result;
}

export async function updatePokemon(id, name, level, type) {
    const result = await connection.query(
    'UPDATE pokemon SET name = ?, level = ?, type = ? WHERE id = ?' , [name, level, type, id])
    return result;
}

