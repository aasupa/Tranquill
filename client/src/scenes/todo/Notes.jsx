// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from 'react-redux';
// import "./notes.css";

// const Notes = () => {
//   const [notes, setNotes] = useState("");
//   const [savedNotes, setSavedNotes] = useState([]);
//   const [image, setImage] = useState(null);
//   const [audio, setAudio] = useState(null);
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
//     console.log("Preparing to send note data:", notes, image, audio);


//     if (notes.trim() || image || audio) {
//       const formData = new FormData();
//       formData.append("text", notes);
//       if (image) formData.append('image', image);
//       if (audio) formData.append('audio', audio);

//       for (let [key, value] of formData.entries()) {
//         console.log(`${key}: ${value}`);
//       }

//       try {
//         const response = await axios.post('http://localhost:3001/notes',formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data'
//           }
//         });
//         console.log("Note saved successfully:", response.data);
//         setSavedNotes([...savedNotes, response.data]);
//         setNotes("");
//         setImage(null);
//         setAudio(null);
//       } catch (err) {
//         console.error('Error saving note:', err);
//       }
//     }
//   };

//   const handleImageChange = (e) => {
//     setImage (e.target.files[0]);
//   };

//   const handleAudioChange = (e) => {
//     setAudio (e.target.files[0]);
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
//       <button onClick={handleSaveNote} className="notes-save-button">Save Note</button>
//       <div className="saved-notes">
//         {savedNotes.map((note, index) => (
//           <div key={index} className="note-item">
//             <p>{note.text}</p>
//             {note.image && <img src={`http://localhost:3001/${note.image}`} alt="Note" className="note-image" />}
//             {note.audio && <audio controls src={`http://localhost:3001/${note.audio}`} className="note-audio"></audio>}
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

      try {
        const response = await axios.post('http://localhost:3001/notes', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setSavedNotes([...savedNotes, response.data]);
        setNotes("");
        setImage(null);
        setAudio(null);
      } catch (err) {
        console.error('Error saving note:', err);
      }
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
  };

  return (
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
      <button onClick={handleSaveNote} className="notes-save-button">Save Note</button>
      <div className="saved-notes">
        {savedNotes.map((note, index) => (
          <div key={index} className="note-item">
            <p>{note.text}</p>
            {note.image && <img src={`http://localhost:3001${note.image}`} alt="Note" className="note-image" />}
            {note.audio && <audio controls src={`http://localhost:3001${note.audio}`} className="note-audio"></audio>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
