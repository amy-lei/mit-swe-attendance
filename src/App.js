import {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    useLocation,
    useHistory,
} from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import './style/app.css';
import 'semantic-ui-css/semantic.min.css';

const ACTIONS = {
    'add': ['event', 'board-member', 'general-member'],
    'log': ['event-attendance', 'volunteer-hours'],
    'view': ['board-requirements', 'event-attendance'],
}

function App() {
    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route path='/add/:type'>
                    Add
                </Route>
                <Route path='/log/:type'>
                    Log
                </Route>
                <Route path='/view/:type'>
                    View
                </Route>
                <Route path='/'>
                    <div className="app">
                        Hello World
                    </div>
                </Route>
            </Switch>
        </Router>
    );
}

function NavBar() {
    const history = useHistory();
    const loc = useLocation();
    const menu = [];
    Object.keys(ACTIONS)
        .forEach((action) => {
            ACTIONS[action].forEach((type) => {
                let url = `/${action}/${type}`;
                let label = action[0] + action.substring(1) + ' ' + type.replace('-', ' ');
                menu.push(<Menu.Item 
                    name={label}
                    active={loc.pathname === url}
                    onClick={() => history.push(url)}
                />);
            });
        });
    return (
        <Menu text vertical className='nav'>
            {menu}
        </Menu>
    );
}

export default App;
