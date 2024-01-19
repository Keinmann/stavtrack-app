import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import {
	Button,
	ButtonGroup,
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
	TableRow,
	TextField,
	Toolbar,
	collapseClasses,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface rawDataItem {
	id: number;
	name: string;
	uniqueId: string;
	status: string;
	lastUpdate: string;
	optional?: {};
}

const rawData: rawDataItem[] = [
	{
		id: 1,
		name: 'Mercedes Atego 1',
		uniqueId: '761253',
		status: 'active',
		lastUpdate: new Date().toDateString(),
	},
	{
		id: 2,
		name: 'Mercedes Atego 2',
		uniqueId: '761253',
		status: 'idle',
		lastUpdate: new Date().toDateString(),
	},
	{
		id: 3,
		name: 'Mercedes Atego 3',
		uniqueId: '761253',
		status: 'active',
		lastUpdate: new Date().toDateString(),
	},
	{
		id: 4,
		name: 'Mercedes Atego 4',
		uniqueId: '675467',
		status: 'idle',
		lastUpdate: new Date().toDateString(),
	},
	{
		id: 5,
		name: 'Mercedes Atego 5',
		uniqueId: '2345',
		status: 'active',
		lastUpdate: new Date().toDateString(),
	},
	{
		id: 6,
		name: 'Mercedes Atego 6',
		uniqueId: '76457',
		status: 'active',
		lastUpdate: new Date().toDateString(),
	},
	{
		id: 7,
		name: 'Mercedes Atego 7',
		uniqueId: '9876865',
		status: 'moving',
		lastUpdate: new Date().toDateString(),
	},
	{
		id: 8,
		name: 'Mercedes Atego 8',
		uniqueId: '23552',
		status: 'active',
		lastUpdate: new Date().toDateString(),
	},
	{
		id: 9,
		name: 'Mercedes Atego 9',
		uniqueId: '523423',
		status: 'active',
		lastUpdate: new Date().toDateString(),
	},
	{
		id: 10,
		name: 'Mercedes Atego 10',
		uniqueId: '423432',
		status: 'active',
		lastUpdate: new Date().toDateString(),
	},
	{
		id: 11,
		name: 'Mercedes Atego 11',
		uniqueId: '63463',
		status: 'active',
		lastUpdate: new Date().toDateString(),
	},
	{
		id: 12,
		name: 'Mercedes Atego 12',
		uniqueId: '956756',
		status: 'idle',
		lastUpdate: new Date().toDateString(),
	},
];

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
			title: 'Объекты',
			key: 'devices',
		},
		{
			title: 'Группы',
			key: 'groups',
		},
	];
	const actionMenuOptions = [
		{ title: 'Обновить', key: 'refresh' },
		{ title: 'Добавить', key: 'add' },
		{ title: 'Удалить', key: 'delete' },
	];
	const [menuButtonValue, setMenuButtonValue] = useState<string>(
		menuButtonData[0].key
	);

	//!testing connection
	const getRemoteData = async () => {
		const url = process.env.REACT_APP_REMOTE_API;
		const token = process.env.REACT_APP_BEARERTOKEN;
		if (!url || !token) {
			console.log('no api info');
			return;
		}
		try {
			const response = await fetch(url, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.status === 200) {
				const json = await response.json();
				console.log(json);
			} else {
				console.log('fetch error');
			}
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getRemoteData();
	}, []);

	return (
		<Stack
			padding={'1rem'}
			direction={'column'}
			spacing={1}>
			<Toolbar>
				<Stack
					flexGrow={'1'}
					direction={'row'}
					justifyContent={'space-between'}>
					<Stack
						direction={'row'}
						spacing={1}>
						<TextField
							color='primary'
							size='small'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton>
											<SearchIcon color='primary' />
										</IconButton>
									</InputAdornment>
								),
							}}></TextField>
						<ButtonGroup>
							{menuButtonData.map((menuButton) => (
								<Button
									variant='outlined'
									key={menuButton.key}
									color={
										menuButtonValue === menuButton.key ? 'success' : 'primary'
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
									'&:hover': {
										color: 'primary.main',
									},
								}}>
								<ViewColumnIcon />
							</IconButton>
							<IconButton
								sx={{
									'&:hover': {
										color: 'primary.main',
									},
								}}>
								<FilterListIcon />
							</IconButton>
							<IconButton
								sx={{
									'&:hover': {
										color: 'primary.main',
									},
								}}>
								<DownloadIcon />
							</IconButton>
						</ButtonGroup>
					</Stack>
					<Button
						endIcon={
							<Stack
								direction={'row'}
								spacing={0}>
								<Divider
									orientation='vertical'
									sx={{ borderColor: 'common.white' }}
								/>
								<ArrowDropDownIcon />
							</Stack>
						}
						aria-controls={actionMenuOpen ? 'actionmenu' : undefined}
						onClick={hangleActionMenuClick}
						id='actionmenu_button'
						aria-haspopup='true'
						aria-expanded='true'
						color='success'
						variant='contained'>
						Действия
					</Button>
					<Menu
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						open={actionMenuOpen}
						anchorEl={actionMenuAnchor}
						id='actionmenu'
						MenuListProps={{ 'aria-labelledby': 'actionmenu_button' }}
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
			<Stack
				px={3}
				direction={'column'}
				spacing={1}>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>id</TableCell>
								<TableCell>name</TableCell>
								<TableCell>uniqueId</TableCell>
								<TableCell>status</TableCell>
								<TableCell>lastUpdate</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rawData?.map((row) => (
								<TableRow key={row.id}>
									<TableCell>{row.id}</TableCell>
									<TableCell>{row.name}</TableCell>
									<TableCell>{row.uniqueId}</TableCell>
									<TableCell>{row.status}</TableCell>
									<TableCell>{row.lastUpdate}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Stack>
		</Stack>
	);
};
