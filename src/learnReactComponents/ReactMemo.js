import React, { useState } from "react";

const List = ({ items, onDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <ListItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </ul>
  );
};

const ListItem = ({ item, onDelete }) => {
  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <li>
      {item.text} <button onClick={handleDelete}>Видалити</button>
    </li>
  );
};

const ReactMemo = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Елемент 1" },
    { id: 2, text: "Елемент 2" },
    { id: 3, text: "Елемент 3" },
  ]);

  const handleDelete = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <h1>Список елементів</h1>
      <List items={items} onDelete={handleDelete} />
    </div>
  );
};

export default ReactMemo;
