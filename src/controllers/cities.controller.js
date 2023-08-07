import { pool } from "../db.js";

export const GetCities = async (req, res) => {
  try {
    const [result] = await pool.query("Select * from gobernadores g JOIN ciudades c ON g.IdCiudad = c.IdCiudad");
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).send({ message: "unexpected error" }).json();
  }
};