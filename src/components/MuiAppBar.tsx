import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {
	AppBar,
	Avatar,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Typography,
} from '@mui/material';

export const MuiAppBar = () => {
	const location = useLocation();
	const [profileMenuAnchor, setProfileMenuAnchor] =
		useState<null | HTMLElement>(null);
	const profileMenuOpen = Boolean(profileMenuAnchor);
	const hangleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setProfileMenuAnchor(event.currentTarget);
	};
	const handleProfileMenuClose = () => {
		setProfileMenuAnchor(null);
	};
	const handleProfileMenuItemClick = (key: string) => {
		console.log(key, 'triggered. furhter layout is to be created');
		handleProfileMenuClose();
	};
	const navigate = useNavigate();
	const profileMenuOptions = [
		{
			title: 'Профиль',
			key: 'profile',
		},
		{
			title: 'Настройки',
			key: 'preferences',
		},
		{
			title: 'Выход',
			key: 'logout',
		},
	];
	const ButtonData = [
		{
			title: 'Учётные записи',
			key: 'accounts',
			link: '/accounts',
		},
		{
			title: 'Пользователи',
			key: 'users',
			link: '/users',
		},
		{
			title: 'Объекты',
			key: 'devicelist',
			link: '/devicelist',
		},
		{
			title: 'Водители',
			key: 'drivers',
			link: '/drivers',
		},
		{
			title: 'Уведомления',
			key: 'notifications',
			link: '/notifications',
		},
		{
			title: 'Задания',
			key: 'tasks',
			link: '/tasks',
		},
	];
	const buttonValue = ButtonData.find(
		(button) => button.link === location.pathname
	)?.key;
	return (
		<AppBar position='static'>
			<Stack
				direction={'row'}
				spacing={1}
				mx='1rem'>
				<Stack
					textAlign={'center'}
					direction={'row'}
					spacing={1}
					justifyContent={'space-between'}
					flexGrow={1}>
					<Stack
						direction='row'
						sx={{ color: 'white', borderRadius: 0 }}>
						<Typography
							variant='h6'
							margin='auto'>
							<SatelliteAltIcon />
							СТАВТРЕК
						</Typography>
						<Stack
							direction={'row'}
							spacing={0}
							mx={1}>
							{ButtonData.map((button) => (
								<Button
									key={button.key}
									sx={{
										borderRadius: 0,
										backgroundColor:
											buttonValue === button.key
												? 'primary.dark'
												: 'primary.main',
									}}
									disableElevation
									variant={'contained'}
									onClick={() => {
										navigate(button.link);
									}}>
									{button.title}
								</Button>
							))}
						</Stack>
					</Stack>
				</Stack>
				<Stack
					direction={'row'}
					spacing={1}>
					<IconButton sx={{ color: 'common.white' }}>
						<NotificationsNoneIcon fontSize='inherit' />
					</IconButton>
					<Button
						disableElevation
						disableRipple
						variant='text'
						sx={{ color: 'white' }}
						startIcon={<Avatar variant='circular'></Avatar>}
						endIcon={<KeyboardArrowDownIcon />}
						aria-controls={profileMenuOpen ? 'profilemenu' : undefined}
						onClick={hangleProfileMenuClick}
						id='profilemenu_button'>
						name.surname@mailbox.domen
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
						open={profileMenuOpen}
						anchorEl={profileMenuAnchor}
						id='profilemenu'
						MenuListProps={{ 'aria-labelledby': 'profilemenu_button' }}
						onClose={handleProfileMenuClose}>
						{profileMenuOptions.map((option) => (
							<MenuItem
								key={option.key}
								onClick={() => handleProfileMenuItemClick(option.key)}>
								{option.title}
							</MenuItem>
						))}
					</Menu>
				</Stack>
			</Stack>
		</AppBar>
	);
};
