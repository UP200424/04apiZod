import { pool } from "../db.js";
import bycript from "bcryptjs"
import jwt  from "jsonwebtoken";
import { SECRET } from "../config.js";

const encryptPassword = (password) => {
  const salt = bycript.genSaltSync(10);
  return bycript.hashSync(password, salt);
}

const validatePassword = (passwordReceived, password) => {
  return bycript.compareSync(passwordReceived, password);
}

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  const encryptedPass = encryptPassword(password);
  try {
    const [result] = await pool.query(
      "Insert into users (username, password) values (?,?)",
      [username, encryptedPass]
    );
    res.status(201).json(result.insertId);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "unexpected error" });
  }
};

export const getUser = async (req,res) => {
  try {
      const [result] = await pool.query("select * from users");
      res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({message: "unexpected error"});
  }

};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT  * from users WHERE  username = ?"
  const [user] = await pool.query(sql,[username]);
  if (!user || user.length === 0) {
    return res.status(404).json();
  }
  const isMatch = validatePassword(password, user[0].password);
  if (isMatch) {
    const token = jwt.sign({username}, SECRET, {
      expiresIn: 60 * 5
    });
    const authUser = {...user[0], token}
    return res.status(200).json(authUser);
  } else {
    return res.status(400).json({message: "Bad pass"});
  }
  
  
}
