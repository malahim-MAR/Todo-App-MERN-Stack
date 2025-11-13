import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router";

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

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("Save Button Clicked")
    console.log("title:", newSaveTitle)
    console.log("content:", newSaveContent)
    try {
      setLoading(true)
      await axios.put(`http://localhost:5001/api/notes/${id}`, {
        title: newSaveTitle,
        content: newSaveContent,
      });

      toast.success("Note Updated Succesfully")
    } catch (error) {
      console.log("Error Not Saving", error)
    } finally {
      setLoading(false)

    }

  }

  if (loading) return <p className="text-forest-800">Loading...</p>;
  if (!noteDetail) return <p className="text-red-600">Note not found.</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-forest-100 rounded-lg shadow-md">
      <div>
        <Link to={'/'} className="btn  btn-secondary">Back to Home</Link>
      </div>
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
        <button className="btn btn-primary" onClick={handleEdit}>Save</button>
      </form>
    </div>
  );
};

export default NoteDetailPage;
