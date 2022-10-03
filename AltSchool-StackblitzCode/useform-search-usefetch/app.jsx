import React, { useState } from 'react';
import './App.css';
import useForm from './hooks/useForm';
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import useFetch from './hooks/useFetch';

export const UserContext = React.createContext([]);

export const UserContextProvider = ({ children }) => {
  const [githubList, setGitHubList] = useState([]);

  return (
    <UserContext.Provider value={{ githubList, setGitHubList }}>
      {children}
    </UserContext.Provider>
  );
};

const Form = ({ handleSubmit, handleChange, inputs }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="github">GitHub Username</label>
      <input
        id="github"
        type="text"
        name="github"
        onChange={handleChange}
        value={inputs.github}
      />
      {/* <h1>Type a valid github username in the input and press enter</h1> */}
    </form>
  );
};

const DisplayGitHubUser = ({ githubList }) => {
  if (githubList?.length === 0) {
    return <div>No User Yet! Please fill the form</div>;
  }

  return (
    <div>
      <ul>
        {githubList.map((username, index) => {
          return <DisplayEachGitHubUser key={index} username={username} />;
        })}
      </ul>
    </div>
  );
};

const DisplayGitHubUserSearch = () => {
  const { githubList: users } = React.useContext(UserContext);
  console.log(users);

  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();

  const handleChangeSearch = (event) => {
    let filter = event.target.value;
    if (filter) {
      setSearchParams({ q: filter, y: 'true' });
    } else {
      setSearchParams({});
    }
  };

  if (users?.length === 0) {
    return <div>No User Yet! Please fill the form</div>;
  }

  return (
    <div style={{ borderRight: '3px solid' }}>
      <input
        value={searchParams.get('q') || ''}
        placeholder="search for a user"
        onChange={handleChangeSearch}
      />
      <ul>
        {users
          .filter((username) => {
            let filter = searchParams.get('filter');
            if (!filter) return true;
            let name = username.toLowerCase();
            return name.includes(filter.toLowerCase());
          })
          .map((username) => {
            return <DisplayEachGitHubUser username={username} />;
          })}
      </ul>
    </div>
  );
};

const DisplayEachGitHubUser = ({ username }) => {
  const { pathname } = useLocation();

  return (
    <li>
      <Link to={pathname == '/' ? `users/${username}` : `${username}`}>
        {username}
      </Link>
    </li>
  );
};

function Home() {
  const { resetForm, inputs, handleChange } = useForm({ github: '' });
  const { githubList: users, setGitHubList } = React.useContext(UserContext);
  console.log(users);

  const handleSubmit = (event) => {
    event.preventDefault();

    // let form = event.target;
    // let githubInput = event.target[0];
    // const username = githubInput.value;
    // set state into the githubList array
    setGitHubList((prev) => {
      return [...prev, inputs.github];
    });
    // form.reset();
    // use resetForm function from the useForm hook
    resetForm();
  };

  return (
    <div className="App">
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputs={inputs}
      />
      {/* <DisplayGitHubUser githubList={users} /> */}
      <DisplayGitHubUserSearch githubList={users} />
      {/* create a paginated version of this DisplayGitHubUser */}
      {/* <DisplayGitHubUserPaginated githubList={githubList} /> */}
    </div>
  );
}

function Users() {
  const { githubList: users } = React.useContext(UserContext);
  console.log(users);
  return (
    <div>
      <h1>Users</h1>
      <div style={{ display: 'flex' }}>
        <DisplayGitHubUserSearch githubList={users} />
        <Outlet />
      </div>
    </div>
  );
}
function User() {
  const { userId } = useParams();
  console.log(userId);
  const { loading, error, data } = useFetch(
    `https://api.github.com/users/${userId}`
  );
  console.log({ loading, error, data });

  if (!loading && error) {
    return <>Error</>;
  }

  return (
    <div style={{ paddingLeft: '15px' }}>
      <h2>User</h2>
      {/* make API to GitHub to get user information */}

      {loading && !data ? (
        <div>Loading</div>
      ) : (
        <main>
          <p>Name: {data && data.name}</p>
          <p>Number of Repos: {data && data.public_repos}</p>
          <p>Location: {data && data.location}</p>
        </main>
      )}
    </div>
  );
}

function Sample() {
  const { userId } = useParams();
  console.log(userId);
  return <div>Sample</div>;
}

const CustomNavLink = ({ to, ...props }) => {
  let activeStyle = {
    textDecoration: 'underline',
    color: 'red',
    transition: 'all 4s',
  };

  return (
    <NavLink
      style={({ isActive }) =>
        isActive ? activeStyle : { textDecoration: 'none' }
      }
      to={to}
      end
      {...props}
    />
  );
};

function Layout() {
  return (
    <nav>
      <h1 className="logo">Welcome to our Router Test App</h1>
      <CustomNavLink to="/">Home</CustomNavLink> |{' '}
      <CustomNavLink to="/users">Users</CustomNavLink>{' '}
    </nav>
  );
}

function App() {
  const [githubList, setGitHubList] = useState([]);

  return (
    <>
      {/* Routes */}
      {/* Layout */}
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path=":userId" element={<Sample />} /> */}
        <Route path="/users" element={<Users />}>
          <Route path=":userId" element={<User />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
