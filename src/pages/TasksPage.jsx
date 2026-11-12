import React, { useState, useEffect } from 'react';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/tasks', {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch('http://127.0.0.1:8000/api/tasks', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title }),
      });

      if (res.ok) {
        setTitle('');
        fetchTasks();
      }
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) fetchTasks();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks & Operations</h1>
          <p className="text-slate-400 text-sm">Powered by React & Laravel API</p>
        </div>
        <span className="bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/30 font-mono">
          {tasks.length} Total Items
        </span>
      </div>

      {/* Form Input */}
      <form onSubmit={handleAddTask} className="flex gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-md">
        <input
          type="text"
          placeholder="Enter item title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-colors cursor-pointer"
        >
          + Add Task
        </button>
      </form>

      {/* Search Input Bar */}
      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 shadow-md">
        <input
          type="text"
          placeholder="🔍 Search tasks by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Task List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
        {loading ? (
          <p className="p-6 text-center text-slate-500 text-sm">Loading data from backend...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="p-6 text-center text-slate-500 text-sm">
            {searchQuery ? `No tasks found matching "${searchQuery}"` : 'No tasks found. Add one above!'}
          </p>
        ) : (
          <ul className="divide-y divide-slate-800">
            {filteredTasks.map((task) => (
              <li key={task.id} className="p-4 flex justify-between items-center hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleStatus(task)}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors cursor-pointer ${
                      task.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                    }`}
                  >
                    {task.status === 'completed' ? '✓ Completed' : '○ Pending'}
                  </button>
                  <div>
                    <h3 className={`font-medium text-sm ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">ID: #{task.id}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-400 hover:text-red-300 text-xs font-medium px-3 py-1 bg-red-500/10 hover:bg-red-500/20 rounded border border-red-500/20 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}