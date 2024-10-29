// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import '../App.css';

// const CommentSection = ({ taskId, onComment }) => {
//   const [comment, setComment] = useState('');

//   const handleCommentSubmit = () => {
//     if (comment.trim()) {
//       onComment(taskId, comment);
//       setComment('');
//     }
//   };

//   return (
//     <div className="comment-section mb-3">
//       <textarea
//         className="form-control mb-2"
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="Write a comment..."
//       ></textarea>
//       <button 
//         className="btn btn-primary" 
//         onClick={handleCommentSubmit}
//       >
//         Post Comment
//       </button>
//     </div>
//   );
// };

// // Define prop types
// CommentSection.propTypes = {
//   taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   onComment: PropTypes.func.isRequired,
// };

// export default CommentSection;


// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import '../App.css';

// const CommentSection = ({ taskId, onComment }) => {
//   const [comment, setComment] = useState('');

//   const handleCommentSubmit = async () => {
//     if (comment.trim()) {
//       await onComment(taskId, comment);
//       setComment(''); // Clear the input after submitting
//     }
//   };

//   return (
//     <div className="comment-section mb-3">
//       <textarea
//         className="form-control mb-2"
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="Write a comment..."
//       ></textarea>
//       <button 
//         className="btn btn-primary" 
//         onClick={handleCommentSubmit}
//       >
//         Post Comment
//       </button>
//     </div>
//   );
// };

// // Define prop types
// CommentSection.propTypes = {
//   taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   onComment: PropTypes.func.isRequired,
// };

// export default CommentSection;

import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { addComment, deleteComment } from '../Store/tasksSlice';
import '../App.css';

const CommentSection = ({ taskId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => 
    state.tasks.tasks.find(task => task._id === taskId)?.comments || []
  );
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      await dispatch(addComment({ taskId, comment }));
      setComment(''); // Clear the input after submitting
    }
  };

  const handleCommentDelete = async (commentId) => {
    await dispatch(deleteComment({ taskId, commentId })); // Dispatch deleteComment
  };

  return (
    <div className="comment-section mb-3">
      <textarea
        className="form-control mb-2"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
      ></textarea>
      <button 
        className="btn btn-primary" 
        onClick={handleCommentSubmit}
      >
        Post Comment
      </button>

      <ul className="list-group mt-3">
        {comments.map((comment) => (
          <li key={comment._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{comment.text}</span> {/* Display comment text */}
            <button 
              className="btn btn-danger btn-sm" 
              onClick={() => handleCommentDelete(comment._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Define prop types
CommentSection.propTypes = {
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CommentSection;
