import "./poll.css";

/**
  1) checkboc
  3) title
  3) number of votes (%)
  4) progress bar
*/

const Poll = ({
  poll,
  totalVotes,
  handlePollSelection,
  handleVote,
  selectedPoll,
  pollIndex,
}) => {
  const getPercentage = (votes) => {
    console.log("votes", votes, totalVotes);
    if (totalVotes === 0) {
      return 0;
    }
    return (votes / totalVotes) * 100;
  };

  return (
    <div className="poll">
      <div className="poll-content">
        <div className="left">
          <input
            type="checkbox"
            className="checkbox"
            checked={selectedPoll === pollIndex + "-" + poll.id}
            onChange={() => {
              handleVote(poll.id);
            }}
          />
          <h3 className="poll-title">{poll?.title}</h3>
        </div>
        <div className="poll-votes">
          <p>{poll?.votes}</p>
          <span>( {getPercentage(poll.votes).toFixed(0)}% )</span>
        </div>
      </div>
      <div className="progress-bar"></div>
    </div>
  );
};

export default Poll;
