import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import {
	AppBar,
	Avatar,
	Button,
	ButtonGroup,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Toolbar,
	Typography,
	colors,
} from '@mui/material';
import { Palette } from '@mui/icons-material';

export const MuiAppBar = () => {
	const navigate = useNavigate();
	const [buttonValue, setButtonValue] = useState<string | null>(null);
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

	return (
		<AppBar position='static'>
			<Stack
				direction={'row'}
				spacing={1}
				mx='1rem'>
				<Stack
					direction={'row'}
					spacing={1}
					justifyContent={'space-between'}
					flexGrow={1}>
					<Stack
						direction='row'
						sx={{ color: 'white', borderRadius: 0 }}>
						<Typography
							variant='h6'
							px={2}
							py={1}>
							<SatelliteAltIcon fontSize='inherit' />
							СТАВТРЕК
						</Typography>
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
									setButtonValue(button.key);
									navigate(button.link);
								}}>
								{button.title}
							</Button>
						))}
					</Stack>
				</Stack>
				<Stack
					py={1}
					direction={'row'}
					spacing={1}>
					<IconButton sx={{ color: 'common.white' }}>
						<NotificationsNoneIcon fontSize='inherit' />
					</IconButton>
					<Avatar variant='circular'></Avatar>
				</Stack>
			</Stack>
		</AppBar>
	);
};
