import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Trash from '../../assets/icons/TrashOutline.svg';

const DeleteUser = ({ ShouldDisplay, names }) => {
  const [userId, setUserId] = useState();

  // Handle click
  const handleDelete = () => {
    if (names && names.length > 0) {
      const ids = names.map((name) => name.id); // Collect IDs
      setUserId(ids); // Set the collected IDs into state
    }
  };

  // Trigger delete API when userId changes
  useEffect(() => {
    if (userId !== undefined && userId.length > 0) {
      const userData = { id: userId };
      fetch("http://localhost:8080/delete", {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data:', data);
        })
        .catch((err) => console.error('Error:', err));
    }
  }, [userId]);

  // Determine singular/plural for the word "user"
  const plural = names.length > 1 ? "users" : "user";

  // Render
  if (ShouldDisplay > 0) {
    return (
      <motion.div className='text-lg bottom-6 flex w-full bg-gray-900 text-white rounded-3xl justify-between items-center pt-4'>
        {/* Selected Users Display */}
        <div className='flex gap-2 w-full bg-white text-gray-800 p-3 rounded-2xl mr-4'>
          <p className='break-normal font-semibold'>Selected users:</p>
          <ul className='w-full flex flex-wrap overflow-hidden gap-2'>
            {names.map((name, index) => (
              <div
                key={name.id || index} // Ensure each child has a unique key
                className='group flex flex-row gap-2 bg-zinc-300 bg-opacity-80 justify-center items-center p-2 px-4 text-gray-800 rounded-2xl'
              >
                <li>{name.name} ({name.id})</li>
              </div>
            ))}
          </ul>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className='text-base group hover:scale-105 hover:bg-opacity-90 duration-300 flex items-center gap-2 py-2 px-4 rounded-2xl h-auto w-auto bg-sky-900'
        >
          <p>Delete {plural}</p>
          <img src={Trash} alt="Trash Icon" />
        </button>
      </motion.div>
    );
  }

  return null; // Return nothing if ShouldDisplay is 0 or less
};

export default DeleteUser;
