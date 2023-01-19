import React, {useState,useEffect} from "react";
import "./todo.css";


//======================================================================get data from local storage on refreshing==========================================================
const getLocalItems =() =>{
    let list = localStorage.getItem('lists');
    if(list)
    return JSON.parse(localStorage.getItem('lists'));
    else
    return [];
}
const TodoFunc = () =>{
    const[inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] =useState(null);
    // ======================================================================add new element in list========================================================================
    const addItem = ()=>{
        if(!inputData)
        alert("input data");
        else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem) => {
                    if(elem.id === isEditItem)
                    return {...elem, name:inputData}
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
        }
        else{
            const inputDataId = {id: new Date().getTime().toString(), name:inputData};
            setItems([...items, inputDataId]);
            setInputData('');
        }
    }
    //========================================================================delete element from list=======================================================================
    const deleteItem = (index) =>{
        console.log(index);
        const updateItems = items.filter((elem) =>{
            return index !== elem.id;
        });
        setItems(updateItems);
    }
    //=========================================================================edit elements in list========================================================================
    const editItem = (id) =>{
        let newEditItem = items.find((elem) =>{
            return elem.id === id;
        });
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }
    //=======================================================================add data to local storage=======================================================================
    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(items))
    },[items]);
return (
    <>
    <div className="main-div">
        <div className="child-div">
            <h2>Add your list</h2>
            <div className="addItems">
                <input type="text" placeholder="write items" value ={inputData} onChange={(e) => setInputData(e.target.value)}/>
                {
                    toggleSubmit ? <i class="fa-sharp fa-solid fa-plus add-btn" title="Add Item" onClick={addItem}></i> : <i class="fa-sharp fa-solid fa-pen-to-square add-btn" title="Update Item" onClick={addItem}></i>
                }
                
            </div>

            <div className="showItems">
                {
                    items.map((elem) =>{
                        return(
                            <div className="eachItem" key={elem.id}>
                                <h3>{elem.name}</h3>
                                <div>
                                    <i class="fa-sharp fa-solid fa-pen-to-square add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                    <i class="fa-sharp fa-solid fa-trash add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                </div>
                            </div>
                        )

                    })
                }
                
            </div>

           

        </div>
    </div>
    </>
)
}
export default TodoFunc;