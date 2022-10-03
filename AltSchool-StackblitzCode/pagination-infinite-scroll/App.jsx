import React, { useRef, useState } from 'react';
import axios from 'axios';
import './App.css';

const TOTAL_PAGES = 20;

const UserCard = ({ data }) => {
  const name = `${data.name.title} ${data.name.first} ${data.name.last}`;
  return (
    <>
      <img src={data.picture.medium} alt={data.name.first} />
      <div>
        <p>{name}</p>
        <p>
          {data.location.city},{data.location.count}
        </p>
        <p>{data.email}</p>
      </div>
    </>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const lastElementRef = useRef(null);

  const observer = React.useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      // console.log(first.isIntersecting);
      if (first.isIntersecting) {
        // console.log({ first });
        setPageNum((prev) => prev + 1);
      }
    })
  );

  React.useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      let response = await axios.get(
        `https://randomuser.me/api/?page=${pageNum}&results=20&seed=abc`
      );
      // console.log('called');
      let all = new Set([...allUsers, ...response.data.results]);
      setAllUsers([...all]);
      setLoading(false);
    };

    if (pageNum <= TOTAL_PAGES) {
      fetchUser();
    }
    // console.log(pageNum);
  }, [pageNum]);

  React.useEffect(() => {
    const currentElement = lastElementRef.current;
    // console.log(currentElement);
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    // cleanup
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElementRef]);

  return (
    <div className="App">
      <h1>All Users</h1>

      <div className="grid">
        {allUsers.length > 0 &&
          allUsers.map((user, i) => {
            return (
              <div className="user-card" key={`${user.name.first}-${i}`}>
                <UserCard data={user} />
              </div>
            );
          })}
      </div>
      <p ref={lastElementRef}></p>
      {loading && <p className="big">loading...</p>}

      {pageNum - 1 === TOTAL_PAGES && (
        <p>
          <span role="img" aria-label="emoji">
            ❤️ Infinite Scroll Done
          </span>
        </p>
      )}
    </div>
  );
}
