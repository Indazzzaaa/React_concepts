import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "./services/api-client";
interface User {
  id: number;
  name: string;
}

const Page_1 = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [err, setErr] = useState("");
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    //   this will help us to stop any anync function
    //  here we are stoppint the api call if users thinks to jump to another page before ther request has been served , in that case this compoenet will unmount automatically return will execute which will abort the call.
    const controller = new AbortController();
    apiClient
      .get<User[]>("/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setErr(error.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    apiClient.delete("/users/" + user.id).catch((err) => {
      setErr(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const newUser = { id: 0, name: "Sumant" };
    const originalUsers = [...users];
    setUsers([newUser, ...users]);

    // we are calling setusers again because after post request this endpoint will return user with updated id.And we are sending new user that we created in body of request, be mind no matter how many new user we'll create each will have the id of 11.
    apiClient
      .post("/users/", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setErr(err.message);
        setUsers([...originalUsers]);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    apiClient.patch("/users/" + user.id, updatedUser).catch((err) => {
      setErr(err.message);
      setUsers([...originalUsers]);
    });
  };

  return (
    <>
      {err && <p className="text-danger">{err}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add User
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-2"
                onClick={() => updateUser(user)}
              >
                Update
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Page_1;
