import { useState } from 'react';
import {Segment, Form, Header, Message} from 'semantic-ui-react';
import {useHistory, useLocation} from 'react-router-dom';

export default function GeneralForm(props) {
    let {
        header, 
        children, 
        onSubmit,
        buttonLabel,
        buttonIcon,
    } = props;
    return (
        <Segment padded='very' className='form-container'>
            <Header content={header} size='huge' textAlign='center'/>
            <Form>
                {children}
                <Form.Button
                    className='form-btn'
                    color='yellow'
                    floated='right'
                    icon={buttonIcon}
                    content={buttonLabel}
                    onClick={onSubmit}
                />
            </Form>
        </Segment>
    );
}

/**
 * Component for protected content. Prompts for password if not in localStorage
 * before displaying children components.
 */
export function ProtectedForm(props) {
    const history = useHistory();
    const loc = useLocation();
    let [userPw, setUserPw] = useState('');
    let [showError, setShowError] = useState(false);
    
    const submitPassword = () => {
        // Show error message if password is invalid
        if (userPw !== process.env.REACT_APP_PASSWORD) {
            setShowError(true);
            return
        }
        // Otherwise update localStorage to move past password form
        localStorage.setItem('password', userPw);
        history.push(loc.pathname);
    }

    props = {...props, header: 'Protected: ' + props.header};
    if (!localStorage.getItem('password')) {
        return (
            <GeneralForm {...props} onSubmit={submitPassword}>
                <Message
                    visible
                    compact
                    icon='lock'
                    content='This content is password protected. To view it please enter your password below.'
                />
                <Form.Input
                    fluid
                    type='password'
                    label='Password'
                    value={userPw}
                    onChange={(e, {value}) => setUserPw(value)}
                />
                { showError &&
                    <Message
                        compact
                        negative
                        size='mini'
                        onDismiss={() => setShowError(false)}
                        content='Password does not match'
                    />
                }
            </GeneralForm>
        );
    }

    return (
        <GeneralForm {...props}/>
    );
}