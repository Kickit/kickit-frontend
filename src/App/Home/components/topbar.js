import React from 'react'
import { Button, Menu, Icon } from 'antd'
import { AUTH_TOKEN } from '../../../utils/constants'
import UserDropdown from '../../components/UserDropdown';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Topbar = (props) => {
	const logout = () => {
		localStorage.removeItem(AUTH_TOKEN)
		props.history.push('../../login')
	}

	return (
		<div className='flex justify-between bg-white'>
		<Menu
			mode="horizontal">
			<Menu.Item key="sidebar" onClick={props.toggle}>
				<Icon
					className="trigger"
					type={props.isOpen ? 'menu-unfold' : 'menu-fold'}
					type='menu-unfold'
				/>
			</Menu.Item>
		</Menu>
		<UserDropdown logout={logout} />
		</div>
	)
}

export default Topbar