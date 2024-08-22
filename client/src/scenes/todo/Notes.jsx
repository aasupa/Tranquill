
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from 'react-redux';
// import "./notes.css";

// const Notes = () => {
//   const [notes, setNotes] = useState("");
//   const [savedNotes, setSavedNotes] = useState([]);
//   const [image, setImage] = useState(null);
//   const [audio, setAudio] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editNoteId, setEditNoteId] = useState(null);
  
//   const token = useSelector((state) => state.token);

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/notes', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setSavedNotes(response.data);
//       } catch (err) {
//         console.error('Error fetching notes:', err);
//       }
//     };

//     fetchNotes();
//   }, [token]);

//   const handleSaveNote = async () => {
//     if (notes.trim() || image || audio) {
//       const formData = new FormData();
//       formData.append("text", notes);
//       if (image) formData.append('image', image);
//       if (audio) formData.append('audio', audio);

//       try {
//         if (editMode && editNoteId) {
//           console.log(`Editing note with ID: ${editNoteId}`);
//           const response = await axios.put(`http://localhost:3001/notes/${editNoteId}`, { text: notes }, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           console.log('Updated Note:', response.data);
//           setSavedNotes(savedNotes.map(note => note._id === editNoteId ? response.data : note));
//           setEditMode(false);
//           setEditNoteId(null);
//         } else {
//           const response = await axios.post('http://localhost:3001/notes', formData, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'multipart/form-data'
//             }
//           });
//           console.log('Saved Note:', response.data);
//           setSavedNotes([...savedNotes, response.data]);
//         }
//         setNotes("");
//         setImage(null);
//         setAudio(null);
//       } catch (err) {
//         console.error('Error saving note:', err);
//       }
//     }
//   };

//   const handleEditNote = (note) => {
//     setNotes(note.text);
//     setEditNoteId(note._id);
//     setEditMode(true);
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleAudioChange = (e) => {
//     setAudio(e.target.files[0]);
//   };

//   const handleDeleteNote = async (noteId) => {
//     try {
//       await axios.delete(`http://localhost:3001/notes/${noteId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       // Remove the deleted note from the state
//       setSavedNotes(savedNotes.filter(note => note._id !== noteId));
//     } catch (err) {
//       console.error('Error deleting note:', err);
//     }
//   };

//   return (
//     <div className="notes-container">
//       <textarea
//         value={notes}
//         onChange={(e) => setNotes(e.target.value)}
//         placeholder="Write your notes here..."
//         className="notes-textarea"
//       ></textarea>
//       <div className="file-inputs">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           id="image-input"
//           className="file-input"
//         />
//         <label htmlFor="image-input" className="icon-button">
//           <i className="fas fa-image"></i>
//         </label>
//         <input
//           type="file"
//           accept="audio/*"
//           onChange={handleAudioChange}
//           id="audio-input"
//           className="file-input"
//         />
//         <label htmlFor="audio-input" className="icon-button">
//           <i className="fas fa-microphone"></i>
//         </label>
//       </div>
//       <button onClick={handleSaveNote} className="notes-save-button">
//         {editMode ? "Update Note" : "Save Note"}
//       </button>
//       <div className="saved-notes">
//         {savedNotes.map((note, index) => (
//           <div key={index} className="note-item">
//             <p>{note.text}</p>
//             {note.image && <img src={`http://localhost:3001${note.image}`} alt="Note" className="note-image" />}
//             {note.audio && <audio controls src={`http://localhost:3001${note.audio}`} className="note-audio"></audio>}
//             <i className="fas fa-trash delete-icon" onClick={() => handleDeleteNote(note._id)}></i>
//             <i className="fas fa-edit" onClick={() => handleEditNote(note)}></i>

//             {/* Add delete icon and function here */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notes;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import "./notes.css";

const Notes = () => {
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/notes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedNotes(response.data);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };

    fetchNotes();
  }, [token]);

  const handleSaveNote = async () => {
    if (notes.trim() || image || audio) {
      const formData = new FormData();
      formData.append("text", notes);
      if (image) formData.append('image', image);
      if (audio) formData.append('audio', audio);


      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }


      try {
        if (editMode && editNoteId) {
          console.log(`Editing note with ID: ${editNoteId}`);
          const response = await axios.put(`http://localhost:3001/notes/${editNoteId}`, { text: notes }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('Updated Note:', response.data);
          setSavedNotes(savedNotes.map(note => note._id === editNoteId ? response.data : note));
          setEditMode(false);
          setEditNoteId(null);
        } else {
          const response = await axios.post('http://localhost:3001/notes', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Saved Note:', response.data);
          setSavedNotes([...savedNotes, response.data]);
        }
        setNotes("");
        setImage(null);
        setAudio(null);
      } catch (err) {
        console.error('Error saving note:', err);
      }
    }
  };

  const handleEditNote = (note) => {
    setNotes(note.text);
    setEditNoteId(note._id);
    setEditMode(true);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:3001/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Remove the deleted note from the state
      setSavedNotes(savedNotes.filter(note => note._id !== noteId));
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const handleSeeMore = (note) => {
    setCurrentNote(note);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setCurrentNote(null);
  };

  return (
  <div className="notes-wrapper W-full">
    <div className="notes-header">My Notes</div>
    <div className="notes-container">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
        className="notes-textarea"
      ></textarea>
      <div className="file-inputs">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="image-input"
          className="file-input"
        />
        <label htmlFor="image-input" className="icon-button">
          <i className="fas fa-image"></i>
        </label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioChange}
          id="audio-input"
          className="file-input"
        />
        <label htmlFor="audio-input" className="icon-button">
          <i className="fas fa-microphone"></i>
        </label>
      </div>
      <button onClick={handleSaveNote} className="notes-save-button">
        {editMode ? "Update Note" : "Save Note"}
      </button>
      <div className="saved-notes">
        {savedNotes.map((note, index) => (
          <div key={index} className="note-item">
            <p>{note.text.substring(0, 100)}... <button className="see-more-button" onClick={() => handleSeeMore(note)}>
                 See More
      </button></p>
           
            {/* <p className="note-text">
             {note.text.length > 100 ? note.text.substring(0, 100) + '...' : note.text}
              {note.text.length > 100 && (
               <button className="see-more-button" onClick={() => handleSeeMore(note)}>
                 See More
      </button>
    )}
  </p> */}
            
            {note.image && <img src={`http://localhost:3001${note.image}`} alt="Note" className="note-image" />}
            {note.audio && <audio controls src={`http://localhost:3001${note.audio}`} className="note-audio"></audio>}
           
            <i className="fas fa-trash delete-icon" onClick={() => handleDeleteNote(note._id)}></i>
            <i className="fas fa-edit" onClick={() => handleEditNote(note)}></i>
            <p className="note-timestamp"> {new Date(note.createdAt).toLocaleString()}
          {/* Display the date and time */}
      </p>
            {/* Add delete icon and function here */}
          </div>
        ))}
      </div>
      {showDetail && currentNote && (
        <div className="note-detail-widget">
          <button className="close-detail-button" onClick={handleCloseDetail}>×</button>
          <p>{currentNote.text}</p>
          {currentNote.image && <img src={`http://localhost:3001${currentNote.image}`} alt="Note" className="note-detail-image" />}
          {currentNote.audio && <audio controls src={`http://localhost:3001${currentNote.audio}`} className="note-detail-audio"></audio>}
        </div>
      )}
    </div>
    </div>
  );
};

export default Notes;
