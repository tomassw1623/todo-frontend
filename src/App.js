import { useEffect, useState } from 'react';
import './App.css';
import Todo from './todocomponents/Todo';
import { AppBar, Button, Container, Grid, List, Paper, Toolbar, Typography } from '@mui/material';
import AddTodo from './todocomponents/AddTodo';
import { call, signout } from './service/ApiService';

function App() {

  const [items, setItems] = useState([]);
  //로딩처리... 
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    call("/todo", "GET", null).then((response) => {
      setItems(response.data);  
      setLoading(false);      //로딩 끝
    });
  },[]);


  const addItem = (item) => {
    call("/todo","POST",item)
    .then((response) => setItems(response.data));
  }

  //삭제를 위한 deleteItem() 함수
  const deleteItem = (item) => {
    call("/todo","DELETE", item)
    .then((response) => setItems(response.data));
  };

  //수정 함수... 
  const editItem = (item) => {
    call("/todo","PUT",item)
    .then((response) => setItems(response.data));
  }


  //navigationBar 추가
  let navigationBar = (
    <AppBar position='static'>
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant='h6'>오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color='inherit' raised="true" onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  let todoItems = items.length > 0 && (
    <Paper style={{margin: 16}}>
      <List>
        {items.map((item) => (
          <Todo item={item} key={item.id} deleteItem={deleteItem} 
          editItem={editItem} />
        ))}
      </List>
    </Paper>);

  /* 로딩 중이 아닐 때 랜더링할 부분 */
  let todoListPage = (
    <div>
      {navigationBar} {/* 네비게이션 바 랜더링 */}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  )
  /* 로딩 중에 랜더링할 부분 */
  let loadingPage = <h1>로딩중.... </h1>;
  let content = loadingPage;  //content가 화면에 보여질 부분... 

  if(!loading){ /* 로딩 중이 아니면 todoListPage를 선택 */
    content = todoListPage;
  }

  return (
    <div className="App">{content}</div>
  );
}

export default App;
