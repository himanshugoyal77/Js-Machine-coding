import Poll from "./Poll";
import "./poll.css";

/* eslint-disable */

const PollCard = ({
  options,
  totalVotes,
  handleVote,
  handlePollSelection,
  selectedPoll,
  pollIndex,
}) => {
  return (
    <div className="poll-card">
      {options.length > 0 &&
        options.map((option, index) => {
          return (
            <Poll
              key={index}
              poll={option}
              handleVote={handleVote}
              totalVotes={totalVotes}
              handlePollSelection={handlePollSelection}
              selectedPoll={selectedPoll}
              pollIndex={pollIndex}
            />
          );
        })}
    </div>
  );
};

export default PollCard;
