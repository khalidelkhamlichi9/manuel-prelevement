import React from 'react';

const Footer = () => {
    return (
        <div className='flex justify-center mt-5 text-sm text-gray-500 dark:text-gray-400'>
            <p>&copy; {new Date().getFullYear()} Manuel de prélèvement - CBW</p>
        </div>
    );
};

export default Footer;
