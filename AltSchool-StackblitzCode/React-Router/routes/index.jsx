import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

let About = lazy(() => import('../pages/About'));
let ErrorPage = lazy(() => import('../pages/ErrorPage'));
let Home = lazy(() => import('../pages/Home'));
let Item = lazy(() => import('../pages/Item'));
let Items = lazy(() => import('../pages/Items'));
let NewItem = lazy(() => import('../pages/NewItem'));

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/items" element={<Items />}>
      {/* items/new  */}
      <Route path="new" element={<NewItem />} />
      {/* items/delete  */}
      {/* <Route path='delete' element={<DeleteItem />} /> */}
      {/* items/123456  itemId = 123456 */}
      <Route path=":itemId" element={<Item />} />
      {/* <Route index element={<LeagueStandings />} /> */}
    </Route>
    <Route path="/about" element={<About />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default AppRouter;
