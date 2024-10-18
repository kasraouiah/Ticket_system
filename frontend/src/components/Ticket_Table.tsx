import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useForm } from 'react-hook-form';



interface all_Ticket_attributes {
    id: string; 
    description: string;
    status: string;
    created: Date;
}

//attributes used for editting
interface Ticket_attributes_to_use {
    description: string;
    status: string;
    
}

//attribute used for displaying infos gotten from Database
interface Ticket_table_Props {
    currentPage:number;
    Decrement_Ticket_table:(x?:number)=>void;
    increment_Ticket_table:()=>void;
    tableRows_Counter:number;
    tableRows:all_Ticket_attributes[]
    PageCounter:number
}

const Ticket_table: React.FC<Ticket_table_Props> = ({currentPage,Decrement_Ticket_table,increment_Ticket_table, tableRows_Counter, tableRows}) => {

    type Ticket_attributes_to_useKeys = keyof Ticket_attributes_to_use;
    const Ticket_attributes_to_useKeys: Ticket_attributes_to_useKeys[] = ['description', 'status'];
    const { register, handleSubmit } = useForm<Ticket_attributes_to_use>();
    const [disabled,setDisabled]=useState<Boolean>(false); 
    const [show_delete_Poup, set_Show_delete_Poup] =useState<Boolean>(false)
    const [show_edit_Poup, set_Show_edit_Poup] =useState<Boolean>(false)

    const [item_To_delete, set_Item_To_delete] = useState<all_Ticket_attributes>({
        id: '',
        description: '',
        status: '',
        created: new Date(),
    });
    
 /*   
    useEffect(() => {
        Get_Ticket();
        
    }, [Element_Per_Page, set_Page_Counter]);
 

    const Get_Ticket = async () => {

 
        try {
            const res = await fetch(`http://localhost:5066/api/Ticket?pageIndex=${currentPage}&pageSize=${Element_Per_Page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            } else {
                const response = await res.json();
//                set_Page_Counter(response.data.totalPages);
//                set_TableRows(response.data.items);
//                set_tableRows_Counter(response.data.items.length)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };
*/

    const Delete_ticket = async (x?:string) => {
        try {
            const res = await fetch(`http://localhost:5066/api/Ticket/${item_To_delete.id}`, {
                method: 'DELETE',

            });

            console.log(x)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            } else {
                if(tableRows_Counter===1){
                    Decrement_Ticket_table(currentPage-1)
                    console.log('one item left')
                }
                else{
//                Get_Ticket()
                increment_Ticket_table()
                set_Show_delete_Poup(false)
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const Update_ticket = async ( description:string, status:string) => {
        try {
            const res = await fetch(`http://localhost:5066/api/Ticket/${item_To_delete.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: description,status:status })
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            } else {

                setDisabled(false)
                set_Show_edit_Poup(false)
                increment_Ticket_table()
//                update_page()
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    
    const formatDate = (dateObj: Date) => {
        const isoString = dateObj.toISOString(); 
        const [year, month, day] = isoString.split('T')[0].split('-');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const newMonth = monthNames[parseInt(month) - 1];
        const newDate = `${day}-${newMonth}-${year}`;
        return newDate;
    };


    const onSubmit = async (data: Ticket_attributes_to_use) => {
        setDisabled(true)
        let validFieldCount = 0;
        let validFieldCount1 = 0;
        
        const checkConditionAndExecute1 = async () => {
            if(validFieldCount===0 && validFieldCount1===0 ){
                
        Ticket_attributes_to_useKeys.forEach((key) => {
            if (data[key]) {
            validFieldCount1++;
        }});
    
    
        const checkConditionAndExecute2 = async () => {
            if (validFieldCount1 === Ticket_attributes_to_useKeys.length) {
                setTimeout(() => {
                        console.log('success    ' , data)
                        Update_ticket(data.description,data.status)
                        
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
<div style={{ justifyContent: 'center', marginTop: '50px', marginLeft: '50px', marginRight: '50px' }}>
         <Table striped bordered hover size="sm">
            <thead>
                <tr style={{ textAlign: 'start',backgroundColor:'red' }}>
                    <th className='bg-success text-white'>Ticket id</th>
                    <th className='bg-success text-white'>Description</th>
                    <th className='bg-success text-white'>Status</th>
                    <th className='bg-success text-white'>Date</th>
                    <th className='bg-success text-white'>Actions</th>
                </tr>
            </thead>
            <tbody style={{ textAlign: 'start' }}>
                {tableRows.map((row, index) => (
                    <tr key={index}>
                        <td>{row.id}</td>
                        <td>{row.description}</td>
                        <td>{row.status}</td>
                        <td>{formatDate(new Date(row.created))}</td>
                        <td style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <a >
                                <button type="button" className="btn"  onClick={() => { set_Show_edit_Poup(true); set_Item_To_delete(row) }} >
                                   <p className='text-decoration-underline'>Update</p> 
                                </button>
                            </a>
                            <a>
                                <button onClick={() => { set_Show_delete_Poup(true); set_Item_To_delete(row) }} type="button" className="btn">
                                     <p className='text-decoration-underline'>Delete</p> 
                                </button>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>

{show_delete_Poup && (
    
<div
    className="modal show"
    style={{ display: 'block', position: 'initial' }}
>

<Modal show={true} onHide={() => { set_Show_delete_Poup(false) }}  animation={false}>
        <Modal.Header>
          <Modal.Title>Delete Ticket !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you confirm deleting ticket please

        <ul>
            <li >Ticket id <strong>{item_To_delete.id}</strong></li>
            <li>Ticket description  <strong>{item_To_delete.description}</strong></li>
            <li>Ticket status  <strong>{item_To_delete.status}</strong></li>
        </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { set_Show_delete_Poup(false) }}>
            Close
          </Button>
          <Button variant="danger" onClick={() => { Delete_ticket(item_To_delete.id)}}>
            confirm delete
          </Button>
        </Modal.Footer>
</Modal>

</div>
)}

{show_edit_Poup && (
    
<div
    className="modal show"
    style={{ display: 'block', position: 'initial' }}
>

      <Modal show={true} onHide={() => {   increment_Ticket_table() }}  animation={false}>
        <Modal.Header>
          <Modal.Title>Edit Ticket !</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <ul>
            <li >Ticket id <strong>{item_To_delete.id}</strong></li>
            <li>Ticket description  <strong>{item_To_delete.description}</strong></li>
            <li>Ticket status  <strong>{item_To_delete.status}</strong></li>



        </ul>






        <Form onSubmit={handleSubmit(onSubmit)}>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Ticket name</Form.Label>
    <Form.Control
      type="text"
      defaultValue={item_To_delete.description}
      {...register('description', { required: true })}
      autoFocus
    />
  </Form.Group>
  
  <Form.Group className="mb-3">
  <Form.Label>Status</Form.Label>

  <Form.Select aria-label="Default select example"   {...register('status', { required: true })} defaultValue={item_To_delete.status}>
                    <option value="Closed">Closed</option>
                    <option value="Open">Open</option> 
                    </Form.Select>
                </Form.Group>

  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
    <Button variant="secondary" onClick={() => {    increment_Ticket_table()
        
    } }>
      Close
    </Button>
    {
        disabled ?   <Button variant="warning" disabled type="submit">
        Confirm Edit
      </Button>
      :   <Button variant="warning"  type="submit">
      Confirm Edit
    </Button>
    }
 
  </div>
</Form>



        </Modal.Body>
        <Modal.Footer>


        </Modal.Footer>
      </Modal>

</div>

)}
</div>

);


}

export default Ticket_table;
