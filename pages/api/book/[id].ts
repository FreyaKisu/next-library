import { PrismaClient, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// DELETE /api/book/:id
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const bookId = req.query.id;

  if (req.method === "DELETE") {
    try {
      const book = await prisma.book.delete({
        where: { id: String(bookId) },
      });

      res.json(book);
    } catch (err) {
      res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
};
