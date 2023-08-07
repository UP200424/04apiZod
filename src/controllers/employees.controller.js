import { pool } from "../db.js";
import jwt  from "jsonwebtoken";
import { SECRET } from "../config.js";

export const CreateWithProcedure = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, salary, gender } = req.body;
  await pool.query(
    `CALL createEmployee(?, ?, ?, ?, ?);`,
    [id, name, lastname, salary, gender],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json(result);
    }
  );
};

export const GetEmployees = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(450).json({message: "unauthorized"})
  }
  const decoded = jwt.verify(token,SECRET);
  console.log(decoded)
  try {
    const [result] = await pool.query("Select * from empleados");
    return res.status(200).json(result);
  } catch (error) {
    //return res.status(500).send({ message: "unexpected error" }).json();
  }
};

export const GetOne = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "select * from empleados where IdEmpleado = ?",
      id
    );
    if (!result || result.length === 0) {
        return res.status(404).json();
      }
    return res.status(200).send(result[0]).json();
  } catch (error) {
    return res.status(500).send({ message: "unexpected error" }).json();
  }
};

export const createEmployee = async (req, res) => {
    const {nombre, apellidos,salario} = req.body
    try {
        const [result] = await pool.query("Insert into empleados (nombre, apellidos, salario) values (?,?,?)", [nombre, apellidos,salario]);
        res.status(201).json(result.insertId);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unexpected error" });
    }
}

export const deleteEmployee = async (req, res) => {
    const {id} = req.params;
    try {
        const [result] = await pool.query("delete from empleados where IdEmpleado = ?", id);
        res.status(200).json(result.affectedRows);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unexpected error" });
    }
}

export const updateEmployee = async (req, res) => {
  //const id = req.params.id
  const { id } = req.params
  const { name, salary } = req.body
  console.log(id, name, salary)
  try {
      // const [result] = await pool.query('UPDATE empleados SET nombre = ?, salario = ? WHERE IdEmpleado = ?', [nombre, salario, id])
      const [result] = await pool.query('UPDATE empleados SET nombre = ifnull(?, nombre), salario = ifnull(?, salario) WHERE IdEmpleado = ?', [name, salary, id])
      // console.log(result)
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' })
      const [rows] = await pool.query('Select * from empleados where IdEmpleado = ?', [id])
      res.status(200).json(rows[0]);
  } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Somethig goes wrong" })
  }
}