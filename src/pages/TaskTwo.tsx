// App.jsx
import React, { useState, useRef, useEffect } from 'react';

const LinkedGraphics = () => {
  const containerRef = useRef(null);
  const [rectPos, setRectPos] = useState({ x: 100, y: 100 });
  const [circlePos, setCirclePos] = useState({ x: 300, y: 200 });
  const [circleSize, setCircleSize] = useState(100);
  const [activeElement, setActiveElement] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return;

    const normalizedX = rectPos.x / containerSize.width;
    const normalizedY = rectPos.y / containerSize.height;

    const centerX = 0.5;
    const centerY = 0.5;
    const distanceX = Math.abs(normalizedX - centerX);
    const distanceY = Math.abs(normalizedY - centerY);

    const combinedDistance = (distanceX + distanceY) / 2;
    const newSize = 50 + (combinedDistance * 300);

    setCircleSize(Math.min(Math.max(newSize, 50), 200));
  }, [rectPos, containerSize]);

  const handleMouseDown = (e, element) => {
    setActiveElement(element);
    const rect = e.currentTarget.getBoundingClientRect();

    if (element === 'rectangle') {
      setDragOffset({
        x: e.clientX - rectPos.x,
        y: e.clientY - rectPos.y,
      });
    } else if (element === 'circle') {
      setDragOffset({
        x: e.clientX - circlePos.x,
        y: e.clientY - circlePos.y,
      });
    }

    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    if (!activeElement) return;

    if (activeElement === 'rectangle') {
      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      newX = Math.max(0, Math.min(newX, containerSize.width - 100));
      newY = Math.max(0, Math.min(newY, containerSize.height - 60));

      setRectPos({ x: newX, y: newY });
    } else if (activeElement === 'circle') {
      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      newX = Math.max(0, Math.min(newX, containerSize.width - circleSize));
      newY = Math.max(0, Math.min(newY, containerSize.height - circleSize));

      setCirclePos({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setActiveElement(null);
  };

  useEffect(() => {
    if (activeElement) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [activeElement, dragOffset]);

  return (
    <div ref={containerRef} className="relative w-full h-[500px] border-2 border-dashed border-gray-300 mt-4 bg-white rounded-lg shadow-lg">
      {/* Rectangle */}
      <div
        className={`draggable bg-blue-500 rounded-md shadow-lg flex items-center justify-center text-white font-bold absolute ${
          activeElement === 'rectangle' ? 'shadow-outline' : ''
        }`}
        style={{
          width: '100px',
          height: '60px',
          left: `${rectPos.x}px`,
          top: `${rectPos.y}px`,
          transform: activeElement === 'rectangle' ? 'scale(1.05)' : 'scale(1)',
          zIndex: 10,
          cursor: 'move',
          userSelect: 'none',
        }}
        onMouseDown={(e) => handleMouseDown(e, 'rectangle')}
      >
        Rectangle
      </div>

      {/* Circle */}
      <div
        className={`draggable bg-pink-500 rounded-full opacity-80 shadow-lg absolute ${
          activeElement === 'circle' ? 'shadow-outline' : ''
        }`}
        style={{
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          left: `${circlePos.x}px`,
          top: `${circlePos.y}px`,
          transform: activeElement === 'circle' ? 'scale(1.05)' : 'scale(1)',
          zIndex: 10,
          cursor: 'move',
          userSelect: 'none',
        }}
        onMouseDown={(e) => handleMouseDown(e, 'circle')}
      />

      {/* Position Info */}
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow text-sm">
        Rectangle: ({Math.round(rectPos.x)}, {Math.round(rectPos.y)})<br />
        Circle: ({Math.round(circlePos.x)}, {Math.round(circlePos.y)})<br />
        Circle size: {Math.round(circleSize)}px
      </div>
    </div>
  );
};

const TaskTwo = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Independent Linked Graphics</h1>
      <p className="text-center mb-4 text-gray-600">
        Drag either the rectangle or circle independently. The circle's size changes based on the rectangle's position.
      </p>

      <LinkedGraphics />
    </div>
  );
};

export default TaskTwo;
