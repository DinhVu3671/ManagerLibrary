import React, { useEffect, useState, useRef, memo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Header from './header';
import Footer from './footer';
import stylesOrderBook from './CSS/orderBook.module.css';
import InformationTab from './InfomationTab';
import styles from '../screens/CSS/home.module.css';
import stylesRegister from './CSS/RegisterFormCSS.module.scss';
import clsx from 'clsx';
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
import { Button } from '@mui/material';
import stylesBook from '../components/CSS/BookInformation.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import BookAPI from '../api/BookAPI';
import BorrowBookAPI from '../api/BorrowBookAPI';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//


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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

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
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
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

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Đã chọn {numSelected} sách
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Chưa chọn sách nào
        </Typography>
      )}
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

//
function CreateReturnBook({ route, navigation }) {
  let date = new Date();
  const dateCurr = date.toLocaleDateString();
  //
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [searched, setSearched] = useState("");
  const classes = useStyles();
  const {state} = useLocation();
  const { user, listBook } = state;
  console.log(listBook);
  useEffect(() => {
    setData(listBook); 
  }, []);
  const requestSearch = (searchedVal) => {
    const filteredRows = listBook.filter((row) => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listBook.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listBook.length) : 0;
  //

  return (
    <div className={stylesOrderBook.Home}>
      <Header />
      <div className={stylesOrderBook.content} >
        <div className={stylesOrderBook.tab1} >
          <InformationTab />
        </div>

        <div className={stylesOrderBook.tab2} >

          <div className={styles.Home}>
            <div className={styles.wraper}>
              <div className={styles.tdisplay2}>
                <div style={{ display: 'flex' }}>
                <p>Họ tên: {user}</p>
                  <div style={{ display: 'flex', marginLeft: '100px' }}>
                    <label
                      htmlFor="date"
                      className={clsx(stylesRegister.formLabel, stylesRegister.row)}
                    >
                      Ngày Trả:
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="text"
                      value={dateCurr}
                      className={clsx(stylesRegister.formInput, stylesRegister.row)}
                      style={{ marginLeft: '-50px' }}
                      readOnly
                    />
                  </div>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                      <EnhancedTableToolbar numSelected={selected.length} />
                      <Paper>
                        <SearchBar
                          value={searched}
                          onChange={(searchVal) => requestSearch(searchVal)}
                          onCancelSearch={() => cancelSearch()}
                          placeholder="Tìm tên sách . . ."
                        />
                        </Paper>
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
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={listBook.length}
                          />
                          <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                            rows.slice().sort(getComparator(order, orderBy)) */}
                            {data.slice().sort(getComparator(order, orderBy))
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
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        color="primary"
                                        checked={isItemSelected}
                                        inputProps={{
                                          'aria-labelledby': labelId,
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell
                                      component="th"
                                      id={labelId}
                                      scope="row"
                                      padding="none"
                                      onClick={() => { navigatePath(`/book/${row._id}`) }}
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
                        count={listBook.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                    <div className={stylesBook.buttonM}>
                      <Button color="success"> Tạo phiếu trả </Button>
                      <Button color="error"> Huỷ </Button>
                    </div>

                  </Box>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
}

export default CreateReturnBook;