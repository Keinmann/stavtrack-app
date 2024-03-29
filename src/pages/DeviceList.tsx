import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";

type rawDataItem = {
  id: number;
  name: string;
  uniqueId: string;
  status: string;
  lastUpdate: string;
  optional?: {};
};

export const DeviceList = () => {
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const actionMenuOpen = Boolean(actionMenuAnchor);
  const hangleActionMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };
  const executeAction = (key: string) => {
    console.log(key);
    handleActionMenuClose();
  };
  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };
  const menuButtonData = [
    {
      title: "Объекты",
      key: "devices",
    },
    {
      title: "Группы",
      key: "groups",
    },
  ];
  const actionMenuOptions = [
    { title: "Обновить", key: "refresh" },
    { title: "Добавить", key: "add" },
    { title: "Удалить", key: "delete" },
  ];
  const [menuButtonValue, setMenuButtonValue] = useState<string>(
    menuButtonData[0].key
  );
  const [searchDisabled, setSearchDisabled] = useState<boolean>(true);
  const [searchValues, setSearchValues] = useState<number[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const handleChangeSearch = (value: string) => {
    let valueArray: number[] = value
      .split(/\D/)
      .filter((n) => n)
      .map(Number)
      .sort((a, b) => a - b);
    valueArray = valueArray.filter(
      (value, index) => valueArray.indexOf(value) === index
    );
    console.log(searchDisabled);
    setSearchDisabled(valueArray.length > 0 ? false : true);
    setSearchValues(valueArray);
    setSearchString(value);
  };
  const handleSearchClick = () => {
    setSearchString(searchValues.join(", ").toString());
  };
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  console.log("selected:", selectedRows);
  const rows = !searchDisabled
    ? rowData.filter((r) => searchValues.indexOf(r.id) >= 0)
    : rowData;
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(rowData.map((row) => row.id));
      return;
    }
    setSelectedRows([]);
  };
  const isRowSelected = (id: number) => selectedRows.indexOf(id) !== -1;
  const handleRowClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    if (selectedRows.indexOf(id) !== -1) {
      setSelectedRows(selectedRows.filter((row) => row !== id));
      return;
    }
    const newSelectedRows = selectedRows.concat(id).sort((a, b) => a - b);
    setSelectedRows(newSelectedRows);
  };
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof rawDataItem>("id");
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    console.log("newPage", newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  type Order = "asc" | "desc";
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort<T>(
    array: rawDataItem[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const visibleRows = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  //REMOTE CONNECTION!
  // const getRemoteData = async () => {
  // 	const url = process.env.REACT_APP_REMOTE_API;
  // 	const token = process.env.REACT_APP_BEARERTOKEN;
  // 	if (!url || !token) {
  // 		console.log('no api info');
  // 		return;
  // 	}
  // 	try {
  // 		const response = await fetch(url, {
  // 			headers: { Authorization: `Bearer ${token}` },
  // 		});
  // 		if (response.status === 200) {
  // 			const json = await response.json();
  // 			console.log(json);
  // 		} else {
  // 			console.log('fetch error');
  // 		}
  // 	} catch (error) {
  // 		console.error(error);
  // 	}
  // };
  // useEffect(() => {
  // 	getRemoteData();
  // }, []);
  //REMOTE CONNECTION is not working, FAKING CONNECTION!

  return (
    <Stack padding={"1rem"} direction={"column"} spacing={1}>
      <Toolbar>
        <Stack
          flexGrow={"1"}
          direction={"row"}
          justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={1}>
            <TextField
              color="primary"
              type="text"
              size="small"
              label="Поиск по ID"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disabled={searchDisabled}
                      onClick={handleSearchClick}>
                      <SearchIcon
                        color={searchDisabled ? "primary" : "success"}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={searchString}
              onChange={(event) => handleChangeSearch(event.target.value)}
            />
            <ButtonGroup>
              {menuButtonData.map((menuButton) => (
                <Button
                  variant="outlined"
                  key={menuButton.key}
                  color={
                    menuButtonValue === menuButton.key ? "success" : "primary"
                  }
                  onClick={() => {
                    setMenuButtonValue(menuButton.key);
                  }}>
                  {menuButton.title}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup>
              <IconButton
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}>
                <ViewColumnIcon />
              </IconButton>
              <IconButton
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}>
                <FilterListIcon />
              </IconButton>
              <IconButton
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}>
                <DownloadIcon />
              </IconButton>
            </ButtonGroup>
          </Stack>
          <Button
            endIcon={
              <Stack direction={"row"} spacing={0}>
                <Divider
                  orientation="vertical"
                  sx={{ borderColor: "common.white" }}
                />
                <ArrowDropDownIcon />
              </Stack>
            }
            aria-controls={actionMenuOpen ? "actionmenu" : undefined}
            onClick={hangleActionMenuClick}
            id="actionmenu_button"
            aria-haspopup="true"
            aria-expanded="true"
            color="success"
            variant="contained">
            Действия
          </Button>
          <Menu
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={actionMenuOpen}
            anchorEl={actionMenuAnchor}
            id="actionmenu"
            MenuListProps={{ "aria-labelledby": "actionmenu_button" }}
            onClose={handleActionMenuClose}>
            {actionMenuOptions.map((option) => (
              <MenuItem
                key={option.key}
                onClick={() => executeAction(option.key)}>
                {option.title}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Toolbar>
      <Stack px={3} py={3} direction={"column"} spacing={1} component={Paper}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell width={2}>
                  <Checkbox onChange={handleSelectAll} />
                </TableCell>
                <TableCell width={10} align="left">
                  ID
                </TableCell>
                <TableCell width={20} align="center">
                  Название
                </TableCell>
                <TableCell width={20} align="center">
                  UID
                </TableCell>
                <TableCell width={10} align="center">
                  Статус
                </TableCell>
                <TableCell width={30} align="right">
                  Последнее обнов.
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows?.map((row, index) => {
                const isSelected = isRowSelected(row.id as number);
                return (
                  <TableRow
                    selected={isSelected}
                    key={index}
                    onClick={(event) => {
                      handleRowClick(event, row.id as number);
                    }}>
                    <TableCell>
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell aria-label="table-id" align="left">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.uniqueId}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="right">{row.lastUpdate}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            count={rows.length}
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Stack>
    </Stack>
  );
};

const rowData: rawDataItem[] = [
  {
    id: 1,
    name: "Mercedes Atego 1",
    uniqueId: "761253",
    status: "active",
    lastUpdate: new Date().toDateString(),
  },
  {
    id: 2,
    name: "Mercedes Atego 2",
    uniqueId: "761253",
    status: "idle",
    lastUpdate: new Date().toDateString(),
  },
  {
    id: 3,
    name: "Mercedes Atego 3",
    uniqueId: "761253",
    status: "active",
    lastUpdate: new Date().toDateString(),
  },
  {
    id: 4,
    name: "Mercedes Atego 4",
    uniqueId: "675467",
    status: "idle",
    lastUpdate: new Date().toDateString(),
  },
  {
    id: 5,
    name: "Mercedes Atego 5",
    uniqueId: "2345",
    status: "active",
    lastUpdate: new Date().toDateString(),
  },
  {
    id: 6,
    name: "Mercedes Atego 6",
    uniqueId: "76457",
    status: "active",
    lastUpdate: new Date().toDateString(),
  },
  {
    id: 7,
    name: "Mercedes Atego 7",
    uniqueId: "9876865",
    status: "moving",
    lastUpdate: new Date().toDateString(),
  },
  {
    id: 8,
    name: "Mercedes Atego 8",
    uniqueId: "23552",
    status: "active",
    lastUpdate: new Date().toDateString(),
  },
  {
    id: 9,
    name: "Mercedes Atego 9",
    uniqueId: "523423",
    status: "active",
    lastUpdate: new Date().toDateString(),
  },
  {
    id: 10,
    name: "Mercedes Atego 10",
    uniqueId: "423432",
    status: "active",
    lastUpdate: new Date().toDateString(),
  },
  {
    id: 11,
    name: "Mercedes Atego 11",
    uniqueId: "63463",
    status: "active",
    lastUpdate: new Date().toDateString(),
  },
  {
    id: 12,
    name: "Mercedes Atego 12",
    uniqueId: "956756",
    status: "idle",
    lastUpdate: new Date().toDateString(),
  },
];
