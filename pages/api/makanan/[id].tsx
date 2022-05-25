import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../../config/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getAllMakanan(req, res);
    case "DELETE": {
      return deleteMakanan(req, res);
    }
    case "POST": {
      return postMakanan(req, res);
    }
    default: {
      return res.status(400).json("method error");
    }
  }
  async function getAllMakanan(req: NextApiRequest, res: NextApiResponse) {
    try {
      const result = await executeQuery("SELECT * FROM makanan");
      return res.send(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async function getMakananById(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    try {
      const result = await executeQuery(
        `SELECT * FROM makanan WHERE food_id=?`,
        [id]
      );
      return res.send(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async function deleteMakanan(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    try {
      const result = await executeQuery(`DELETE FROM makanan WHERE food_id=?`, [
        id,
      ]);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async function postMakanan(req: NextApiRequest, res: NextApiResponse) {
    const { food_id, food_name, food_price, food_stok } = req.body;
    try {
      const result = await executeQuery(
        "INSERT INTO makanan(food_id, food_name, food_price, food_stok) VALUES(?,?,?,?)",
        [food_id, food_name, food_price, food_stok]
      );
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
};
export default handler;
