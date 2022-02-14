import axios from 'axios';
import { useEffect, useState } from 'react';
import './conversations.css';

export default function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
      const res = await axios.get("/users/" + friendId);
      // console.log(res);
      setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        src="https://res.cloudinary.com/immeraj/image/upload/v1642276822/avatar_y2fae7.jpg"
        alt="pic"
        className="conversationImg"
      />
      <span className="conversationName">{user.username}</span>
    </div>
  );
}
