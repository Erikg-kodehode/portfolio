'use client';

import { 
  memo, 
  useEffect, 
  useState, 
  useRef, 
  useCallback,
  useMemo
} from 'react';

interface CircuitBoardProps {
  language: string;
}

interface SparkParticleProps {
  startNode: number;
  endNode: number;
  delay: number;
  size?: number;
  intensity?: number;
}

interface DataPacketProps {
  path: 'horizontal' | 'vertical';
  position: number;
  delay: number;
}

const CIRCUIT_NODES = [
  { index: 0, top: '15%', left: '10%', angle: '45deg' },
  { index: 1, top: '35%', left: '85%', angle: '225deg' },
  { index: 2, top: '65%', left: '25%', angle: '135deg' },
  { index: 3, top: '85%', left: '70%', angle: '315deg' },
  { index: 4, top: '25%', left: '45%', angle: '90deg' },
  { index: 5, top: '75%', left: '55%', angle: '270deg' },
  { index: 6, top: '50%', left: '15%', angle: '180deg' },
  { index: 7, top: '50%', left: '85%', angle: '0deg' }
];

function DataPacket({ path, position, delay }: DataPacketProps) {
  const style = {
    '--animation-duration': '1.6s', // Faster animation for more fluid movement
    '--flow-distance': path === 'horizontal' ? '200vw' : '200vh',
    '--flow-x': path === 'horizontal' ? 'var(--flow-distance)' : '0',
    '--flow-y': path === 'vertical' ? 'var(--flow-distance)' : '0',
    '--delay': `${delay}ms`,
    [path === 'horizontal' ? 'top' : 'left']: `${position}%`,
    [path === 'horizontal' ? 'left' : 'top']: '-4px',
  } as React.CSSProperties;

  return <div className="data-packet" style={style} />;
}

function SparkParticle({ startNode, endNode, delay, size = 1, intensity = 1 }: SparkParticleProps) {
  const start = CIRCUIT_NODES[startNode];
  const end = CIRCUIT_NODES[endNode];

  // Calculate the midpoint for the quadratic bezier curve
  const startX = parseFloat(start.left);
  const startY = parseFloat(start.top);
  const endX = parseFloat(end.left);
  const endY = parseFloat(end.top);
  
  // Create a curved path by offsetting the control point
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const angle = Math.atan2(endY - startY, endX - startX);
  const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  
  // Offset the control point perpendicular to the path
  const offset = distance * 0.2; // 20% of the path length
  const controlX = midX + Math.cos(angle + Math.PI/2) * offset;
  const controlY = midY + Math.sin(angle + Math.PI/2) * offset;

  const style = {
    '--start-x': start.left,
    '--start-y': start.top,
    '--end-x': end.left,
    '--end-y': end.top,
    '--control-x': `${controlX}%`,
    '--control-y': `${controlY}%`,
    '--spark-scale': size.toString(),
    '--intensity': intensity.toString(),
    '--path-length': `${distance}%`,
    '--delay': `${delay}ms`,
  } as React.CSSProperties;

  return (
    <div 
      className="spark-particle" 
      style={style}
      onAnimationEnd={(e) => {
        e.currentTarget.remove();
      }}
    />
  );
}

