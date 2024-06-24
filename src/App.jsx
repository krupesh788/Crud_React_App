import React, { useState, useEffect } from 'react';
import './App.css'
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm ] = useState('');

  // Load items from local storage

  useEffect(() => { 
    
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if(storedItems){

      setItems(storedItems);
    }
    else{
      // fetch dynamic data from API

      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
          const initialItems = data.slice(0, 10).map(item => ({
            id: item.id,
            title: item.title,
            content: item.body
          }));
          setItems(initialItems);
          localStorage.setItem('items', JSON.stringify(initialItems));
        });
    }
    
  }, []);

  // save items to localstorage

  useEffect(() => {

      localStorage.setItem('items', JSON.stringify(items));

  }, [items]);



  const addItem = (item) => {
    setItems([...items, item]);
  };

  const updateItem = (updatedItem) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
  
  };

  const deleteItem = (id) => {
     setItems(items.filter(item => item.id !== id));

  };



  const filteredItems = items.filter(item =>

    item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className='App'>

      <h1>React CRUD App</h1>
      <input 
        type='text'
        value={searchTerm}
        onChange={(e) =>setSearchTerm(e.target.value)}
        placeholder='Search...' />

      <ItemForm addItem={addItem} />
      <ItemList items = {filteredItems} deleteItem={deleteItem} updateItem={updateItem} />
      
      
    </div>
  );
};

export default App;
