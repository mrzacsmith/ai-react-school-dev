import React from 'react';

const JuneCalendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInJune = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">June Calendar</h2>
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-semibold">
            {day}
          </div>
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`empty-${i}`} className="text-gray-300">
            {/* Empty cells for the first two days of the week */}
          </div>
        ))}
        {daysInJune.map((date) => (
          <div key={date} className="p-2 border rounded">
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JuneCalendar;