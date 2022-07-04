import { Routes, Route, Link } from 'react-router-dom';
import Home from '../screens/home';
import BookInformation from '../components/bookInformation';
import BookManager from '../components/BookManager';
import Login from '../components/login';
import Register from '../components/register';
import BookReaderManager from '../components/BookReaderManager';
// import Search from '../components/BookManager1';
import ReaderAccount from '../components/readerAccount';
import CartBook from '../components/bookCart';
import OrderBook from '../components/OrderBook';
import OrderHistory from '../components/OrderHistory';
import ReturnBook from '../components/ReturnBook';
import CreateOrderBook from '../components/createOrder';
import Search from '../components/search';
import ReaderManager from '../components/ReaderManager';
import CreateReturnBook from '../components/createReturn';
import OrderValid from '../components/OrderValid';
function RootRoutes() {
  return (
    <Routes>
      <Route path="/"  element={<Home />} />
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/book/:idBook" element={<BookInformation />} />
      <Route path="/bookManager" element={<BookManager />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/bookReaderManager" element={<BookReaderManager />} />
      <Route path="/account" element={<ReaderAccount />} />
      <Route path="/search" element={<Search />} />
      <Route path="/cartBook" element={<CartBook />} />
      <Route path="/orderBookManager" element={<OrderBook />} />
      <Route path="/orderHistoryManager" element={<OrderHistory />} />
      <Route path="/orderValidManager" element={<OrderValid />} />
      <Route path="/returnBookManager" element={<ReturnBook />} />
      <Route path="/createOrderBook" element={<CreateOrderBook />} />
      <Route path="/createReturnBook" element={<CreateReturnBook />} />

      <Route path="/readerManager" element={<ReaderManager />} />
    </Routes>
  );
}

export default RootRoutes;
