import { useEffect, useState } from 'react';
import SkillTree from './SkillTree';
import axios from 'axios';
import LessonModal from './LessonModal';

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [age, setAge] = useState('');
  const [userId] = useState('user-' + Date.now()); // demo

  const loadData = async () => {
    const [n, e] = await Promise.all([
      axios.get('/api/nodes'),
      axios.get('/api/edges')
    ]);
    setNodes(n.data);
    setEdges(e.data.map(ed => ({
      id: `${ed.from_id}-${ed.to_id}`,
      source: ed.from_id.toString(),
      target: ed.to_id.toString(),
      type: 'smoothstep'
    })));
  };

  useEffect(() => { loadData(); }, []);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setModalOpen(true);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem', background: '#222', color: 'white' }}>
        <h1>Skill Tree of All Human Learning</h1>
        <input
          type="number"
          placeholder="Age (for kids)"
          value={age}
          onChange={e => setAge(e.target.value)}
          style={{ width: 80 }}
        />
      </header>
      <SkillTree
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick}
      />
      {modalOpen && (
        <LessonModal
          node={selectedNode}
          age={age}
          userId={userId}
          onClose={() => setModalOpen(false)}
          onMastered={() => {
            axios.post('/api/progress', { user_id: userId, node_id: selectedNode.id });
            loadData();
          }}
        />
      )}
    </div>
  );
}

export default App;
