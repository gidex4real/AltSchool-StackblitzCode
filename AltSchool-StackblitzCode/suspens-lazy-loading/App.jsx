import { lazy, Suspense, useState } from 'react';
import './App.css';

const Loading = () => {
  return <div>Loading</div>;
};

function App() {
  const [count, setCount] = useState(0);
  // dynamic import and lazy()
  const Home = lazy(() => import('./Home'));

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        {/* expensive Component */}
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
