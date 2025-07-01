import { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-amber-800 text-white px-6 py-3 rounded-md shadow-lg animate-fadeInOut z-50">
      <p>{message}</p>
    </div>
  );
};

export default Notification;