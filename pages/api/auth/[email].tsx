import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../../config/db";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      return postLoginData(req, res);
    case "DELETE":
      return deleteLogindata(req, res);
    case "GET":
      return getLoginDataById(req, res);
    default:
      return res.status(400).json("error method");
  }

  async function postLoginData(req: NextApiRequest, res: NextApiResponse) {
    const { id, email, pass } = req.body;
    try {
      const result = await executeQuery(
        "INSERT INTO login_data(id, email, pass) VALUES(?,?,?)",
        [id, email, pass]
      );
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async function deleteLogindata(req: NextApiRequest, res: NextApiResponse) {
    const { id, email } = req.body;
    try {
      const result = await executeQuery(
        "DELETE FROM login_data WHERE id=? AND email=?",
        [id, email]
      );
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async function getLoginDataById(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.query;
    try {
      const result = await executeQuery(
        "SELECT * FROM login_data WHERE email=?",
        [email]
      );
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
};

export default handler;
