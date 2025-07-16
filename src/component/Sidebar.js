import React, { useState, useEffect } from 'react';
import useAppStore from '../store/useAppStore';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [newChatroomName, setNewChatroomName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const chatrooms = useAppStore((state) => state.chatrooms);
  const addChatroom = useAppStore((state) => state.addChatroom);
  const deleteChatroom = useAppStore((state) => state.deleteChatroom);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const isDarkMode = useAppStore((state) => state.isDarkMode);

  const filteredChatrooms = chatrooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateChatroom = () => {
    if (newChatroomName.trim()) {
      const newChatroom = { id: uuidv4(), name: newChatroomName.trim() };
      addChatroom(newChatroom);
      setNewChatroomName('');
      toast.success(`Chatroom '${newChatroom.name}' created!`);
    } else {
      toast.error("Chatroom name cannot be empty.");
    }
  };

  const handleDeleteChatroom = (id, name) => {
    if (window.confirm(`Are you sure you want to delete chatroom '${name}'?`)) {
      deleteChatroom(id);
      toast.success(`Chatroom '${name}' deleted!`);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty('--sidebar', '#1E1F20');
      document.documentElement.style.setProperty('--iconBg', '#353637');
      document.documentElement.style.setProperty('--main', '#131314');
      document.documentElement.style.setProperty('--text', '#fff');
      document.documentElement.style.setProperty('--heading', '#C4C7C5');
      document.documentElement.style.setProperty('--logo', '#fff');
      document.documentElement.style.setProperty('--card', '#1E1F20');
      document.documentElement.style.setProperty('--cardIconbg', '#131314');
      document.documentElement.style.setProperty('--cardHover', '#353637');
      document.documentElement.style.setProperty('--input', '#1E1F20');
    } else {
      document.documentElement.style.setProperty('--sidebar', '#F0F4F9');
      document.documentElement.style.setProperty('--iconBg', '#D4DAE1');
      document.documentElement.style.setProperty('--main', '#FFFFFF');
      document.documentElement.style.setProperty('--text', '#222');
      document.documentElement.style.setProperty('--heading', '#C4C7C5');
      document.documentElement.style.setProperty('--logo', '#797979');
      document.documentElement.style.setProperty('--card', '#f0f4f9');
      document.documentElement.style.setProperty('--cardIconbg', '#fff');
      document.documentElement.style.setProperty('--cardHover', '#DDE3EA');
      document.documentElement.style.setProperty('--input', '#F0F4F9');
    }
  }, [isDarkMode]);

  return (
    <div className={`sidebar ${extended ? 'extended' : ''}`}>
      <div className="menu" onClick={() => setExtended(prev => !prev)}>
        <i className="bx bx-menu"></i>
        {extended && <span>Menu</span>}
      </div>

      {extended && (
        <div className="new-chat-section">
          <input
            type="text"
            placeholder="New chatroom name"
            value={newChatroomName}
            onChange={(e) => setNewChatroomName(e.target.value)}
          />
          <button onClick={handleCreateChatroom}>Create</button>
        </div>
      )}

      {extended && (
        <div className="search-chat-section">
          <input
            type="text"
            placeholder="Search chatrooms"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {extended && (
        <div className="chatrooms-list">
          <h3>Chatrooms</h3>
          <ul>
            {filteredChatrooms.map((room) => (
              <li key={room.id}>
                <span>{room.name}</span>
                <i className="bx bx-trash" onClick={() => handleDeleteChatroom(room.id, room.name)}></i>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bottom-icons">
        <ul>
          <li>
            <i className="bx bx-help-circle"></i>
            {extended && <span>Help</span>}
          </li>
          <li>
            <i className="bx bx-history"></i>
            {extended && <span>Activity</span>}
          </li>
          <li>
            <i className="bx bx-cog"></i>
            {extended && <span>Settings</span>}
          </li>
          <li onClick={toggleDarkMode}>
            <i className={`bx ${isDarkMode ? 'bxs-sun' : 'bxs-moon'}`}></i>
            {extended && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;