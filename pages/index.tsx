import { useState, useEffect } from "react";
import Head from "next/head";
import AddBookForm from "./../components/AddBookForm";
import BookCard from "./../components/BookCard";
import { PrismaClient, Book, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const books: Book[] = await prisma.book.findMany();
  return {
    props: {
      initialBooks: books,
    },
  };
}

async function saveBook(book: Prisma.BookCreateInput) {
  const response = await fetch("/api/books", {
    method: "POST",
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
async function deleteBook(id: string) {
  const response = await fetch(`/api/book/${id}`, {
    method: 'DELETE',
  });

  console.log("BOOK TO DELETE RES: ", response)
  if (!response.ok) {
      console.error(response.statusText);
  }
  alert(`Book with ID: ${id} has been successfully removed.`)
  return await response.json();

}


export default function Index({ initialBooks }) {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  useEffect(() => {
    console.log('effect will run if books has changed ', books);
  },[books]);
  return (
    <>
      <Head>
        <title>Next Library</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="flex">
        <section className="w-1/3 bg-gray-800 h-screen p-8">
          <div className="mb-3">
            <h2 className="text-3xl text-white">Add a Book</h2>
          </div>
          <AddBookForm
            onSubmit={async (data, e) => {
              try {
                await saveBook(data);
                setBooks([...books, data]);
                e.target.reset();
              } catch (err) {
                console.error(err);
              }
            }}
          />
        </section>
        <section className="w-2/3 h-screen p-8">
          <div className="mb-3">
            <h2 className="text-3xl text-gray-700">Books</h2>
          </div>
          {books.map((b, i: number) => (
            <div className="mb-3" key={i}>
              <BookCard book={b} delete= {async() => {
              try {
                await deleteBook(b.id);
              } catch (err) {
                console.error(err);
              }
            }}/>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
