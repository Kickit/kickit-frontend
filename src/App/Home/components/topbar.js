import React from 'react'
import { Segment } from 'semantic-ui-react'
import { Button, Menu, Icon } from 'antd'
import styled from 'styled-components'
import { AUTH_TOKEN } from '../../../utils/constants'

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
		<Button className='ma2' onClick={logout} icon="logout" />
		</div>
	)
}

export default Topbar