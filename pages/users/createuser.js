import { useState } from "react";
import { expressService } from "../../axiosConfig";

const initialState = {
  name: "",
  surname: "",
  date_of_birth: "",
};
  
const Createuser = () => {
  const [author, setAuthor] = useState(initialState);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: author.name,
      surname: author.surname,
      date_of_birth: author.date_of_birth,
    };
    console.log({ newUser, author });
    await expressService.post("api/users", newUser);
    setAuthor(initialState);
  };

  function handleChange(e) {
    setAuthor((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      <h1>Createuser</h1>
      <form onSubmit={handlerSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={author.name}
        ></input>
        <input
          onChange={handleChange}
          type="text"
          name="surname"
          value={author.surname}
        ></input>
        <input
          onChange={handleChange}
          type="text"
          name="date_of_birth"
          value={author.date_of_birth}
        ></input>
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Createuser;
