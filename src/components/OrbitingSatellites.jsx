import React from 'react';

const OrbitingSatellites = () => {
  return (
    <div className="orbit-container">
      <img
        alt="Satellite"
        className="satellite satellite-1"
        src="https://static.vecteezy.com/system/resources/previews/033/529/060/non_2x/starlink-satellite-ai-generative-free-png.png"
        style={{ animation: 'spin-slow 60s linear infinite' }}
      />
      <img
        alt="Satellite"
        className="satellite satellite-2"
        src="https://static.vecteezy.com/system/resources/previews/040/335/018/large_2x/ai-generated-satellite-isolated-on-transparent-background-free-png.png"
        style={{ animation: 'spin-slow 60s linear infinite' }}
      />
    </div>
  );
};

export default OrbitingSatellites;