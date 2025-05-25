'use client';

import React, { useState, useEffect, useCallback, useId } from 'react';

interface CircuitBackgroundProps {
  nodeSelector?: string;
}

interface Path {
  id: string;
  d: string;
}

interface Packet {
  id: string;
  pathId: string;
  duration: number;
}

const CircuitBackground = ({ nodeSelector = '.circuit-node' }: CircuitBackgroundProps) => {
  const [paths, setPaths] = useState<Path[]>([]);
  const [packets, setPackets] = useState<Packet[]>([]);
  const uniqueId = useId();

  const generateCircuitPaths = useCallback(() => {
    const nodes = document.querySelectorAll(nodeSelector);
    if (nodes.length < 2) return;

    // Convert viewport coordinates to SVG space
    const viewportToSvg = (rect: DOMRect) => {
      return {
        x: rect.x + window.scrollX,
        y: rect.y + window.scrollY
      };
    };

    const newPaths: Path[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const startNode = nodes[i].getBoundingClientRect();
      const endNode = nodes[(i + 1) % nodes.length].getBoundingClientRect();

      const startPos = viewportToSvg(startNode);
      const endPos = viewportToSvg(endNode);

      const startX = startPos.x + startNode.width / 2;
      const startY = startPos.y + startNode.height / 2;
      const endX = endPos.x + endNode.width / 2;
      const endY = endPos.y + endNode.height / 2;
      
      // Calculate control points for smoother curve
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      const offsetX = (endY - startY) * 0.3; // Slightly more pronounced curve
      const offsetY = (startX - endX) * 0.3;
      
      const pathId = `p-${uniqueId}-${i}`;
      // Enhanced curved path
      const d = `M ${startX},${startY} C ${startX + offsetX},${startY + offsetY} ${endX - offsetX},${endY - offsetY} ${endX},${endY}`;
      newPaths.push({ id: pathId, d: d });
    }
    setPaths(newPaths);
  }, [nodeSelector, uniqueId]);

  useEffect(() => {
    // Delay initial generation
    const timeoutId = setTimeout(() => {
      generateCircuitPaths();
    }, 100);
    
    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        generateCircuitPaths();
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [generateCircuitPaths]);

  useEffect(() => {
    if (paths.length === 0) return;

    const packetInterval = setInterval(() => {
      const path = paths[Math.floor(Math.random() * paths.length)];
      const duration = Math.random() * 2 + 4; // 4-6 seconds
      const packetId = `pkt-${uniqueId}-${Date.now()}-${Math.random()}`;
      
      const newPacket = { id: packetId, pathId: path.id, duration };
      setPackets(prev => [...prev, newPacket]);

      setTimeout(() => {
        setPackets(prev => prev.filter(p => p.id !== packetId));
      }, duration * 1000);

    }, 2000); // Longer interval between packets

    return () => clearInterval(packetInterval);
  }, [paths, uniqueId]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none circuit-background opacity-60">
      <svg className="w-full h-full">
        <defs>
          {paths.map(path => (
            <path key={path.id} id={path.id} d={path.d} />
          ))}
        </defs>

        {paths.map(path => (
          <use 
            key={path.id} 
            href={`#${path.id}`} 
            className="stroke-cyan-500/5" 
            strokeWidth="1" 
          />
        ))}

        {packets.map(packet => (
          <circle 
            key={packet.id} 
            r="4" 
            className="fill-cyan-300/60 drop-shadow-[0_0_8px_#00e5ff]"
          >
            <animateMotion 
              dur={`${packet.duration}s`} 
              begin="0s" 
              fill="freeze" 
              rotate="auto"
              keyPoints="0;0.3;0.7;1"
              keyTimes="0;0.3;0.7;1"
              calcMode="spline"
              keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
            >
              <mpath href={`#${packet.pathId}`} />
            </animateMotion>
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default CircuitBackground;
