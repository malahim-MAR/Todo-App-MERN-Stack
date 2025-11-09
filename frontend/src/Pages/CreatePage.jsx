import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!title.trim() || !content.trim()) {
      alert('Please fill in all fields.');
      setLoading(false);
      return;
    }
    try {
      await axios.post('http://localhost:5001/api/notes', { title, content });
      toast.success('Note Created Successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error Creating Note, Try Again Later!');
      console.error('Error creating note:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-2">
            <ArrowLeft size={18} />
            <Link to="/" className="link link-hover text-sm">
              Back to Home
            </Link>
          </div>

          <h2 className="card-title mb-4">Create New Note</h2>

          <form onSubmit={handleSubmit} className="form-control gap-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter title"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                placeholder="Enter your note here..."
                className="textarea textarea-bordered w-full h-32"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
            >
              {loading ? 'Creating...' : 'Create New Note'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreatePage;
