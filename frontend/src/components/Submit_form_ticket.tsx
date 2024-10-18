import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';


interface Ticket_to_Submit {
    description: string;
    status: string; 

}
interface Submit_form_ticketProps {
increment_Ticket_table:()=>void;
}


    const Submit_form_ticket: React.FC<Submit_form_ticketProps> = ({ increment_Ticket_table}) => {

    const [disabled,setDisabled]=useState<Boolean>(false);
    type Ticket_to_Submit_Keys = keyof Ticket_to_Submit;
    const Ticket_to_Submit_Keys: Ticket_to_Submit_Keys[] = ['description', 'status'];

    const { register, handleSubmit } = useForm<Ticket_to_Submit>();

    //check that formBody will post all form fields
    const onSubmit = async (data: Ticket_to_Submit) => {
        setDisabled(true)
        let validFieldCount1 = 0;
        //ensure that validFieldCount1 start from 0 (reason for checkConditionAndExecute1)
        const checkConditionAndExecute1 = async () => {
            if( validFieldCount1===0 ){
                
                Ticket_to_Submit_Keys.forEach((key) => {
                    if (data[key]) {
                    validFieldCount1++;
                }});
    
            //process that ensure that inserted data contain all typed fields (reason for checkConditionAndExecute2)
                const checkConditionAndExecute2 = async () => {
                    if (validFieldCount1 === Ticket_to_Submit_Keys.length) {
                        setTimeout(async () => {
                                console.log('success')
                                setDisabled(false)

                                try {
                                    const res = await fetch(`http://localhost:5066/api/Ticket`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ description: data.description,status:data.status, created: new Date() })
                                    });
                        
                                    if (!res.ok) {
                                        throw new Error('Network response was not ok');
                                    } else {
                        
                                        setDisabled(false)
                                        increment_Ticket_table()
                                    }
                                } catch (error) {
                                    console.error('Error fetching data:', error);
                                }
                        }, 300);
                    } else {
                        setTimeout(() => {
                            checkConditionAndExecute2();
                        }, 200);
                    }
            };
            checkConditionAndExecute2();
            }
            else{   setTimeout(() => {
                 checkConditionAndExecute1();
                    }, 200);}
        }
        checkConditionAndExecute1();

    };


    return (
        <div style={{justifyContent: 'center' , marginTop:'50px',marginLeft:'50px',marginRight:'50px'}}>
            <Form onSubmit={handleSubmit(onSubmit)}>


                <Form.Group className="mb-3">
                <Form.Label>Descriprion</Form.Label>
                <Form.Control 
                    placeholder='Description'
                    type='text'
                    {...register('description', { required: true })}
                />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
 
                  <Form.Select aria-label="Default select example"   {...register('status', { required: true })} defaultValue={'Closed'}>
                    <option value="Closed">Closed</option>
                    <option value="Open">Open</option> 
                    </Form.Select>
                </Form.Group>
                
                {disabled &&  <Button variant="primary" type="submit" disabled>Submit</Button> }
                {!disabled &&  <Button variant="primary" type="submit" >Submit</Button> }


            </Form>
        </div>
    );
};

export default Submit_form_ticket;
