// Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import task1 from '../images/task1.png';
import task2 from '../images/task2.png';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <div className="bg-white min-h-screen flex flex-row items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Problems</h1>
        </div>

        {/* Task Buttons */}
        <div className="bg-white rounded-2xl shadow-2xl p-10 space-y-8">
          {/* Task 1 */}
          <a
            href="/task1"
            onClick={(e) => handleButtonClick(e, '/task1')}
            className="flex items-center justify-between border-2 border-dashed border-gray-400 p-4 text-black px-8 py-6 rounded-2xl transition-all duration-300 relative overflow-hidden hover:scale-105"
          >
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <img src={task1} alt="Task 1" className="w-14 h-14 object-contain" />
              </div>
              <div>
                <h2 className="font-semibold text-2xl">Task 1</h2>
                <p className="text-base opacity-90">Event push (Websockets) for data retrieval (REST API)</p>
              </div>
            </div>
            <span className="arrow-icon text-2xl transition-transform duration-300">
              <i className="fas fa-chevron-right"></i>
            </span>
          </a>

          {/* Task 2 */}
          <a
            href="/task2"
            onClick={(e) => handleButtonClick(e, '/task2')}
            className="flex items-center justify-between border-2 border-dashed border-gray-400 p-4 text-black px-8 py-6 rounded-2xl transition-all duration-300 relative overflow-hidden hover:scale-105"
          >
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <img src={task2} alt="Task 2" className="w-14 h-14 object-contain" />
              </div>
              <div>
                <h2 className="font-semibold text-2xl">Task 2</h2>
                <p className="text-base opacity-90">Simple prototype to link two Graphics’ based object in ReactJ</p>
              </div>
            </div>
            <span className="arrow-icon text-2xl transition-transform duration-300">
              <i className="fas fa-chevron-right"></i>
            </span>
          </a>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
};

export default Dashboard;
