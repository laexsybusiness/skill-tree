import { useState } from 'react';
import axios from 'axios';

export default function LessonModal({ node, age, userId, onClose, onMastered }) {
  const [lesson, setLesson] = useState('');
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await axios.post('/api/lesson', {
      node_id: node.id,
      user_id: userId,
      age: age ? parseInt(age) : null
    });
    if (res.data.blocked) {
      setBlocked(true);
      setLesson(res.data.message);
    } else {
      setLesson(res.data.lesson);
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 10, maxWidth: 600 }}>
        <h2>{node.name}</h2>
        <p><strong>Domain:</strong> {node.domain} | <strong>Level:</strong> {node.level}</p>

        {blocked ? (
          <p style={{ color: 'red' }}>{lesson}</p>
        ) : lesson ? (
          <div dangerouslySetInnerHTML={{ __html: lesson.replace(/\n/g, '<br>') }} />
        ) : (
          <button onClick={generate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Lesson'}
          </button>
        )}

        {lesson && !blocked && (
          <button onClick={onMastered} style={{ marginTop: 10, background: '#4CAF50', color: 'white' }}>
            Mark as Mastered
          </button>
        )}

        <button onClick={onClose} style={{ float: 'right' }}>Close</button>
      </div>
    </div>
  );
}
