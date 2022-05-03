import useSWR from "swr";
import { expressService } from "../../axiosConfig";
import Link from "next/link";

function Books() {
  const { data, mutate, error } = useSWR(
    "api/books",
    () => expressService.get("/api/books").then((res) => res.data),
    { fallbackData: [] }
  );

  if (error) return <div>Error: {error}</div>;
  if (!data) "Loading ...";

  const deleteBook = async (id) => {
    await expressService.delete(`api/books/${id}`);
    await mutate();
  };

  return (
    <div>
      Books:
      <ul>
        {data.map((book) => {
          return (
            <li key={book.id}>
              {book.name}, {book.author.surname} {book.author.name},{" "}
              {book.year_of_release}
              <button onClick={() => deleteBook(book.id)}>Delete</button>
              <Link href={`books/${book.id}`}>
                <a>Edit</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Books;
