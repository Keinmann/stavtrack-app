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
	Stack,
	TextField,
	Toolbar,
	collapseClasses,
} from '@mui/material';
import { useState } from 'react';

interface apiDataType {
	id: number;
	name: string;
	uniqueId: string;
	status: string;
	disabled: boolean;
	lastUpdate: string;
	positionId: number;
	groupId: number;
	phone: string;
	model: string;
	contact: string;
	category: string;
	attributes: object;
}

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
				Table
			</Stack>
		</Stack>
	);
};