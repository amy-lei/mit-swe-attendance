import {
    BrowserRouter as Router,
    Route,
    Switch,
    useLocation,
    useHistory,
} from 'react-router-dom';
import { Menu, Header } from 'semantic-ui-react';
import AddForm from './components/AddForm';
import logo from './assets/logo.png';

import './style/app.css';
import 'semantic-ui-css/semantic.min.css';

function App() {
    return (
        <div className='container'>
            <Router>
                <div className='header-container'>
                    <img src={logo} alt='swe logo' className='header-logo'/>
                    <h1 className='header-title'>
                        Tracker
                    </h1>
                </div>
                <NavBar/>
                <main className='app'>
                    <Switch>
                        <Route path='/add/:type'>
                            <AddForm/>
                        </Route>
                        <Route path='/log/:type'>
                            Log
                        </Route>
                        <Route path='/view/:type'>
                            View
                        </Route>
                        <Route path='/'>
                            <h1>MIT SWE Tracker Site</h1>
                        </Route>
                    </Switch>
                </main>
            </Router>
        </div>
    );
}

const ACTIONS = {
    'add': ['event', 'board-member', 'general-member'],
    'log': ['event-attendance', 'volunteer-hours'],
    'view': ['stats',],
}

function NavBar() {
    const history = useHistory();
    const loc = useLocation();
    const menu = [];
    Object.keys(ACTIONS)
        .forEach((action) => {
            ACTIONS[action].forEach((type) => {
                let url = `/${action}/${type}`;
                let label = action + ' ' + type.replace('-', ' ');
                menu.push(<Menu.Item 
                    name={label}
                    active={loc.pathname === url}
                    onClick={() => history.push(url)}
                />);
            });
        });
    return (
        <Menu text className='nav'>
            {menu}
        </Menu>
    );
}

export default App;
