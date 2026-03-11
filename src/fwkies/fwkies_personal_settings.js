import React from 'react';
import { Link } from 'react-router-dom';

function FwkiesProfileSettings() {
  const [showDeactivateModal, setShowDeactivateModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const handleDeactivate = () => {
    setShowDeactivateModal(true);
  };

  const closeModal = () => {
    setShowDeactivateModal(false);
    setShowConfirmModal(false);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-black text-white p-4' },

    React.createElement(
      'div',
      { className: 'max-w-3xl mx-auto relative' },

      React.createElement(
        Link,
        { to: '/fwkies_profile', className: 'block mb-6 bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700' },
        React.createElement('i', { className: 'fas fa-arrow-left mr-2' }), 'Back'
      ),

      React.createElement(
        'h1',
        { className: 'text-3xl font-bold mb-6 ml-4 md:ml-0' }, // Adjusted margin-left
        'Personal Settings'
      ),

      React.createElement(
        'form',
        { onSubmit: handleSaveChanges, className: 'space-y-6' },

        React.createElement(
          'div',
          null,
          React.createElement('label', { htmlFor: 'username', className: 'block mb-2' }, 'Username'),
          React.createElement('input', { type: 'text', id: 'username', name: 'username', className: 'w-full bg-gray-800 rounded p-2' })
        ),

        React.createElement(
          'div',
          null,
          React.createElement('label', { htmlFor: 'email', className: 'block mb-2' }, 'Email'),
          React.createElement('input', { type: 'email', id: 'email', name: 'email', className: 'w-full bg-gray-800 rounded p-2' })
        ),

        React.createElement(
          'div',
          null,
          React.createElement('label', { htmlFor: 'phone', className: 'block mb-2' }, 'Phone'),
          React.createElement('input', { type: 'tel', id: 'phone', name: 'phone', className: 'w-full bg-gray-800 rounded p-2' })
        ),

        React.createElement(
          'div',
          null,
          React.createElement('label', { htmlFor: 'description', className: 'block mb-2' }, 'Short Description'),
          React.createElement('textarea', { id: 'description', name: 'description', rows: '3', className: 'w-full bg-gray-800 rounded p-2' })
        ),

        React.createElement(
          'div',
          null,
          React.createElement('label', { htmlFor: 'new-password', className: 'block mb-2' }, 'New Password'),
          React.createElement('input', { type: 'password', id: 'new-password', name: 'new-password', className: 'w-full bg-gray-800 rounded p-2' })
        ),

        React.createElement(
          'div',
          null,
          React.createElement('label', { htmlFor: 'confirm-password', className: 'block mb-2' }, 'Confirm New Password'),
          React.createElement('input', { type: 'password', id: 'confirm-password', name: 'confirm-password', className: 'w-full bg-gray-800 rounded p-2' })
        ),

        React.createElement(
          'div',
          { className: 'flex space-x-4' },
          React.createElement(
            'button',
            { type: 'submit', className: 'bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200' },
            'Save Changes'
          ),
          React.createElement(
            'button',
            { type: 'button', onClick: () => window.location.reload(), className: 'bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gray-700' },
            'Cancel'
          )
        )
      ),

      React.createElement(
        'div',
        { className: 'mt-12' },
        React.createElement(
          'button',
          { onClick: handleDeactivate, className: 'bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700' },
          'Deactivate Account'
        )
      ),

      showDeactivateModal && React.createElement(
        'div',
        { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center' },
        React.createElement(
          'div',
          { className: 'bg-white text-black p-6 rounded-lg max-w-md' },
          React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Are you sure?'),
          React.createElement('p', { className: 'mb-6' }, 'This would remove permanently all personal data from our database regarding you. You can\'t reopen the account; you would have to re-create your account.'),
          React.createElement(
            'div',
            { className: 'flex justify-end space-x-4' },
            React.createElement(
              'button',
              { onClick: closeModal, className: 'bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400' },
              'Cancel'
            ),
            React.createElement(
              'button',
              { className: 'bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700' },
              'Deactivate'
            )
          )
        )
      ),

      showConfirmModal && React.createElement(
        'div',
        { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center' },
        React.createElement(
          'div',
          { className: 'bg-white text-black p-6 rounded-lg max-w-md' },
          React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Confirm Changes'),
          React.createElement('p', { className: 'mb-6' }, 'Please enter your current password to confirm changes:'),
          React.createElement('input', { type: 'password', name: 'old-password', className: 'w-full bg-gray-200 rounded p-2 mb-4', placeholder: 'Current Password' }),
          React.createElement(
            'div',
            { className: 'flex justify-end space-x-4' },
            React.createElement(
              'button',
              { onClick: closeModal, className: 'bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400' },
              'Cancel'
            ),
            React.createElement(
              'button',
              { className: 'bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700' },
              'Confirm'
            )
          )
        )
      )
    )
  );
}

export default FwkiesProfileSettings;
