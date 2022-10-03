import { useState } from 'react';
import useFetch from './useFetch';

function App() {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useFetch(
    `https://randomuser.me/api/?page=${page}&results=10&seed=abc`
  );
  // const { loading, error, data } = useFetch(
  //   `https://randomuser.me/api/?results=1000&seed=abc`
  // );

  console.log({ loading, error, data });

  // step1
  const PER_PAGE = 5;
  // step2
  const total = data?.results?.length;
  // step3
  const pages = 50;
  // let page = 1
  // Magic of pagination
  // 1 * 10 - 10 = 0
  // 2 * 10 - 10 = 10
  // 3 * 10 - 10 = 20
  // 1 * 5 - 5 = 0
  // 2 * 5 - 5 = 5
  // 3 * 5 - 5 = 10
  const skip = page * PER_PAGE - PER_PAGE;
  // console.log(skip, total);

  // use the useEffect to make api call based on the page.

  if (loading) {
    return <>Loading...</>;
  }

  if (!loading && error) {
    return <>Error</>;
  }

  return (
    <div className="App">
      <h1 className="title">List of Users</h1>
      {/* TODO: another magic with Array.slice() */}
      {/* slice(0, 10) */}
      {/* slice(10, 20) */}
      {/* slice(20, 30) */}

      {/* 0, 0 + 5 slice(0, 5)*/}
      {/* 10, 20 */}
      {/* 20, 30 */}

      {/* 0, 1*10 */}
      {/* 10, 20 */}
      {/* 20, 30 */}

      {data?.results
        // .slice(skip, skip + PER_PAGE)
        // .slice((page - 1) * PER_PAGE, page * PER_PAGE)
        .map((each, index) => {
          const name = `${each.name.title} ${each.name.first} ${each.name.last}`;
          return (
            <li key={name.toLowerCase().replaceAll(' ', '')}>{`${
              index + 1
            }.${name}`}</li>
          );
        })}
      {
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          prev
        </button>
      }
      <p className="pagination">
        Pages: {page} of {pages}
      </p>
      {
        <button
          disabled={page >= pages}
          aria-disabled={page >= pages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          next
        </button>
      }
      {/* another magic here */}
      {Array.from({ length: pages }, (value, index) => index + 1).map(
        (each) => (
          <button onClick={() => setPage(each)}>{each}</button>
        )
      )}
    </div>
  );
}

export default App;
