import React from 'react';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import client from './client';
import useForm from './lib/useForm';

function App() {
  return (
    <ApolloProvider client={client}>
      <Repos />
    </ApolloProvider>
  );
}
const REPOS_QUERY = gql`
  query repoQuery($after: String, $first: Int!) {
    viewer {
      repositories(first: $first, isFork: true, after: $after) {
        edges {
          node {
            id
            name
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
`;

function Repos() {
  const { data, error, loading, fetchMore, refetch } = useQuery(REPOS_QUERY, {
    variables: { after: null, first: 5 },
  });
  const { inputs, handleChange } = useForm({ first: 5 });
  // console.log(inputs);
  if (error) return <div>errors</div>;
  if (loading || !data) return <div>loading</div>;

  return (
    <>
      <ul>
        {data.viewer.repositories.edges.map(({ node }) => (
          <li key={node.id}>{node.name}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          const { endCursor } = data.viewer.repositories.pageInfo;

          fetchMore({
            variables: { after: endCursor },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              fetchMoreResult.viewer.repositories.edges = [
                ...prevResult.viewer.repositories.edges,
                ...fetchMoreResult.viewer.repositories.edges,
              ];
              return fetchMoreResult;
            },
          });
        }}
      >
        more
      </button>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (event.keys === 'Enter') {
            console.log('Enter was pressed');
          }
          refetch({ after: null, first: inputs.first });
        }}
      >
        <label htmlFor="paginationSize">
          <input
            type="number"
            name="first"
            id="paginationSize"
            value={inputs.first}
            onChange={handleChange}
          />
        </label>
      </form>
    </>
  );
}

export default App;
