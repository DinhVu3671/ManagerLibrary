import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Header from './header';
import Footer from './footer';
import stylesOrderBook from './CSS/orderBook.module.css';
import InformationTab from './InfomationTab';
import styles from '../screens/CSS/home.module.css';
import stylesRegister from './CSS/RegisterFormCSS.module.scss';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
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
import UsersAPI from '../api/UsersAPI';

//


function createData(
  name,
  email,
  phone,
  lastUpdate,
) {
  return {
    name,
    email,
    phone,
    lastUpdate,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const rows = [
  createData('Đinh Tiến Vũ', "dtv@gmail.com", "031212542","Jun-24-2022 14:43"),
  createData('Đinh Vũ Tiến', "dvt@gmail.com", "012331342","Jun-25-2022 11:13"),
  createData('Tiến Đinh Vũ', "tdv@gmail.com", "213443241","Jun-21-2022 14:03"),
  createData('Tiến Vũ Đinh', "tvd@gmail.com", "324124123","Jun-27-2022 16:13"),
  createData('Vũ Tiến Đinh', "vtd@gmail.com", "123412344","Jun-22-2022 11:43"),
  createData('Vũ Đinh Tiến', "vdt@gmail.com", "423532345","Jun-29-2022 19:21"),
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
    label: 'Họ tên',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'Số điện thoại',
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

function ReaderManager() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const [data, setData] = useState();
    const [searched, setSearched] = useState("");
    const classes = useStyles();


    function getData() {
      UsersAPI.getAllUsers().then((res) => {
        let userList = res.data;
        console.log(userList.data);
        setUsers(userList.data);
        setData(userList.data);
      })
        .catch(err => {
          console.log(err)
        })
    }
    useEffect(() => {
      getData();
    }, []);

    const requestSearch = (searchedVal) => {
      const filteredRows = users.filter((row) => {
        return row.fullName.toLowerCase().includes(searchedVal.toLowerCase());
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
        const newSelecteds = rows.map((n) => n.name);
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
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
//

    return (
        <div className={stylesOrderBook.Home}>
        <Header/>
        <div className={stylesOrderBook.content} >
            <div className={stylesOrderBook.tab1} >
                <InformationTab/>
            </div>

            <div className={stylesOrderBook.tab2} >
              
            <div className={styles.Home}>
        <div className={styles.wraper}>
          <div className={styles.tdisplay2}>  
            <div style={{marginTop: '10px'}}>
              <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <Paper>
                          <SearchBar
                          value={searched}
                          onChange={(searchVal) => requestSearch(searchVal)}
                          onCancelSearch={() => cancelSearch()}
                          placeholder="Tìm tên người dùng . . ."
                        /></Paper>
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
                            rowCount={users.length}
                            />
                            <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                            rows.slice().sort(getComparator(order, orderBy)) */}
                            {data?.slice().sort(getComparator(order, orderBy))
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
                                        {row.fullName}
                                    </TableCell>
                                    <TableCell align="left">{row.gmail}</TableCell>
                                    <TableCell align="left">{row.phone}</TableCell>
                                    <TableCell align="left">{row.updatedAt}</TableCell>
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
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                    {/* <div className={stylesBook.buttonM}>
                        <Button color="success"> Tạo phiếu mượn </Button>                            
                        <Button color="error"> Huỷ </Button>                            
                    </div> */}

              </Box>
            </div>

          </div>
        </div>
    </div>
            </div>
        </div>
        <Footer/>
        
        </div>
    );
}

export default ReaderManager;