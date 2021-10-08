import { Book } from '@prisma/client';

interface BookCardProps {
  book: Book;
  delete: any;
}

export default function BookCard(props: BookCardProps) {
const {id} = props.book;
 console.log("ID: ", id)

  return (
    <div className="border rounded-lg p-4 flex">
      <div className="ml-4">
        <p className="text-xl text-gray-700">
             {props.book.title}
        </p>
        <p className="text-gray-500">{props.book.author}</p>
        <p className="text-xl text-gray-700">
             {props.book.description}
        </p>
      </div>
      <button
        className="md-red-500 rounded-md p-4 text-red-400"
         onClick={props.delete}
      >
        Delete
      </button>
    </div>
  );
}
