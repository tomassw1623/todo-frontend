import { DeleteOutline } from "@mui/icons-material";
import { 
  ListItem, 
  Checkbox, 
  ListItemText, 
  InputBase, 
  ListItemSecondaryAction, 
  IconButton } from "@mui/material";
import React, { useState } from "react";

function Todo(props) {

  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);  //수정을 위한 상태값

  const deleteItem = props.deleteItem;

  // todo에서 deleteItem() 함수를 추가
  const deleteEventHandler = () => {
    deleteItem(item);
  }

  //turnOffReadOnly 함수 작성
  const turnOffReadOnly = () => {
    setReadOnly(false);
    // console.log(readOnly);
  }

  //turnOffReadOnly 함수 작성
  const turnOnReadOnly = (e) => {
    if(e.key === 'Enter' && readOnly === false) {
      setReadOnly(true);
      editItem(item);
    } 
    // console.log(readOnly);
  }

  const editItem = props.editItem;
  const editEventHandler = (e) => {
    // item.title = e.target.value;
    // editItem();
    setItem({...item, title:e.target.value});
  }

  const checkboxEventHandler = (e) => {
    item.done = e.target.checked;
    editItem(item);
  }

  return(
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler}/>
      <ListItemText>
        <InputBase 
          inputProps={{
            "aria-label":"naked",
            readOnly: readOnly }}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton 
          aria-label="Delete Todo" 
          onClick={deleteEventHandler}>
          <DeleteOutline />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;