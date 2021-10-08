import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const book: Prisma.BookCreateInput = JSON.parse(req.body);
    const savedBook = await prisma.book.create({ data: book });
    res.status(200).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};