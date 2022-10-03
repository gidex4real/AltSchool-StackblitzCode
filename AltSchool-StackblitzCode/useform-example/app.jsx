import { useRef, useState } from 'react';
import './App.css';
// import useForm from './hooks/useForm';

function App() {
  const [githubList, setGitHubList] = useState([]);
  const formRef = useRef(null);

  // const { resetForm, inputs, handleChange } = useForm({ github: '' });
  // console.log(inputs);

  const handleSubmit = (event) => {
    event.preventDefault();

    let form = event.target;
    console.log(formRef.current);
    console.log(form);
    let githubInput = event.target[0];
    console.log(githubInput);
    const username = githubInput.value;
    // set state into the githubList array
    setGitHubList((prev) => {
      return [...prev, username];
    });
    form.reset();
    // use resetForm function from the useForm hook
    // resetForm();
  };

  return (
    <div className="App">
      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="github">GitHub Username</label>
        <input
          id="github"
          type="text"
          name="github"
          // onChange={handleChange}
          // value={inputs.github}
        />
      </form>
      <div>
        <h1>Type a valid github username in the input and press enter</h1>
        <ul>
          {githubList.map((username) => {
            return (
              <li>
                <a href={`https://github.com/${username}`} target="_blank">
                  {username}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
