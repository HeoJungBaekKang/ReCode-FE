import React from 'react';

const LayoutGrid = ({ children }) => (
  <div className="flex flex-col min-h-screen overflow-x-hidden">
    <main className="flex-grow">{children}</main>
  </div>
);

export default LayoutGrid;
