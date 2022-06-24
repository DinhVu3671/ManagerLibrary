import { Routes, Route, Link } from 'react-router-dom';
import Home from '../screens/home';
import BookInformation from '../components/bookInformation';
import BookManager from '../components/BookManager';
import Login from '../components/login';
import Register from '../components/register';

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book" element={<BookInformation />} />
      <Route path="/bookManager" element={<BookManager />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default RootRoutes;
