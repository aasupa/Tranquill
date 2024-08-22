import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "./todo.css";

const Todoslist = ({
  title,
  isCompleted,
  updateHandler,
  deleteHandler,
  completeHandler,
  updateReminder,
  id,
  onEditTitle,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reminderTime, setReminderTime] = useState(null);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleCompleteChange = () => {
    completeHandler(id, isCompleted);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleEdit = () => {
    setEditMode(true);
    onEditTitle(newTitle, id);
  };

  const handleUpdate = () => {
    if (editMode) {
      updateHandler({ title: newTitle });
      setEditMode(false);
    } else {
      handleCompleteChange();
    }
  };

  const handleDelete = () => {
    deleteHandler(id);
  };

  const handleDateChange = (date) => {
    console.log('Date Selected:',date);
    setReminderTime(date);
  };

  const handleSaveReminder = () => {
    console.log(updateReminder);
    console.log('Reminder Time:', reminderTime);
    if (updateReminder && reminderTime) {
      
      const formattedReminder = moment(reminderTime).format("YYYY-MM-DD HH:mm");
      console.log('Formatted Reminder:', formattedReminder);
      updateReminder(id, formattedReminder);
      setShowDatePicker(false);
    } else {
      console.error("updateReminder function is not defined or reminderTime is null");
    }
  };

  return (
    <li className="list-item">
      <input
        type="text"
        value={newTitle}
        className={`list ${isCompleted ? "complete" : ""}`}
        readOnly={!editMode}
        onChange={handleTitleChange}
      />
      <div>
        {!isCompleted && (
          <>
            <button className="button-complete" onClick={handleCompleteChange}>
              <i className="fa fa-check-circle"></i>
            </button>
            <button className="button-edit" onClick={handleEdit}>
              <i className="fa fa-edit"></i>
            </button>
          </>
        )}
        <button className="button-delete" onClick={handleDelete}>
          <i className="fa fa-trash"></i>
        </button>

        {/* Reminder Button and Date Picker */}
        {!isCompleted && (
          <>
            <button
              className="button-reminder"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <i className="fa fa-bell"></i>
            </button>
            {showDatePicker && (
              <div className="date-picker-container">
                <DatePicker
                  selected={reminderTime}
                  onChange={handleDateChange}
                  showTimeSelect
                  dateFormat="Pp"
                />
                <button onClick={handleSaveReminder}>Save Reminder</button>
              </div>
            )}
          </>
        )}
      </div>
    </li>
  );
};

export default Todoslist;





// import React, { useState, useEffect } from "react";
// import "./todo.css";

// const Todoslist = ({
//   title,
//   isCompleted,
//   updateHandler,
//   deleteHandler,
//   completeHandler,
//   updateReminder,
//   id,
//   onEditTitle,
// }) => {
//   const [editMode, setEditMode] = useState(false);
//   const [newTitle, setNewTitle] = useState(title);

//   useEffect(() => {
//     setNewTitle(title);
//   }, [title]);

//   const handleCompleteChange = () => {
//     completeHandler(id, isCompleted);
//   };

//   const handleTitleChange = (e) => {
//     setNewTitle(e.target.value);
//   };

//   const handleEdit = () => {
//     setEditMode(true);
//     onEditTitle(newTitle, id);
//   };

//   const handleUpdate = () => {
//     if (editMode) {
//       updateHandler({ title: newTitle });
//       setEditMode(false);
//     } else {
//       handleCompleteChange();
//     }
//   };

//   const handleDelete = () => {
//     deleteHandler(id);
//   };

//   const handleSetReminder = (taskId) => {
//     const reminderTime = prompt("Enter reminder time in YYYY-MM-DD HH:mm format:");
//     if (reminderTime) {
//       updateReminder(taskId, reminderTime);
//     }
//   };

//   return (
//     <li className="list-item">
//       <input
//         type="text"
//         value={newTitle}
//         className={`list ${isCompleted ? "complete" : ""}`}
//         readOnly={!editMode}
//         onChange={handleTitleChange}
//       />
//       <div>
//         {!isCompleted && (
//           <>
//             <button
//               className="button-complete"
//               onClick={handleCompleteChange}
//             >
//               <i className="fa fa-check-circle"></i>
//             </button>
//             <button className="button-edit" onClick={handleEdit}>
//               <i className="fa fa-edit"></i>
//             </button>
//           </>
//         )}
//         <button className="button-delete" onClick={handleDelete}>
//           <i className="fa fa-trash"></i>
//         </button>

//         {/* Render bell icon only if task is not completed */}
//         {!isCompleted && (
//           <button className="button-reminder" onClick={() => handleSetReminder(id)}>
//             <i className="fa fa-bell"></i>
//           </button>
//         )}
//       </div>
//     </li>
//   );
// };

// export default Todoslist;
