import React from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';

export default function SkillTree({ nodes, edges, onNodeClick }) {
  const flowNodes = nodes.map(n => ({
    id: n.id.toString(),
    data: { label: n.name },
    position: { x: Math.random() * 500, y: Math.random() * 500 },
    style: {
      background: n.level === 'beginner' ? '#a8e6cf' : n.level === 'intermediate' ? '#ffd3b6' : '#ffaaa5',
      border: '2px solid #555'
    }
  }));

  const onNodeClickFlow = (event, node) => {
    const fullNode = nodes.find(n => n.id === parseInt(node.id));
    onNodeClick(fullNode);
  };

  return (
    <ReactFlow
      nodes={flowNodes}
      edges={edges}
      onNodeClick={onNodeClickFlow}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
