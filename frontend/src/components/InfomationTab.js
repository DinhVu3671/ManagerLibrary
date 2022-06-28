import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { Link } from 'react-router-dom';

export default function InformationTab() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Link
        to="/bookManager"
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý Sách" />
        </ListItemButton>
      </Link>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý mượn trả" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link
            to="/orderBookManager"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Sách chờ xác nhận" />
            </ListItemButton>
          </Link>

          <Link
            to="/orderHistoryManager"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary="Sách đang mượn" />
            </ListItemButton>
          </Link>

          <Link
            to="/returnBookManager"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <BookmarkRemoveIcon />
              </ListItemIcon>
              <ListItemText primary="Sách đã mượn" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}
