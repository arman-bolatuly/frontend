import { useState } from "react";
import { expressService } from "../../axiosConfig";
import useSWR from "swr";

const initialState = {
  name: "",
  year_of_release: "",
  authorId: "",
};
const Createbooks = () => {
  const { data, error } = useSWR(
    "/api/users",
    () => expressService.get("api/users").then((res) => res.data),
    { fallbackData: [] }
  );

  if (!data) return <div>Loading</div>;
  if (error) return <div>Error: {error}</div>;
  const [book, setBook] = useState(initialState);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      name: book.name,
      year_of_release: parseInt(book.year_of_release),
      authorId: parseInt(book.authorId),
    };
    console.log({ newBook, book });
    await expressService.post("api/books", newBook);
    setBook(initialState);
  };

  function handleChange(e) {
    setBook((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <h1>Createbooks</h1>
      <form onSubmit={handlerSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={book.name}
        ></input>
        <input
          onChange={handleChange}
          type="number"
          name="year_of_release"
          value={book.year_of_release}
        ></input>
        <select name="authorId" value={book.authorId} onChange={handleChange}>
          <option value="">Select AuthorId</option>
          {data.map((user) => {
            return (
              <option value={user.id} key={user.id}>
                {user.name} {user.surname} {user.date_of_birth}
              </option>
            );
          })}
        </select>
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Createbooks;
