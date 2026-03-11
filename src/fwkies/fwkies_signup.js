import React from 'react';
import axios from 'axios';

function FwkiesSignup() {
  const [name, setName] = React.useState('');
  const [lastname, setLastName] = React.useState('');
  const [interests, setInterests] = React.useState([]); // Updated to store an array of interests
  const [filteredInterests, setFilteredInterests] = React.useState([]); // Filtered interests for autocomplete
  
  const [interestInput, setInterestInput] = React.useState(''); // For new interest input field
  const [email, setEmail] = React.useState('');
  const [birthdate, setBirthdate] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [photo, setPhoto] = React.useState(null);
  const [error, setError] = React.useState('');

  const predefinedInterests = [
    'Technology',
    'Sports',
    'Music',
    'Movies',
    'Art',
    'Science',
    'Travel',
    'Health & Fitness',
    'Cooking',
    'Photography',
    'Writing',
    'Fashion',
    'Gaming',
    'Finance',
    'Education',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      //const interestsString = interests.join(','); // Join interests into a comma-separated string
      let url = 'http://localhost:5032/api/file/upload/photo/profile';
      let formData = new FormData();
      formData.append('file', photo);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      
      try {
        console.log("Form submitted");
  
        // Await for the profile picture upload to complete
        const photoResponse = await axios.post(url, formData, config);
        const prof_pic_id = photoResponse.data.fileName;
  
        // Proceed to user signup after photo upload completes
        await axios.post('http://localhost:5032/api/users/SignUp', {
          name,
          lastname,
          email,
          birthdate,
          profile_description: description,
          interests: interests, // Send the interests string
          password,
          profile_picture: prof_pic_id, // Attach the profile picture ID
        });
  
        console.log("User signed up successfully");
      } catch (error) {
        console.error("Error submitting form", error);
        setError("An error occurred while submitting the form.");
      }
    }
  };

  const validateForm = () => {
    if (!name || !lastname || !email || !birthdate || !description || !password || !passwordConfirmation || !photo) {
      setError('All fields are required, including the photo.');
      return false;
    }

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one capital letter, one number, one special character, and be at least 10 characters long');
      return false;
    }

    setError('');
    return true;
  };

  const addInterest = () => {
    if (predefinedInterests.includes(interestInput.trim()) && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]); // Add the selected interest
      setInterestInput(''); // Clear the input field
      setFilteredInterests([]); // Clear the suggestions
    } else {
      setError('Please select a valid interest from the list.');
    }
  };

   // Handle interest input change and filter suggestions
   const handleInterestInputChange = (e) => {
    const input = e.target.value;
    setInterestInput(input);
    
    if (input.trim() !== '') {
      const filtered = predefinedInterests.filter((interest) =>
        interest.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredInterests(filtered);
    } else {
      setFilteredInterests([]);
    }
  };


  return React.createElement(
    'div',
    { className: 'min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8' },

    React.createElement(
      'div',
      { className: 'sm:mx-auto sm:w-full sm:max-w-md' },
      React.createElement(
        'h2',
        { className: 'mt-6 text-center text-3xl font-extrabold text-gray-900' },
        'Sign up for our social media'
      )
    ),

    React.createElement(
      'div',
      { className: 'mt-8 sm:mx-auto sm:w-full sm:max-w-md' },
      React.createElement(
        'div',
        { className: 'bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10' },
        React.createElement(
          'form',
          { className: 'space-y-6', onSubmit: handleSubmit },

          // Name Field
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'name', className: 'block text-sm font-medium text-gray-700' },
              'Name'
            ),
            React.createElement(
              'div',
              { className: 'mt-1' },
              React.createElement('input', {
                id: 'name',
                name: 'name',
                type: 'text',
                required: true,
                className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm',
                value: name,
                onChange: (e) => setName(e.target.value),
              })
            )
          ),

          // Last name field
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'name', className: 'block text-sm font-medium text-gray-700' },
              'Last Name'
            ),
            React.createElement(
              'div',
              { className: 'mt-1' },
              React.createElement('input', {
                id: 'lastname',
                name: 'lastname',
                type: 'text',
                required: true,
                className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm',
                value: lastname,
                onChange: (e) => setLastName(e.target.value),
              })
            )
          ),

          // Email Field
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'email', className: 'block text-sm font-medium text-gray-700' },
              'Email address'
            ),
            React.createElement(
              'div',
              { className: 'mt-1' },
              React.createElement('input', {
                id: 'email',
                name: 'email',
                type: 'email',
                autoComplete: 'email',
                required: true,
                className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm',
                value: email,
                onChange: (e) => setEmail(e.target.value),
              })
            )
          ),

          // Birthdate Field
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'birthdate', className: 'block text-sm font-medium text-gray-700' },
              'Birthdate'
            ),
            React.createElement(
              'div',
              { className: 'mt-1' },
              React.createElement('input', {
                id: 'birthdate',
                name: 'birthdate',
                type: 'date',
                required: true,
                className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm',
                value: birthdate,
                onChange: (e) => setBirthdate(e.target.value),
              })
            )
          ),

          // Interests Field with autocomplete
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'interests', className: 'block text-sm font-medium text-gray-700' },
              'Interests'
            ),
            React.createElement(
              'div',
              { className: 'mt-1 flex space-x-2' },
              React.createElement('input', {
                id: 'interests',
                name: 'interests',
                type: 'text',
                className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm',
                value: interestInput,
                onChange: handleInterestInputChange, // Update on input change
                list: 'suggestions', // Associate with datalist
              }),
              React.createElement(
                'button',
                {
                  type: 'button',
                  className: 'px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-gray-900',
                  onClick: addInterest,
                },
                'Add'
              )
            ),
            // Datalist for autocomplete suggestions
            filteredInterests.length > 0 && (
              <datalist id="suggestions">
                {filteredInterests.map((interest, index) => (
                  <option key={index} value={interest}>
                    {interest}
                  </option>
                ))}
              </datalist>
            )
          ),

          // Selected interests
          interests.length > 0 && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Selected Interests:</label>
              <ul className="mt-1 list-disc list-inside">
                {interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
          ),
          // Short Description Field
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'description', className: 'block text-sm font-medium text-gray-700' },
              'Short description'
            ),
            React.createElement(
              'div',
              { className: 'mt-1' },
              React.createElement('textarea', {
                id: 'description',
                name: 'description',
                rows: '3',
                className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm',
                value: description,
                onChange: (e) => setDescription(e.target.value),
              })
            )
          ),

          // Password Field
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'password', className: 'block text-sm font-medium text-gray-700' },
              'Password'
            ),
            React.createElement(
              'div',
              { className: 'mt-1' },
              React.createElement('input', {
                id: 'password',
                name: 'password',
                type: 'password',
                autoComplete: 'new-password',
                required: true,
                className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm',
                value: password,
                onChange: (e) => setPassword(e.target.value),
              })
            )
          ),

          // Password Confirmation Field
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'passwordConfirmation', className: 'block text-sm font-medium text-gray-700' },
              'Confirm Password'
            ),
            React.createElement(
              'div',
              { className: 'mt-1' },
              React.createElement('input', {
                id: 'passwordConfirmation',
                name: 'passwordConfirmation',
                type: 'password',
                required: true,
                className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm',
                value: passwordConfirmation,
                onChange: (e) => setPasswordConfirmation(e.target.value),
              })
            )
          ),

          // Photo Upload Field
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'photo', className: 'block text-sm font-medium text-gray-700' },
              'Upload a Photo'
            ),
            React.createElement(
              'div',
              { className: 'mt-1' },
              React.createElement('input', {
                id: 'photo',
                name: 'photo',
                type: 'file',
                accept: 'image/*',
                required: true,
                className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm',
                onChange: (e) => setPhoto(e.target.files[0]),
              })
            )
          ),

          // Error Message
          error &&
            React.createElement(
              'div',
              { className: 'text-red-600 text-sm' },
              error
            ),

          // Submit Button
          React.createElement(
            'div',
            null,
            React.createElement(
              'button',
              {
                type: 'submit',
                className: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black',
              },
              'Sign up'
            )
          )
        ),

        // Login Redirect
        React.createElement(
          'div',
          { className: 'mt-6' },
          React.createElement(
            'div',
            { className: 'relative' },
            React.createElement('div', { className: 'absolute inset-0 flex items-center' },
              React.createElement('div', { className: 'w-full border-t border-gray-300' })
            ),
            React.createElement(
              'div',
              { className: 'relative flex justify-center text-sm' },
              React.createElement(
                'span',
                { className: 'px-2 bg-white text-gray-500' },
                'Already have an account?'
              )
            )
          ),

          React.createElement(
            'div',
            { className: 'mt-6' },
            React.createElement(
              'a',
              {
                href: '/fwkies_login',
                className: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50',
              },
              'Log in'
            )
          )
        )
      )
    )
  );
}

export default FwkiesSignup;
