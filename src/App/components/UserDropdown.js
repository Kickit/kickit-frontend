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
        title: '',
        checked: false
    }

    handleMenuClick = (e) => {
        if (true /*Handle validation here*/) {
            /* send request here */
            openNotification({title: this.state.title})
            this.setState({ visible: false })

            //Dont clear input until dropdown transition finishes
            setTimeout(() => this.clearInput(), 500)
        }
    }

    handleVisibleChange = (flag) => {
        this.setState({ visible: flag })
        if (!flag) {
            console.log('Clearing')
            this.clearInput()
        }

    }

    clearInput = () => {
        this.setState({ title: '', checked: false })
    }

    render () {
        const { title, checked, visible } = this.state
        const dropdown2 = (
            <Card>
              <div className='mh2 mv1'>
              <Input value={title} onChange={ e => this.setState({ title: e.target.value })} type="title" placeholder="Project Name" />
              </div>
              <Button type="primary" className="login-form-button ma3" onClick={this.handleMenuClick}>
                  Create Project
              </Button>
              <Checkbox checked={checked} onChange={ e => this.setState({ checked: e.target.checked })}>Public</Checkbox>
            </Card>
        )
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
                <Button className='ma2' onClick={this.props.logout} shape="circle" icon="user" />
                </Dropdown>
            </div>
        )
    }
}

export default UserDropdown