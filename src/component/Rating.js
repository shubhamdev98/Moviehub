import { useState } from "react";
const userList = ["harry", "jerry", "Tom"];
function App() {
  const [friendList, setFriendList] = useState(userList);
  const [name, setName] = useState("");
  function handleFormSubmit(e) {
    e.preventDefault();
    setFriendList((friendList) => [...friendList, name]);
  }

  function addUserName(e) {
    setName(e.target.value);
  }
  return (
    <div className="">
      <h1>Add Form</h1>
      <AddForm submitForm={handleFormSubmit} addUserName={addUserName} />
      <div>
        <ul>
          {friendList.map((friend, i) => (
            <li key={i}>{friend}</li>
          ))}
        </ul>
      </div>
      <StarRating maxRating={5} />
    </div>
  );
}

function AddForm({ submitForm, addUserName }) {
  return (
    <form onSubmit={submitForm}>
      <label>name</label>
      <input type="text" onChange={addUserName} />
      <button type="submit">Add</button>
    </form>
  );
}
export default App;

function StarRating({ maxRating = 5 }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  return (
    <div style={containerStyle}>
      <div style={startContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            onRate={() => setRating(i + 1)}
            full={tempRating >= i + 1 ? tempRating : rating >= i + 1}
            onMouseIn={() => setTempRating(i + 1)}
            onMouseOut={() => setTempRating(0)}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
}

const starStyle = {
  width: "48px",
  height: "48px",
  display: "block",
  cursor: "pointer",
};

function Star({ onRate, full, onMouseIn, onMouseOut }) {
  console.log(full);
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onMouseIn}
      onMouseLeave={onMouseOut}
    >
      {full ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="fill">
          <path d="M12 0l2.427 7.473h7.817l-6.307 4.576 2.427 7.473L12 17.946l-6.334 4.576 2.427-7.473-6.307-4.576h7.817z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
        >
          <path d="M12 0l2.427 7.473h7.817l-6.307 4.576 2.427 7.473L12 17.946l-6.334 4.576 2.427-7.473-6.307-4.576h7.817z" />
        </svg>
      )}
    </span>
  );
}

const containerStyle = {
  display: "flex",
  width: "30%",
  alignItems: "center",
  gap: "16px",
  color: "white",
  marginBottom: "2px",
};
const startContainerStyle = {
  display: "flex",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
  color: "#000",
};
