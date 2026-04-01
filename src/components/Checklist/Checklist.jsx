import "./Checklist.css";

const Checklist = () => {
  return (
    <div className="checklist">
      <h3>Today's Checklist</h3>

      <div className="empty">
        <img src="https://cdn-icons-png.flaticon.com/512/595/595067.png" alt="cone" />
        <p>Coming Soon...</p>
        <span>Smarter daily checklist for overdue and follow-ups</span>
      </div>
    </div>
  );
};

export default Checklist;