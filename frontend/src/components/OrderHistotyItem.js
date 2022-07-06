import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useState } from 'react';
import Header from './header';
import Footer from './footer';
import styles from '../screens/CSS/home.module.css';
import stylesBook from '../components/CSS/BookInformation.module.css';
import { Button } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';

function createData(
  name,
  calories,
  writter,
  count,
  lastUpdate,
) {
  return {
    name,
    calories,
    writter,
    count,
    lastUpdate,
  };
}

const rows = [
  createData('KIMI NI TSUMUGU BOUHAKU', "Romance - Shoujo ai", "Yasaka Shuu", 15,"Jun-26-2022 17:23"),
  createData('NEGA-KUN AND POSI-CHAN', "Comedy - Romance", "Shunpei Morita", 30,"May-25-2022 01:25"),
  createData('STORY OF A SMALL SENIOR IN MY COMPANY', "Comedy - Romance", "Saisou", 15,"Jun-24-2022 22:38"),
  createData('2 SAISA NO OSANANAJIMI', "Romance - School life", "Mi Kasuke", 18,"Jun-26-2022 09:06"),
  createData('KIMI NI TSUMUGU BOUHAKU 2', "Romance - Shoujo ai - Yuri", "Yasaka Shuu", 21,"Jun-26-2022 17:23"),
  createData('KIMI NI TSUMUGU BOUHAKU 3', "Romance - Shoujo ai - Yuri", "Yasaka Shuu", 20,"Jun-26-2022 17:23"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

let Order = 'asc' | 'desc';

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Tên sách',
  },
  {
    id: 'calories',
    numeric: false,
    disablePadding: false,
    label: 'Thể loại',
  },
  {
    id: 'writter',
    numeric: false,
    disablePadding: false,
    label: 'Tác giả',
  },
  {
    id: 'count',
    numeric: true,
    disablePadding: false,
    label: 'Kho',
  },
  {
    id: 'lastUpdate',
    numeric: false,
    disablePadding: false,
    label: 'Cập nhật lần cuối',
  },
];


function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property) => (event) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


export default function OrderHistoryItem({valid, book, type}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const navigatePath = function (path) {
    if (window.location.pathname !== path) {
      navigate(path);
    }
  };
  const handleRequestSort = (
    event,
    property,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateReturnBook = () => {
    navigate("/createReturnBook", { state: { user: book.user, listBook: book.book } });
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div className={styles.Home}>
        <div className={styles.wraper}>
              <div className={styles.tdisplay2}>  
                  <div style={{display: 'flex'}}>          
                    <p>Họ tên: {book.user.fullName}</p>
                    <p style={{marginLeft : '100px'}}>SĐT: {book.user.phone}</p>
                    <div style={{marginLeft : '100px'}}>
                      {/* <p>Ngày mượn: 10:20:00 17/6/2022</p> */}
                       {valid && (
                        <p>Ngày hẹn trả: 10:20:00 17/6/2022</p>
                      )}                             
                    </div>

                  </div>

                  <Box sx={{ width: '100%' }}>
                  <Paper sx={{ width: '100%', mb: 2 }}>
                      <TableContainer>
                      <Table
                          sx={{ minWidth: 750 }}
                          aria-labelledby="tableTitle"
                          size={'medium'}
                      >
                          <EnhancedTableHead
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onRequestSort={handleRequestSort}
                          rowCount={book.book.length}
                          />
                          <TableBody>
                          {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                          rows.slice().sort(getComparator(order, orderBy)) */}
                          {book.book.slice().sort(getComparator(order, orderBy))
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => {
                              const isItemSelected = isSelected(row._id);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                  <TableRow
                                  hover
                                  onClick={(event) => handleClick(event, row._id)}
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row._id}
                                  selected={isItemSelected}
                                  >
                                  <TableCell
                                      component="th"
                                      id={labelId}
                                      scope="row"
                                      padding="none"
                                      onClick={()=>{navigatePath(`/book/${row._id}`)}}
                                  >
                                      {row.title}
                                  </TableCell>
                                  <TableCell align="left">{row.calories}</TableCell>
                                  <TableCell align="left">{row.author}</TableCell>
                                  <TableCell align="left">{row.availableNumber}</TableCell>
                                  <TableCell align="left">{(new Date(row.updatedAt)).toLocaleString()}</TableCell>
                                  </TableRow>
                              );
                              })}
                              {emptyRows > 0 && (
                                  <TableRow
                                  >

                                  </TableRow>
                                  )}
                          </TableBody>
                      </Table>
                      </TableContainer>
                      <TablePagination
                      rowsPerPageOptions={[5, 10, 15]}
                      component="div"
                      count={book.book.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                  </Paper>
                  <div className={stylesBook.buttonM}>
                      { type === "refurn" ? null :
                        <Button color="success" onClick={handleCreateReturnBook}> Tạo phiếu trả </Button>
                        }                                                  
                  </div>
                  </Box>
              </div>
        </div>
    </div>
  );
}
