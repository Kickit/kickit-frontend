import React from 'react';
import '../../index.css';
import { Button, Input, Form, Message } from 'semantic-ui-react'
import logo from '../../kickit_logo.png';


//Fiture data to start with, will wire up later
const user = {
    id: "12345",
    first: "John",
    last: "Doe",
    email: "John@doe.com",
    projects: [
        {
            id: "1",
            title: "Personal Projects",
            created: 1527384685,
            sections: [

            ]
        },
        {
            id: "2",
            title: "Big Work Thing",
            created: 1527364685,
            sections: [
                {
                    title: "Prioritized",
                    position: 1,
                    tasks: [
                        
                    ]
                }
            ]
        },
        {
            id: "3",
            title: "Night School",
            created: 1527382685,
            sections: [

            ]
        }
    ]
}

class Home extends React.Component {
    render () {
        return 'Thankyou for checking out kickit. The site is currently under development and we will have more soon.'
    }
       
}

export default Home