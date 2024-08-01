import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

function AddTodo(props) {

  //사용자의 입력을 저장할 오브젝트
  const [item, setItem] = useState({title: ""});
  const addItem = props.addItem;

  //onButtonClick 정의
  const onButtonClick = () => {
    if(item.title !== ""){
      addItem(item); //addItem 함수를 실행
      // console.log(item);
      setItem({title: ""});
    }
  };

  //onInputChange 정의
  const onInputChange = (e) => {
    setItem({title: e.target.value});
    // console.log(item);
  };

  //enterKeyEventHandler 함수
  const enterKeyEventHandler = (e) => {
    // console.log(e.key);
    if(item.title !== "" && e.key === 'Enter') {
      onButtonClick();
    }
  }



  return(
    <Grid container style={{marginTop: 20}}>
      <Grid xs={11} md={11}  item style={{paddingRight: 16 }}>
        <TextField placeholder="Add Todo here" fullWidth 
          onChange={onInputChange} 
          onKeyDown={enterKeyEventHandler}
          value={item.title} />
      </Grid>
      <Grid xs={1} md={1} item>
        <Button fullWidth style={{height: '100%'}} color="secondary"
        variant="outlined" onClick={onButtonClick}>
          +
        </Button>
      </Grid>
    </Grid>
  );

}

export default AddTodo;