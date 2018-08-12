import React from 'react'
import { Button, notification, Dropdown, Icon, Card, Menu, Input, Checkbox  } from 'antd'


const openNotification = ({title}) => {
    notification.open({
        message: 'Project Created!',
        description: `The project with name '${title}' has been created successfully. You can now begin adding tasks to it.`,
    })
}

class UserDropdown extends React.Component {
    state = {
        visible: false,
    }

    handleVisibleChange = (flag) => {
        this.setState({ visible: flag })
    }


    render () {
        const { visible } = this.state
        const dropdown = (
            <Menu>
                <Menu.Item disabled>
                    <Icon type="user" />Account
                </Menu.Item>
                <Menu.Item disabled>
                    <Icon type="setting" />Settings
                </Menu.Item>
                <Menu.Item onClick={this.props.logout}>
                    <Icon type="logout" />Logout
                </Menu.Item>
            </Menu>
        )

        return (
            <div>
                <Dropdown overlay={dropdown} 
                    onVisibleChange={this.handleVisibleChange} 
                    visible={visible}>
                <Button className='ma2' onClick={() => this.setState({visible: !this.state.visible})} shape="circle" icon="user" />
                </Dropdown>
            </div>
        )
    }
}

export default UserDropdown