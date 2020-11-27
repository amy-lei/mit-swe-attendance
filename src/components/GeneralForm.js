import {Segment, Form, Header} from 'semantic-ui-react';

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
            <Form onSubmit={onSubmit}>
                {children}
                <Form.Button
                    className='form-btn'
                    color='purple'
                    floated='right'
                    icon={buttonIcon}
                    content={buttonLabel}
                />
            </Form>
        </Segment>
    );
}
