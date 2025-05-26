'use client';

import React, { useState, useEffect, useCallback, useId } from 'react';
import type { FC } from 'react';

interface NetworkDevice {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'pc' | 'phone' | 'server' | 'globe';
}

// SVG paths for different device types
const devicePaths = {
  pc: `
    M 3 5 H 47 V 35 H 3 V 5
    M 6 8 H 44 V 32 H 6 V 8
    M 25 35 V 45
    M 15 45 H 35 V 47 H 15 V 45
    M 10 12 H 40 M 10 17 H 40 M 10 22 H 40 M 10 27 H 40
  `,
  
  phone: `
    M 15 2 H 35 Q 45 2 45 12 
    V 42 Q 45 52 35 52 
    H 15 Q 5 52 5 42 
    V 12 Q 5 2 15 2
    M 10 8 H 40 V 44 H 10 V 8
    M 22 4 H 28
    M 21 46 H 29
    M 24 46 A 2 2 0 0 0 26 46
    M 12 12 H 38 M 12 18 H 38 M 12 24 H 38 M 12 30 H 38 M 12 36 H 38
  `,
  
  server: `
    M 5 5 H 45 V 15 H 5 V 5
    M 5 25 H 45 V 35 H 5 V 25
    M 5 45 H 45 V 55 H 5 V 45
    M 40 8 A 2 2 0 0 0 42 8
    M 40 28 A 2 2 0 0 0 42 28
    M 40 48 A 2 2 0 0 0 42 48
    M 8 8 H 35 M 8 28 H 35 M 8 48 H 35
    M 8 11 H 25 M 8 31 H 25 M 8 51 H 25
    M 15 8 H 18 M 15 28 H 18 M 15 48 H 18
    M 30 8 H 33 M 30 28 H 33 M 30 48 H 33
  `,
  
  globe: `
    M 5 25 A 20 20 0 0 1 45 25 A 20 20 0 0 1 5 25
    M 5 25 H 45
    M 25 5 V 45
    M 8 15 Q 25 10 42 15
    M 8 35 Q 25 40 42 35
    M 15 8 Q 20 25 15 42
    M 35 8 Q 30 25 35 42
    M 12 20 Q 25 18 38 20
    M 12 30 Q 25 32 38 30
  ` // Added more curve lines for better globe effect
};

interface Connection {
  id: string;
  from: NetworkDevice;
  to: NetworkDevice;
  path: string;
}

interface FlowParticle {
  id: string;
  connection: Connection;
  progress: number;
  reverse: boolean;
  size: number;
}

// Layout constants
const CARD_MIN_SIZE = 60;
const CARD_MAX_SIZE = 100;
const NUM_CARDS = 20;
const MIN_DISTANCE = 160;
const CURVE_INTENSITY = 0.15;
const MIN_CONNECTIONS = 2;
const MAX_CONNECTIONS = 3;

// Animation constants
const PARTICLE_SIZE = 2.0;
const ANIMATION_SPEED = 0.0025;
const NUM_PARTICLES = 2;
const PARTICLE_SPACING = 0.15;
const PATH_OFFSET = 0.08;
const ACTIVE_PATHS = 12;
const GRID_DIVISIONS = 8;
const EDGE_PADDING = 0.12;

