import React from "react";
import { useState } from "react";

const ItemForm = ({ addItem}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const handlesubmit = (e) => {

    e.preventDefault();

      const newItem = {
        id: Date.now(),
        title,
        content
      };

      addItem(newItem);
      setTitle('');
      setContent('');
    
  };

  return (
    <form onSubmit={handlesubmit}>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter item name" required
      />
    <textarea
     placeholder="Content"
     value={content}
     onChange={(e)=> setContent(e.target.value)}
     required
    />
      <button type="submit">Add Item</button>

    </form>
  );
};

export default ItemForm;
