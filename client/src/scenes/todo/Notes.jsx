// import React, { useState } from "react";
// import "./notes.css";

// const Notes = () => {
//   const [notes, setNotes] = useState("");
//   const [savedNotes, setSavedNotes] = useState([]);

//   const handleSaveNote = () => {
//     if (notes.trim()) {
//       setSavedNotes([...savedNotes, notes]);
//       setNotes("");
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
//       <button onClick={handleSaveNote} className="notes-save-button">Save Note</button>
//       <div className="saved-notes">
//         {savedNotes.map((note, index) => (
//           <div key={index} className="note-item">
//             {note}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notes;
import React, { useState } from "react";
import "./notes.css";

const Notes = () => {
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleSaveNote = () => {
    if (notes.trim() || image || audio) {
      setSavedNotes([...savedNotes, { text: notes, image, audio }]);
      setNotes("");
      setImage(null);
      setAudio(null);
    }
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleAudioChange = (e) => {
    setAudio(URL.createObjectURL(e.target.files[0]));
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
            {note.image && <img src={note.image} alt="Note" className="note-image" />}
            {note.audio && <audio controls src={note.audio} className="note-audio"></audio>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
