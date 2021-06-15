import React from 'react'
import { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

import { RiAddFill } from 'react-icons/ri';


let temp =[];
const AddToCustomListModal = ({listsData, AddToCustomList}) => {

    const [modalShow, setModalShow] = React.useState(false);
    const [checkboxesState, setCheckboxesState] = useState([]);
    const [customListsJSX, setCustomListsJSX] = useState(null);
    // const [tempState, setTempState] = useState(null);

  
   
   const InitializeCheckboxStates = () =>
   {
       temp = [];
       for(var i=4; i<listsData.length; i++)
       {
            temp.push({
              "listName" : listsData[i].listName,
              "checked" : false
            })
       }
       
     

      //  setTempState(temp);
   }

  
   const onConfirmClick = () =>
   {

       console.log(checkboxesState);
       setModalShow(false);
       InitializeCheckboxStates();
       AddToCustomList(checkboxesState);
       // setModalShow(false);
   }

  //  const someFunction = () =>
  //  {
  //      setCheckboxesState(tempState);
  //  }

     

    const SetCustomListsCheckboxes = async () =>
    {
        const tempVar = [];  
        for(var i=4; i<listsData.length; i++) //label has + i to every child can have unique id and function properly
        {

            const id = i;
            tempVar.push(
                <Form.Group key={id} controlId={"listNumber" + id.toString()}>
                    <Form.Check type="checkbox" label={listsData[i].listName}  onChange={e => {
                       temp[id-4].checked = e.target.checked;
                    }}/>
                </Form.Group>
            )
            
        }   

        setCustomListsJSX(tempVar);


    }

    


    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add to
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             <Form>
             {customListsJSX}
             </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={onConfirmClick}>
                  Confirm</Button>
              <Button onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
          </Modal>
        );
      }

     

      useEffect(async () =>
      {
          if(listsData)
          {
            InitializeCheckboxStates()
            SetCustomListsCheckboxes()
            // await someFunction()
          }
      }, [listsData])


    useEffect(() =>
    {
      setCheckboxesState(temp);
    }, [temp]);

    return (
        <>
        <Button className="button blue" onClick={() => {
            setModalShow(true)
            }}>
        <RiAddFill className="icon"></RiAddFill>Custom Lists
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
            setModalShow(false)
            InitializeCheckboxStates();
        }}
      />
        </>
    )
}

export default AddToCustomListModal
