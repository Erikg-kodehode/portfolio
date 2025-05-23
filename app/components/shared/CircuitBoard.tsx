'use client';

import { memo } from 'react';

function CircuitBoard() {
  return (
    <div className="circuit-board-bg fixed inset-0 -z-10">
      {/* Logic gate shapes layer */}
      <div>
        {/* AND/OR/NOT Gate shapes are rendered via CSS ::before and ::after */}
      </div>
      
      {/* Data flow pulse effect layer */}
      <div>
        {/* Data flow animations and circuit patterns are rendered via CSS */}
      </div>

      {/* Circuit nodes with connecting lines */}
      <div className="circuit-node" style={{ top: '15%', left: '10%', '--angle': '45deg' } as React.CSSProperties} />
      <div className="circuit-node" style={{ top: '35%', left: '85%', '--angle': '225deg' } as React.CSSProperties} />
      <div className="circuit-node" style={{ top: '65%', left: '25%', '--angle': '135deg' } as React.CSSProperties} />
      <div className="circuit-node" style={{ top: '85%', left: '70%', '--angle': '315deg' } as React.CSSProperties} />
      <div className="circuit-node" style={{ top: '25%', left: '45%', '--angle': '90deg' } as React.CSSProperties} />
      <div className="circuit-node" style={{ top: '75%', left: '55%', '--angle': '270deg' } as React.CSSProperties} />
      <div className="circuit-node" style={{ top: '50%', left: '15%', '--angle': '180deg' } as React.CSSProperties} />
      <div className="circuit-node" style={{ top: '50%', left: '85%', '--angle': '0deg' } as React.CSSProperties} />
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(CircuitBoard);

