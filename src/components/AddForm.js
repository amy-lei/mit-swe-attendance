import {useState, useEffect} from 'react';
import { Form } from 'semantic-ui-react';
import {useParams} from 'react-router-dom';
import GeneralForm from './GeneralForm';

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

    return (
        <GeneralForm 
            header='Add General Member'
            buttonLabel='Add'
            buttonIcon='plus'
            onSubmit={() => {}}
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

    const options = DEPARTMENTS.map(dpt => {return {key: dpt, value: dpt, text: dpt}});

    return (
        <GeneralForm 
            header='Add Board Member'
            buttonLabel='Add'
            buttonIcon='plus'
            onSubmit={() => {}}
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
        </GeneralForm>
    );
}

const EVENT_TYPES = [
    'Is a board meeting',
    'Is an outreach event',
    'Is a SWE recruiting event (CPW, Orientation, SWEet Week, etc.)',
    'None of the above',
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

    const radioButtons = EVENT_TYPES.map(e => 
        <Form.Radio 
            name='type'
            label={e}
            value={e}
            checked={e === responses.type}
            onChange={updateResponse}
        />
    );

    return (
        <GeneralForm 
            header='Add Event'
            buttonLabel='Add'
            buttonIcon='plus'
            onSubmit={() => {}}
        >
            <Form.Group widths='equal'>
                <Form.Input
                    name='name'
                    label='Event Name'
                    type='text'
                    value={responses.name}
                    onChange={updateResponse}
                />
                <Form.Input
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
        </GeneralForm>
    );
}