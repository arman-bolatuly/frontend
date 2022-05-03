import { expressService } from "../../axiosConfig";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [author, setAuthor] = useState({
    name: "",
    surname: "",
    date_of_birth: "",
  });

  useEffect(() => {
    if (id) {
      expressService.get(`api/users/${id}`).then((res) => {
        setAuthor({
          name: res.data.name,
          surname: res.data.surname,
          date_of_birth: res.data.date_of_birth,
        });
      });
    }
  }, [id]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: author.name,
      surname: author.surname,
      date_of_birth: author.date_of_birth,
    };
    console.log({ newUser });
    await expressService.patch(`api/users/${id}`, newUser);
    alert(
      `Updated user: ${author.name} ${author.surname}, ${author.date_of_birth} `
    );
  };

  function handleChange(e) {
    setAuthor((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div>
      <h1>Update users</h1>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditUser;
