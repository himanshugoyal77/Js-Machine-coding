import { useState } from "react";
import jsonData from "./data/data.json";
import PollCard from "./components/PollCard";

function App() {
  const [data, setData] = useState(jsonData);
  const [currentVote, setCurrentVote] = useState(null);

  console.log("currentVote", currentVote);

  const handleVote = (pollIndex) => {
    return (optionIndex) => {
      // Keep track of the previous vote
      let prevVote = currentVote;

      // Determine the current vote (combination of poll and option index)
      let newVote = pollIndex + "-" + optionIndex;

      // If the user clicks the same option, unvote (set currentVote to null), otherwise update currentVote
      if (currentVote === newVote) {
        setCurrentVote(null);
        prevVote = currentVote;
        pollIndex = null;
      } else {
        setCurrentVote(newVote);
      }

      // Create a deep copy of the data to ensure immutability
      const updatedData = data.map((poll, index) => {
        // Clone the poll object
        let updatedPoll = { ...poll, answers: [...poll.answers] };

        if (index === pollIndex) {
          // Update the current poll's total votes and the selected option's votes
          updatedPoll.totalVotes = poll.totalVotes + 1;
          updatedPoll.answers[optionIndex] = {
            ...poll.answers[optionIndex],
            votes: poll.answers[optionIndex].votes + 1,
          };
        }

        // Handle undoing a previous vote if there was one
        if (prevVote) {
          const [prevPollIndex, prevOptionIndex] = prevVote
            .split("-")
            .map(Number);

          if (index === prevPollIndex) {
            // Decrement votes for the previously voted option
            updatedPoll.totalVotes = updatedPoll.totalVotes - 1;
            updatedPoll.answers[prevOptionIndex] = {
              ...poll.answers[prevOptionIndex],
              votes: poll.answers[prevOptionIndex].votes - 1,
            };
          }
        }

        return updatedPoll;
      });

      // Update the state with the new data
      setData(updatedData);
    };
  };

  return (
    <div className="container">
      {data.length > 0 &&
        data.map((poll, index) => {
          return (
            <div className="card-wrapper" key={index}>
              <div className="">
                <h1>{poll.question}</h1>
                <PollCard
                  options={poll.answers}
                  totalVotes={poll.totalVotes}
                  handleVote={handleVote(index)}
                  //handlePollSelection={handlePollSelection}
                  pollIndex={index}
                  selectedPoll={currentVote}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
