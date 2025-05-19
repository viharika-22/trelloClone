import React from 'react';
import './Card.css'; // optional: style your card here

function Card({ content }) {
  return (
    <div className="card">
      {content}
    </div>
  );
}

export default Card;