function CircuitBoard({ language }: CircuitBoardProps) {
  // Track current language for cleanup on changes
  const currentLanguageRef = useRef(language);
  
  // Generate data packets for highways
  const dataPackets = useMemo(() => {
    const packets = [];
    // Horizontal packets (align with data highways at 38-62px)
    for (let i = 0; i < 14; i++) { // More packets for denser traffic
      packets.push({
        id: `h-${i}`,
        path: 'horizontal' as const,
        position: 44 + (i * 1), // Better spread across highways (38-62px)
        delay: i * 125 // Faster timing for smoother flow
      });
    }
    // Vertical packets
    for (let i = 0; i < 14; i++) {
      packets.push({
        id: `v-${i}`,
        path: 'vertical' as const,
        position: 44 + (i * 1), // Match horizontal distribution
        delay: (i * 125) + 62.5 // Offset by half interval for smoother overall flow
      });
    }
    return packets;
  }, []);
  const [sparks, setSparks] = useState<Array<{
    id: number;
    startNode: number;
    endNode: number;
    delay: number;
    size: number;
    intensity: number;
  }>>([]);
  const sparkIdRef = useRef(0);
  const isRunningRef = useRef(true);

const generateSpark = useCallback(() => {
    if (!isRunningRef.current) return;

    const startNodeIndex = Math.floor(Math.random() * CIRCUIT_NODES.length);
    let endNodeIndex;
    do {
      endNodeIndex = Math.floor(Math.random() * CIRCUIT_NODES.length);
    } while (endNodeIndex === startNodeIndex);

    const delay = Math.random() * 200; // Reduced for more frequent sparks
    const size = 0.8 + Math.random() * 0.6; // Random size between 0.8 and 1.4
    const intensity = 0.8 + Math.random() * 0.4; // Random intensity between 0.8 and 1.2

    setSparks(current => [
      ...current,
      {
        id: sparkIdRef.current++,
        startNode: startNodeIndex,
        endNode: endNodeIndex,
        delay,
        size,
        intensity
      }
    ]);
  }, []);

  // Handle language changes
  useEffect(() => {
    if (currentLanguageRef.current !== language) {
      // Clear existing sparks on language change
      setSparks([]);
      currentLanguageRef.current = language;
    }
  }, [language]);

  useEffect(() => {
    let mounted = true;
    
    // Generate sparks with performance optimization
    const generateSparkWithCheck = () => {
      if (mounted && isRunningRef.current) {
        generateSpark();
      }
    };

    // Generate sparks more frequently with dynamic timing
    const intervalId = setInterval(generateSparkWithCheck, 800);
    
    // Create more frequent bursts with varied intensity
    const burstId = setInterval(() => {
      if (!mounted || !isRunningRef.current) return;
      
      if (Math.random() > 0.5) { // 50% chance of burst
        const burstCount = Math.floor(Math.random() * 3) + 1; // 1-3 sparks per burst
        for (let i = 0; i < burstCount; i++) {
          setTimeout(generateSparkWithCheck, i * 100); // Faster staggering
        }
      }
    }, 600);
    
    // Optimize cleanup to prevent too many concurrent animations
    const cleanupId = setInterval(() => {
      if (mounted) {
        setSparks(current => current.slice(-12)); // Keep more concurrent sparks for better effect
      }
    }, 4000);

    return () => {
      mounted = false;
      isRunningRef.current = false;
      clearInterval(intervalId);
      clearInterval(burstId);
      clearInterval(cleanupId);
      // Clear sparks on unmount
      setSparks([]);
    };
  }, [generateSpark]);

  return (
    <div className="circuit-board-bg">
      {/* Logic gate shapes layer */}
      <div className="gate-layer">
        {/* AND/OR/NOT Gate shapes are rendered via CSS ::before and ::after */}
      </div>
      
      {/* Data flow pulse effect layer */}
      <div className="pulse-layer z-[2]">
        {/* Data flow animations and circuit patterns are rendered via CSS */}
      </div>

      {/* Data packets layer */}
      <div className="data-packets-layer">
        {dataPackets.map(packet => (
          <DataPacket
            key={packet.id}
            path={packet.path}
            position={packet.position}
            delay={packet.delay}
          />
        ))}
      </div>

      {/* Circuit nodes with connecting lines */}
      {/* Circuit nodes */}
      {CIRCUIT_NODES.map((node) => (
        <div
          key={node.index}
          className="circuit-node"
          style={{ 
            top: node.top, 
            left: node.left, 
            '--angle': node.angle 
          } as React.CSSProperties}
        />
      ))}

      {/* Spark particles container */}
      <div className="spark-container">
        {sparks.map(spark => (
          <SparkParticle
            key={spark.id}
            startNode={spark.startNode}
            endNode={spark.endNode}
            delay={spark.delay}
            size={spark.size}
            intensity={spark.intensity}
          />
        ))}
      </div>
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(CircuitBoard);

