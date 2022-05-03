//import useSWRMutation from 'swr/mutation'
import useSWR from "swr";
import { expressService } from "../../axiosConfig";
import Link from "next/link";

function Users() {
  const { data, mutate, error } = useSWR(
    "api/users",
    () => expressService.get("/api/users").then((res) => res.data),
    { fallbackData: [] }
  );

  if (error) return <div>Error: {error}</div>;
  if (!data) "Loading ...";

  const deleteUser = async (id) => {
    await expressService.delete(`http://localhost:3001/api/users/${id}`);
    await mutate();
  };

  return (
    <div>
      Users:
      <ul>
        {data.map((user) => {
          return (
            <li>
              {user.surname} {user.name} {user.date_of_birth}
              <button onClick={() => deleteUser(user.id)}>Delete</button>
              <Link href={`users/${user.id}`}>
                <a>Edit</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Users;
// key={user.id}
