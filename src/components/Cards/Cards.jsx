import "./Cards.css";

const Cards = () => {
  return (
    <div className="cards">
      <div className="card green">
        <p>↓ To Collect</p>
        <h2>₹ 3,52,702</h2>
      </div>

      <div className="card red">
        <p>↑ To Pay</p>
        <h2>₹ 69,556</h2>
      </div>

      <div className="card grey">
        <p>Total Cash + Bank Balance</p>
        <h2>₹ 16,14,506.3</h2>
      </div>
    </div>
  );
};

export default Cards;