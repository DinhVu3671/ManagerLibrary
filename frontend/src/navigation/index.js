import { Routes, Route, Link } from 'react-router-dom';
import Home from '../screens/home';
import BookInformation from '../components/bookInformation';

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book" element={<BookInformation />} />
    </Routes>
  );
}

export default RootRoutes;
