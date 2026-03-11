import React from 'react';
import { Link } from 'react-router-dom';

function FwkiesNachrichten() {
  const [selectedConversation, setSelectedConversation] = React.useState(null);
  const [conversations, setConversations] = React.useState([]);
  const [testMode, setTestMode] = React.useState(true);
  const [newMessage, setNewMessage] = React.useState('');
  const [messages, setMessages] = React.useState({});

  const testConversations = [
    { id: 1, name: "Anna Frank", lastMessage: "Hey, how are you? help me escape a KZ camp!!!", date: "1940-05-10T14:30:00", photo: "/images/lalalas.jpg" },
    { id: 2, name: "Adolf Mitler", lastMessage: "Tomorrow we Invade MOLAND", date: "1933-05-09T09:15:00", photo: "/jane-smith.jpg" },
    { id: 3, name: "Andrew Mate", lastMessage: "What colour is your bughatti", date: "2023-05-08T18:45:00", photo: "/mike-johnson.jpg" },
    { id: 4, name: "Chris Loukeris", lastMessage: "Pame Valo?", date: "2023-05-11T10:20:00", photo: "/emily-brown.jpg" },
    { id: 5, name: "Giorgoul", lastMessage: "lass mich sterben, mir ist langweilich", date: "2023-05-12T16:45:00", photo: "/alex-wilson.jpg" },
    { id: 6, name: "Kineza Gomena", lastMessage: "Tsin tson yen UWU?", date: "2023-05-13T11:30:00", photo: "/sarah-lee.jpg" },
    { id: 7, name: "Afrikanos pwlitis sklavwn", lastMessage: "5 dollars the head aanfuhnfusehnf i meant the piece", date: "2023-05-14T09:00:00", photo: "/tom-parker.jpg" },
    { id: 8, name: "Tantis", lastMessage: "LOL ", date: "2023-05-15T13:15:00", photo: "/lisa-chen.jpg" }
  ];

  React.useEffect(() => {
    if (testMode) {
      setConversations(testConversations);
    } else {
      fetchConversations();
      login();
    }
  }, [testMode]);

  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/conversations');
      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const login = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'testuser', password: 'testpassword' }),
      });
      const data = await response.json();
      console.log('Logged in successfully:', data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    if (!messages[conversation.id]) {
      setMessages(prevMessages => ({
        ...prevMessages,
        [conversation.id]: [{ text: conversation.lastMessage, sender: conversation.name }]
      }));
    }
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      const updatedMessages = [
        ...(messages[selectedConversation.id] || []),
        { text: newMessage, sender: 'You' }
      ];
      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedConversation.id]: updatedMessages
      }));
      setNewMessage('');
      
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMessage, date: new Date().toISOString() }
            : conv
        )
      );
    }
  };

  return React.createElement(
    'div',
    { className: 'flex flex-col h-screen' },
    React.createElement(
      'nav',
      { className: 'bg-gray-800 text-white p-4' },
      React.createElement(
        'ul',
        { className: 'flex justify-around' },
        React.createElement('li', null, React.createElement(Link, { to: '/fwkies_homepage_logged_in', className: 'hover:text-gray-300' }, 'Homepage')),
        React.createElement('li', null, React.createElement(Link, { to: '/fwkies_aggelies', className: 'hover:text-gray-300' }, 'Ads')),
        React.createElement('li', null, React.createElement(Link, { to: '/fwkies_search', className: 'hover:text-gray-300' }, 'SearchArticles')),
        React.createElement('li', null, React.createElement(Link, { to: '/fwkies_search_profiles', className: 'hover:text-gray-300' }, 'SearchProfiles')),
        React.createElement('li', null, React.createElement(Link, { to: '/fwkies_profile', className: 'hover:text-gray-300' }, 'Profile')),
        React.createElement('li', null, React.createElement('span', { className: 'text-gray-500' }, 'Messages'))
      )
    ),
    React.createElement(
      'div',
      { className: 'flex flex-grow' },
      React.createElement(
        'div',
        { className: 'w-1/3 border-r overflow-y-auto' },
        conversations.sort((a, b) => new Date(b.date) - new Date(a.date)).map((conversation) =>
          React.createElement(
            'div',
            {
              key: conversation.id,
              className: 'p-4 border-b cursor-pointer hover:bg-gray-100',
              onClick: () => handleConversationClick(conversation)
            },
            React.createElement(
              'div',
              { className: 'flex items-center' },
              React.createElement('img', { src: conversation.photo, alt: `${conversation.name}'s profile picture`, className: 'w-12 h-12 rounded-full mr-4' }),
              React.createElement(
                'div',
                null,
                React.createElement('h3', { className: 'font-semibold' }, conversation.name),
                React.createElement('p', { className: 'text-sm text-gray-600' }, new Date(conversation.date).toLocaleString())
              )
            ),
            React.createElement('p', { className: 'mt-2 text-sm text-gray-700' }, conversation.lastMessage)
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'w-2/3 flex flex-col' },
        selectedConversation ? (
          React.createElement(
            React.Fragment,
            null,
            React.createElement(
              'div',
              { className: 'p-4 border-b' },
              React.createElement(
                'div',
                { className: 'flex items-center' },
                React.createElement('img', { src: selectedConversation.photo, alt: `${selectedConversation.name}'s profile picture`, className: 'w-16 h-16 rounded-full mr-4' }),
                React.createElement(
                  'div',
                  null,
                  React.createElement('h2', { className: 'text-xl font-semibold' }, selectedConversation.name),
                  React.createElement('p', { className: 'text-sm text-gray-600' }, `Last message: ${new Date(selectedConversation.date).toLocaleString()}`)
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'flex-grow p-4 overflow-y-auto' },
              (messages[selectedConversation.id] || []).map((message, index) =>
                React.createElement(
                  'div',
                  {
                    key: index,
                    className: `mb-2 ${message.sender === 'You' ? 'text-right' : 'text-left'}`
                  },
                  React.createElement(
                    'span',
                    { className: 'inline-block bg-gray-200 rounded px-2 py-1' },
                    message.text
                  )
                )
              )
            ),
            React.createElement(
              'form',
              { onSubmit: handleMessageSubmit, className: 'p-4 border-t' },
              React.createElement(
                'div',
                { className: 'flex' },
                React.createElement('input', {
                  type: 'text',
                  name: 'message',
                  value: newMessage,
                  onChange: handleMessageChange,
                  placeholder: 'Type a message...',
                  className: 'flex-grow border rounded-l px-3 py-2'
                }),
                React.createElement(
                  'button',
                  { type: 'submit', className: 'bg-blue-500 text-white px-4 py-2 rounded-r' },
                  'Send'
                )
              )
            )
          )
        ) : (
          React.createElement(
            'div',
            { className: 'flex items-center justify-center h-full' },
            React.createElement('p', { className: 'text-xl text-gray-500' }, 'Select a conversation to view messages')
          )
        )
      )
    )
  );
}

export default FwkiesNachrichten;
