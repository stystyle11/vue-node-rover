import pool from '../../db.js';

class Rover {
  static async create({ name, color }) {
    const sql = `INSERT INTO rovers (name, color) VALUES (?, ?)`;
    const [result] = await pool.execute(sql, [name, color]);
    return result.insertId;
  }

  static async findById(id) {
    const sql = `SELECT * FROM rovers WHERE id = ?`;
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  }

  static async findAll() {
    const sql = `SELECT * FROM rovers`;
    const [rows] = await pool.execute(sql);
    return rows;
  }

  static async update(id, { name, color }) {
    const sql = `UPDATE rovers SET name = ?, color = ? WHERE id = ?`;
    await pool.execute(sql, [name, color, id]);
    return this.findById(id);
  }

  static async delete(id) {
    const sql = `DELETE FROM rovers WHERE id = ?`;
    await pool.execute(sql, [id]);
  }
}

export default Rover;
