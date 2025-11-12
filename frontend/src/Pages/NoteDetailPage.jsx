import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const NoteDetailPage = () => {
  const { id } = useParams();
  const [noteDetail, setNoteDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newSaveTitle, setNewSaveTitle] = useState("");
  const [newSaveContent, setNewSaveContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
        setNoteDetail(res.data);
        setNewSaveTitle(res.data.title || "");
        setNewSaveContent(res.data.content || "");
      } catch (error) {
        console.log("error fetching Note", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) return <p className="text-forest-800">Loading...</p>;
  if (!noteDetail) return <p className="text-red-600">Note not found.</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-forest-100 rounded-lg shadow-md">
      <form className="flex flex-col gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Title:</span>
          </label>
          <input
            type="text"
            className="input input-bordered input-forest w-full"
            value={newSaveTitle}
            onChange={(e) => setNewSaveTitle(e.target.value)}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Content:</span>
          </label>
          <textarea
            className="textarea textarea-forest w-full h-48 resize-none"
            value={newSaveContent}
            onChange={(e) => setNewSaveContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default NoteDetailPage;
