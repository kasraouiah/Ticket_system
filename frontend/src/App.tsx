
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ResponsivePagination from 'react-responsive-pagination';
import './components/App.css';
import Submit_form_ticket from './components/Submit_form_ticket';
import Ticket_table from './components/Ticket_Table';
function App() {


  const [currentPage, setCurrentPage] = useState(1);
  const [PageCounter, setPageCounter] = useState(1);
  const [Element_Per_Page, set_Element_Per_Page] = useState(10);
  const [Ticket_table_key, set_Ticket_table_key] = useState(1);
  const [CreateForm,setCreateForm]=useState<Boolean>(false);
  const [tableRows_Counter, set_tableRows_Counter] = useState<number>(0); 
  const [tableRows, set_TableRows] = useState<all_Ticket_attributes[]>([]); 
 
  interface all_Ticket_attributes {
    id: string; 
    description: string;
    status: string;
    created: Date;
}

const Get_Ticket = async (x?:number) => {

 
    try {
        const res = await fetch(`http://localhost:5066/api/Ticket?pageIndex=${x?x:currentPage}&pageSize=${Element_Per_Page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        } else {
            const response = await res.json();
            set_Page_Counter(response.data.totalPages);
            set_TableRows(response.data.items);
            set_tableRows_Counter(response.data.items.length)
              console.log('items ',response.data.items)


        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

};


useEffect(() => {
  Get_Ticket();

}, []);


//get pages nubmer to set pagination total pages
const set_Page_Counter=(nbr:number)=>{
  setPageCounter(nbr)
}

//when existing at the last page that have one item that get deleted current page should decrement
function Decrement_Ticket_table(x?:number) {
  setCurrentPage(currentPage-1);
  set_Ticket_table_key(Ticket_table_key+1)
  setTimeout(() => {
    Get_Ticket(x)
}, 300);
}

//rerender Table_ticket to consider new item submited or item edited or deleted
function increment_Ticket_table() {
  set_Ticket_table_key(Ticket_table_key+1)
  setCreateForm(false)

  setTimeout(() => {
    Get_Ticket()
    
}, 300);
}

//change current page and update Ticket_table records
  function handle_page_edit(page: number) {
    setCurrentPage(page);
    setTimeout(() => {
      Get_Ticket(page)
    }, 100);

    

  }

  return (
    <div className="flex-container"  style={{display: 'flex', height:'100vh',   paddingTop:'0 !important', marginTop:'0 !important',  flexDirection: 'column' }} >

  {CreateForm &&
      <Button variant={"warning"} onClick={() => setCreateForm(false)} style={{ marginTop:'50px', marginLeft:'50px',  marginRight:'50px'}}>Back to Tickets list</Button>
  }

  {CreateForm &&
      <div style={{minWidth: '100vw', flex:'0.8'}}>
        <Submit_form_ticket  increment_Ticket_table={increment_Ticket_table}/>
      </div>
  }   

{!CreateForm&&
<div>

    <div style={{flex:'0.8'}}>
    <Button variant={"secondary"} onClick={() =>
     {set_Element_Per_Page(Element_Per_Page*PageCounter);
      setCurrentPage(1);
      setTimeout(() => {
        Get_Ticket()
      }, 300);
    }} 
    style={{ marginTop:'50px', marginLeft:'50px'}}>
    Show all ticket records</Button>

    <Button variant={"warning"} onClick={() => 
    {set_Element_Per_Page(10);  setCurrentPage(1)
      setTimeout(() => {
        Get_Ticket()
        
    }, 300);
    }
  
  }
    
    style={{ marginTop:'50px', marginLeft:'50px'}}>
    Show with pagination</Button>


    <Ticket_table  key={Ticket_table_key} currentPage={currentPage} 
     Decrement_Ticket_table={Decrement_Ticket_table} increment_Ticket_table={increment_Ticket_table} tableRows_Counter={tableRows_Counter} tableRows={tableRows} PageCounter={PageCounter} 
     />
    </div>

    <Button variant={"primary"} onClick={() => setCreateForm(true)} style={{ marginTop:'50px', marginLeft:'50px'}}>Add New</Button>


    <div style={{ minWidth: '100vw',   display: 'flex', justifyContent: 'center' , marginTop:'50px'}}>
      <div style={{ width: '80%', display: 'flex' }}>
        <div>
          <ResponsivePagination
            extraClassName="justify-content-start"
            total={PageCounter}
            current={currentPage}
            onPageChange={page => handle_page_edit(page)}
          />
        </div>
      </div>
    </div>
</div>
}

    </div>
  );
}
export default App;