const generateCards = (width: number, height: number): NetworkDevice[] => {
  const cards: NetworkDevice[] = [];
  const effectiveWidth = width * (1 - 2 * EDGE_PADDING);
  const effectiveHeight = height * (1 - 2 * EDGE_PADDING);
  const cellWidth = effectiveWidth / GRID_DIVISIONS;
  const cellHeight = effectiveHeight / GRID_DIVISIONS;
  const cardsPerCell = Math.ceil(NUM_CARDS / (GRID_DIVISIONS * GRID_DIVISIONS));
  let attempts = 0;
  const maxAttempts = 200;

  // Ensure we place devices in lower half with better distribution
  const bottomDevices = Math.floor(NUM_CARDS * 0.7); // Increased from 0.65
  let bottomDeviceCount = 0;

  // Track grid cell occupancy
  const cellOccupancy = Array(GRID_DIVISIONS).fill(0).map(() => Array(GRID_DIVISIONS).fill(0));

  // Try to place cards evenly across the viewport grid
  for (let i = 0; i < GRID_DIVISIONS; i++) {
    for (let j = 0; j < GRID_DIVISIONS; j++) {
      for (let k = 0; k < cardsPerCell; k++) {
        if (cards.length >= NUM_CARDS) break;
        
        let attempts = 0;
        while (attempts < maxAttempts) {
          const deviceTypes: ('pc' | 'phone' | 'server' | 'globe')[] = ['pc', 'phone', 'server', 'globe'];
          const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
          
          // Calculate position
          // Add padding to prevent edge clumping
          // Divide width into columns for better horizontal distribution
          const numColumns = Math.max(4, Math.floor(width / 300)); // At least 4 columns, more on wider screens
          const columnWidth = width / numColumns;
          const column = bottomDeviceCount % numColumns;
          
          // Ensure devices spread across full width
          let x = (column * columnWidth) + (Math.random() * (columnWidth - CARD_MAX_SIZE));
          let y = height * EDGE_PADDING + (j * cellHeight) + Math.random() * (cellHeight - CARD_MAX_SIZE);
          
          // Add slight horizontal offset for variety
          x += Math.random() * 40 - 20; // ±20px random offset
          
          // Distribute bottom devices more evenly
          if (bottomDeviceCount < bottomDevices) {
            const fullHeight = Math.max(
              document.documentElement.scrollHeight,
              document.documentElement.offsetHeight,
              document.documentElement.clientHeight
            );
            
            const zoneHeight = fullHeight / 8;
            const zone = Math.floor(bottomDeviceCount % 8);

            switch(zone) {
              case 7:
                y = fullHeight - (CARD_MAX_SIZE * 1.1) - (Math.random() * zoneHeight * 0.2);
                break;
              case 6:
                y = fullHeight - (CARD_MAX_SIZE * 2.2) - (Math.random() * zoneHeight * 0.3);
                break;
              case 5:
                y = fullHeight * 0.8 + (Math.random() * zoneHeight * 0.7);
                break;
              case 4:
                y = fullHeight * 0.65 + (Math.random() * zoneHeight * 0.8);
                break;
              case 3:
                y = fullHeight * 0.5 + (Math.random() * zoneHeight);
                break;
              case 2:
                y = fullHeight * 0.35 + (Math.random() * zoneHeight);
                break;
              default:
                y = (zone * zoneHeight) + (Math.random() * (zoneHeight - CARD_MAX_SIZE));
            }
            bottomDeviceCount++;
          }

          // Limit devices per cell for better distribution
          if (cellOccupancy[i][j] >= 2) { // Reduced from cardsPerCell + 1
            attempts++;
            continue;
          }
          
          const card: NetworkDevice = {
            id: `device-${cards.length}`,
            x,
            y,
            width: CARD_MAX_SIZE,
            height: CARD_MAX_SIZE,
            type: deviceType
          };

          // Check if the new card is far enough from existing cards
          const isFarEnough = cards.every(existing => {
            const dx = existing.x - card.x;
            const dy = existing.y - card.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Add diagonal check for better spacing
            const minDiagonalDistance = Math.sqrt(MIN_DISTANCE * MIN_DISTANCE * 2);
            const isDiagonallyFar = Math.abs(dx) > MIN_DISTANCE * 0.7 && 
                                   Math.abs(dy) > MIN_DISTANCE * 0.7;
            
            return distance > MIN_DISTANCE || isDiagonallyFar;
          });

          if (isFarEnough) {
            cards.push(card);
            cellOccupancy[i][j]++;
            if (y > height * 0.5) {
              bottomDeviceCount++;
            }
            break;
          }
          attempts++;
        }
      }
    }
  }
  
  return cards;
};

const generateConnections = (cards: NetworkDevice[]): Connection[] => {
  const connections: Connection[] = [];
  const maxConnections = Math.min(cards.length - 1, MAX_CONNECTIONS);
  
  cards.forEach((card, i) => {
    // Connect to nearest cards within limits
    const numConnections = Math.max(
      MIN_CONNECTIONS,
      Math.floor(Math.random() * (maxConnections - MIN_CONNECTIONS + 1)) + MIN_CONNECTIONS
    );
    const otherCards = cards.slice(i + 1);
    
    // Sort other cards by distance
    const sortedCards = otherCards.sort((a, b) => {
      const distA = Math.sqrt(Math.pow(a.x - card.x, 2) + Math.pow(a.y - card.y, 2));
      const distB = Math.sqrt(Math.pow(b.x - card.x, 2) + Math.pow(b.y - card.y, 2));
      return distA - distB;
    });

    // Connect to nearest cards
    sortedCards.slice(0, numConnections).forEach(target => {
      const startX = card.x + card.width / 2;
      const startY = card.y + card.height / 2;
      const endX = target.x + target.width / 2;
      const endY = target.y + target.height / 2;

      // Create smoother curved path with multiple control points
      const dx = endX - startX;
      const dy = endY - startY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate control points for smoother curve
      const cp1x = startX + dx * 0.25 - dy * CURVE_INTENSITY;
      const cp1y = startY + dy * 0.25 + dx * CURVE_INTENSITY;
      const cp2x = startX + dx * 0.75 + dy * CURVE_INTENSITY;
      const cp2y = startY + dy * 0.75 - dx * CURVE_INTENSITY;

      connections.push({
        id: `connection-${card.id}-${target.id}`,
        from: card,
        to: target,
        path: `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`
      });
    });
  });

  return connections;
};

interface CircuitBackgroundProps {
  className?: string;
}

