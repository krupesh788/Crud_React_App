import React, {useState , useEffect} from 'react'

const ItemList = ({items, deleteItem, updateItem}) => {

    const [isEditing, setIsEditing] = useState(null);
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentContent, setCurrentContent] = useState('');
  
    const handleEdit = (item) => {
      setIsEditing(item.id);
      setCurrentTitle(item.title);
      setCurrentContent(item.content);
    };
  
    const handleUpdate = (id) => {
      updateItem({ id, title: currentTitle, content: currentContent });
      setIsEditing(null);
    };

  return (
    <>
     <div>
     <h2>Item List</h2>

     {items.map(item => (
        <div key={item.id}>
          {isEditing === item.id ? (
            <div>
              <input
                type="text"
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
              />
              <textarea
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
              />
              <button onClick={() => handleUpdate(item.id)}>Update</button>
            </div>
            ) : (
            <div>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}



        </div> 
    </>
  )
}

export default ItemList
