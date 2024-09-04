import pool from '../../db.js';

class Position {
  static async create({ coordinate_x, coordinate_y, position_facing, rover_id }) {
    const sql = `
      INSERT INTO positions (coordinate_x, coordinate_y, position_facing, rover_id) 
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [coordinate_x, coordinate_y, position_facing, rover_id]);
    return result.insertId;
  }

  static async findById(id) {
    const sql = `SELECT * FROM positions WHERE id = ?`;
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  }

  static async findAllByRoverId(rover_id) {
    const sql = `SELECT * FROM positions WHERE rover_id = ?`;
    const [rows] = await pool.execute(sql, [rover_id]);
    return rows;
  }

  static async update(id, { coordinate_x, coordinate_y, position_facing }) {
    const sql = `
      UPDATE positions 
      SET coordinate_x = ?, coordinate_y = ?, position_facing = ? 
      WHERE id = ?
    `;
    await pool.execute(sql, [coordinate_x, coordinate_y, position_facing, id]);
    return this.findById(id);
  }

  static async delete(id) {
    const sql = `DELETE FROM positions WHERE id = ?`;
    await pool.execute(sql, [id]);
  }
}

export default Position;
