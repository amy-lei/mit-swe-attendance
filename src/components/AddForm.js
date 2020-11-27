import {useState} from 'react';
import { Form } from 'semantic-ui-react';
import {useParams} from 'react-router-dom';
import GeneralForm, {ProtectedForm} from './GeneralForm';

// TODO: Refactor this somehow 
export default function AddForm(props) {
    let {type} = useParams();
    switch (type) {
        case 'event':
            return <AddEventForm/>
        case 'general-member':
            return <AddGeneralMemberForm/>
        default:
            return <AddBoardMemberForm/>
    }
}

function AddGeneralMemberForm(props) {
    let [responses, setResponses] = useState({
        firstName: '',
        lastName: '',
        kerb: '',
    })
    
    const updateResponse = (e, {name, value}) => {
        setResponses({
            ...responses,
            [name]: value,
        });
    }

    const submit = async () => {
        const body = {
            Name: responses.firstName + ' ' + responses.lastName,
            Kerberos: responses.kerb,
            IsBoardMember: 0,
        };
        const res = await fetch('/api/members', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });

        if (res.ok) {
            console.log('Successfully added member!');
        } else {
            console.log('Failed to create member');
        }
    }

    return (
        <GeneralForm 
            header='Add General Member'
            buttonLabel='Add'
            buttonIcon='plus'
            onSubmit={submit}
        >
            <Form.Group widths='equal'>
                <Form.Input
                    name='firstName'
                    label='First Name'
                    type='text'
                    value={responses.firstName}
                    onChange={updateResponse}
                />
                <Form.Input
                    name='lastName'
                    label='Last Name'
                    type='text'
                    value={responses.lastName}
                    onChange={updateResponse}
                />
            </Form.Group>
            <Form.Input
                required
                name='kerb'
                label='Kerberos (without @mit.edu)'
                type='text'
                value={responses.kerb}
                onChange={updateResponse}
            />
        </GeneralForm>
    );
}

const DEPARTMENTS = [
    'Campus Relations',
    'Career Development',
    'Membership',
    'Outreach',
    'Technology'
];

function AddBoardMemberForm(props) {
    let [responses, setResponses] = useState({
        firstName: '',
        lastName: '',
        kerb: '',
        position: '',
        department: '',
    });
    
    const updateResponse = (e, {name, value}) => {
        setResponses({
            ...responses,
            [name]: value
        });
    }

    const submit = async () => {
        const body = {
            Name: responses.firstName + ' ' + responses.lastName,
            Kerberos: responses.kerb,
            IsBoardMember: 1,
            Position: responses.position,
            Department: responses.department,
        };

        const res = await fetch('/api/members', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });

        if (res.ok) {
            console.log('Successfully added member!');
        } else {
            console.log('Failed to create member', res);
        }
    }

    const options = DEPARTMENTS.map(dpt => {return {key: dpt, value: dpt, text: dpt}});

    return (
        <ProtectedForm
            header='Add Board Member'
            buttonLabel='Add'
            buttonIcon='plus'
            onSubmit={submit}
        >
            <Form.Group widths='equal'>
                <Form.Input
                    name='firstName'
                    label='First Name'
                    type='text'
                    value={responses.firstName}
                    onChange={updateResponse}
                />
                <Form.Input
                    name='lastName'
                    label='Last Name'
                    type='text'
                    value={responses.lastName}
                    onChange={updateResponse}
                />
            </Form.Group>
            <Form.Input
                required
                name='kerb'
                label='Kerberos (without @mit.edu)'
                type='text'
                value={responses.kerb}
                options={options}
                onChange={updateResponse}
            />
            <Form.Group widths='equal'>
                <Form.Input
                    required
                    name='position'
                    label='Position'
                    type='text'
                    value={responses.position}
                    onChange={updateResponse}
                />
                <Form.Dropdown
                    required
                    name='department'
                    label='Department'
                    placeholder='Select a department...'
                    selection
                    value={responses.department}
                    options={options}
                    onChange={updateResponse}
                />
            </Form.Group>
        </ProtectedForm>
    );
}

const EVENTS = [
    {text:'Board Meeting', value: 'BoardMeeting'},
    {text:'Outreach Event', value: 'Outreach'},
    {text:'SWE recruiting event (CPW, Orientation, SWEet Week, etc.)', value: 'Recruiting'},
    {text:'None of the above', value: 'General'},
];

function AddEventForm(props) {
    let [responses, setResponses] = useState({
       name:'',
       password:'',
       type:'',
    });

    const updateResponse = (e, {name, value}) => {
        setResponses({
            ...responses,
            [name]: value,
        });
    }

    const radioButtons = EVENTS.map(e => 
        <Form.Radio 
            name='type'
            label={e.text}
            value={e.value}
            checked={e.value === responses.type}
            onChange={updateResponse}
        />
    );

    const submit = async () => {
        const body = {
            Name: responses.name,
            Password: responses.kerb,
            EventType: responses.type,
        };

        const res = await fetch('/api/events', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });

        if (res.ok) {
            console.log('Successfully added event!');
        } else {
            console.log('Failed to create event', res);
        }
    }


    return (
        <ProtectedForm 
            header='Add Event'
            buttonLabel='Add'
            buttonIcon='plus'
            onSubmit={submit}
        >
            <Form.Group widths='equal'>
                <Form.Input
                    required
                    name='name'
                    label='Event Name'
                    type='text'
                    value={responses.name}
                    onChange={updateResponse}
                />
                <Form.Input
                    required
                    name='password'
                    label='Event Password'
                    type='text'
                    value={responses.password}
                    onChange={updateResponse}
                />
            </Form.Group>
            <Form.Group grouped>
                <label>Type</label>
                {radioButtons}
            </Form.Group>
        </ProtectedForm>
    );
}