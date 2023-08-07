
import { pool } from "../db.js";

export const Ping = async (req,res) => {
    const [result] = await pool.query("select 1+1 as resultadoPing");
    return res.status(200).send(result).json();
}