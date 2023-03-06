import "./styles.css";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [todos, setTodos] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleDisplayBtn = () => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      // console.log("response" + res.data);
      setData(res.data);
    });
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        // console.log("Todos " + res.data);
        setTodos(res.data);
      })
      .catch((e) => {
        console.log("Error happened" + e);
      });
    setShowTable(!showTable);
  };
  const handleLoad = (item) => {
    return todos.filter((each) => each.userId === item.id).length;
  };

  return (
    <div className="App">
      <button onClick={handleDisplayBtn}>Display Details</button>

      {showTable && (
        <table>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>count</th>
          </tr>

          {data.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{handleLoad(item)}</td>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
}