const CircuitBackground: FC<CircuitBackgroundProps> = ({ className = '' }) => {
  const [cards, setCards] = useState<NetworkDevice[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [particles, setParticles] = useState<FlowParticle[]>([]);
  const uniqueId = useId();

  const generateNetwork = useCallback(() => {
    const width = window.innerWidth;
    // Use document height instead of viewport height
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
    
    const newCards = generateCards(width, height);
    const newConnections = generateConnections(newCards);

    setCards(newCards);
    setConnections(newConnections);
  }, []);

  useEffect(() => {
    let lastHeight = document.documentElement.scrollHeight;
    
    const handleScroll = () => {
      const currentHeight = document.documentElement.scrollHeight;
      if (Math.abs(currentHeight - lastHeight) > 100) {
        // Only regenerate if height changed significantly
        lastHeight = currentHeight;
        generateNetwork();
      }
    };

    generateNetwork();
    window.addEventListener('resize', generateNetwork);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', generateNetwork);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [generateNetwork]);

  useEffect(() => {
    if (connections.length === 0) return;

    let animationFrameId: number;
    let activePaths = new Array(ACTIVE_PATHS).fill(0).map((_, i) => ({
      index: Math.floor(Math.random() * connections.length),
      prevProgress: 0
    }));

    const animate = (timestamp: number) => {
      const newParticles: FlowParticle[] = [];
      
      // Update multiple active paths
      activePaths.forEach((path, pathIndex) => {
        const baseProgress = (timestamp * ANIMATION_SPEED + (pathIndex * 0.3)) % 1;
        
        // When particles complete their path, move to a new random connection
        if (baseProgress < path.prevProgress) {
          path.index = Math.floor(Math.random() * connections.length);
        }
        path.prevProgress = baseProgress;

        const connection = connections[path.index];
        
        // Create multiple particles per path
        for (let i = 0; i < NUM_PARTICLES; i++) {
          const particleProgress = (baseProgress + (i * PATH_OFFSET)) % 1;
          newParticles.push({
            id: `particle-${uniqueId}-${path.index}-${pathIndex}-${i}`,
            connection,
            progress: particleProgress,
            reverse: false,
            size: PARTICLE_SIZE * (1 - (i * 0.1)) // Slightly decrease size for trailing particles
          });
        }
      });

      setParticles(newParticles);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      setParticles([]);
    };
  }, [connections, uniqueId]);

  return (
    <div 
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ 
        minHeight: '100vh',
        height: '100%'
      }}
    >
      <div className="absolute inset-0 bg-gray-900/10" />
      <svg 
        className="w-full" 
        style={{ 
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          minHeight: Math.max(
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight,
            document.documentElement.clientHeight
          )
        }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.0" />
            <feComposite in="SourceGraphic" operator="over" />
            <feColorMatrix type="matrix" 
              values="0 0 0 0 0.1
                      0 0 0 0 0.85
                      0 0 0 0 0.45
                      0 0 0 0.7 0"
            />
          </filter>
          <filter id="card-glow">
            <feGaussianBlur stdDeviation="2.2" />
            <feComposite in="SourceGraphic" operator="over" />
            <feColorMatrix type="matrix" 
              values="0 0 0 0 0.5
                      0 0 0 0 0.5
                      0 0 0 0 0.5
                      0 0 0 0.25 0"
            />
          </filter>
          <filter id="particle-glow">
            <feGaussianBlur stdDeviation="2.2" result="mainBlur" />
            <feColorMatrix in="mainBlur" type="matrix" 
              values="0 0 0 0 0.1
                      0 0 0 0 0.98
                      0 0 0 0 0.58
                      0 0 0 1 0"
              result="coloredBlur"
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {connections.map(conn => (
            <path key={conn.id} id={conn.id} d={conn.path} />
          ))}
        </defs>

        {/* Circuit cards */}
        {cards.map(card => (
          <g key={card.id}>
            <g transform={`translate(${card.x}, ${card.y}) scale(${card.width/40})`}>
              <path
                d={devicePaths[card.type]}
                className="fill-none stroke-emerald-600/100 dark:stroke-emerald-500/100"
                strokeWidth="5.5"
                filter="url(#card-glow)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        ))}

        {/* Connection paths with pulse effect */}
        {connections.map(conn => (
          <path
            key={conn.id}
            d={conn.path}
            className="stroke-emerald-600/40 dark:stroke-emerald-500/40"
            strokeWidth="2.0"
            fill="none"
            filter="url(#glow)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Flow particles */}
        {particles.map(particle => {
          const pathElement = document.getElementById(particle.connection.id);
          if (!pathElement || !(pathElement instanceof SVGPathElement)) return null;
          
          try {
            // Now TypeScript knows this is an SVGPathElement
            const pathLength = pathElement.getTotalLength();
            const point = pathElement.getPointAtLength(
              particle.progress * pathLength
            );
            
            return (
              <circle 
                key={particle.id}
                cx={point.x}
                cy={point.y}
                r={particle.size}
                className="fill-emerald-600/85 dark:fill-emerald-500/75"
                filter="url(#particle-glow)"
              />
            );
          } catch (error) {
            return null; // Safely handle any path calculation errors
          }
        })}
      </svg>
    </div>
  );
};
export { CircuitBackground };
export default CircuitBackground;
