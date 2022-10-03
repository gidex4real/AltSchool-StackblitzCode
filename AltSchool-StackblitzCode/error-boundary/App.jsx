import * as React from 'react';
import Sample from './Sample';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}

// class ErrorBoundary extends React.Component {
//   state = { hasError: false, error: '' };

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true, error: error.message };
//   }

//   // useEffect
//   componentDidMount() {}

//   componentWillUnmount() {}

//   componentDidCatch(error, errorInfo) {
//     // You can also log the error to an error reporting service
//     // sentry or logRocket
//     // logErrorToMyService(error, errorInfo);
//     console.log(error.message);
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return <h1>Something went wrong. {this.state.error}</h1>;
//     }

//     return this.props.children;
//   }
// }

function Greeting({ subject }) {
  return <div>Hello {subject.toUpperCase()}</div>;
}

function Farewell({ subject }) {
  return <div>Goodbye {subject.toUpperCase()}</div>;
}

// class Sample extends React.Component {
//   state = {
//     count: 1,
//   };

//   render() {
//     return (
//       <>
//         <h1>I am a Class Component {this.state.count}</h1>
//         <button onClick={() => this.setState({ count: this.state.count + 1 })}>
//           {' '}
//           Increase
//         </button>
//       </>
//     );
//   }
// }

function GitHub() {
  const [user, setUser] = React.useState({});
  const handleError = useErrorHandler();

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('https://randomuser.me/ap');
        const data = await res.json();
        console.log(data);
        setUser(data);
      } catch (err) {
        console.log(err);
        handleError(err);
      }
    }

    fetchUser();
  }, []);

  return (
    <>
      <h1>GitHub</h1>
      {user?.login && <span>API call was successful</span>}
    </>
  );
}

export default function App() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {/* <ErrorBoundary> */}
        {/* <Greeting /> */}
        {/* <Farewell /> */}

        <GitHub />

        <Sample />
      </ErrorBoundary>
    </div>
  );
}
