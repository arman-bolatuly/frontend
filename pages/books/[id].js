import { expressService } from "../../axiosConfig";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditBook = () => {
  const [book, setBook] = useState({
    name: "",
    year_of_release: "",
    authorId: "",
  });

  const { data } = useSWR(
    "/api/users",
    () => expressService.get("api/users").then((res) => res.data),
    { fallbackData: [] }
  );

  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      expressService.get(`api/books/${id}`).then((res) => {
        setBook({
          name: res.data.name,
          year_of_release: res.data.year_of_release,
          authorId: res.data.authorId,
        });
      });
    }
  }, [id]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      name: book.name,
      year_of_release: parseInt(book.year_of_release),
      authorId: parseInt(book.authorId),
    };
    console.log({ newBook, book });
    await expressService.patch(`api/books/${id}`, newBook);
    alert(`Updated book: ${book.name}, ${book.year_of_release}`);
  };

  function handleChange(e) {
    setBook((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  return (
    <div>
      <h1>Update Books</h1>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditBook;
