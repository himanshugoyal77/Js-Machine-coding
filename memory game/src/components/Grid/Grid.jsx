import { useEffect, useState } from "react";
import "./grid.css";
import { generateGrid } from "../../utils/helper";

const Grid = ({ size }) => {
  const [gridElements, setGridElements] = useState(generateGrid(size));
  const [openedList, setOpendList] = useState([]); // recently opend cells index
  const [visibleList, setVisibleList] = useState([]); // actual values of opend cells

  useEffect(() => {
    if (openedList.length === 2) {
      const element1 = gridElements[openedList[0]];
      const element2 = gridElements[openedList[1]];

      if (element1 === element2) {
        setTimeout(() => {
          setVisibleList([...visibleList, element1]);
          setOpendList([]);
        }, 1200);
      } else {
        setTimeout(() => {
          setOpendList([]);
        }, 1200);
      }
    }
  }, [openedList]);

  useEffect(() => {
    if (visibleList.length === gridElements.length / 2) {
      alert("You won!");
      setVisibleList([]);
      setOpendList([]);
      setGridElements(generateGrid(size));
    }
  }, [visibleList, size]);

  const handleClick = (index) => {
    if (openedList.length === 2) return;

    setOpendList([...openedList, index]);
  };

  const handleClasses = (element, index) => {
    if (visibleList.includes(element)) {
      return "show";
    } else if (openedList.includes(index)) {
      return "visible";
    } else {
      return "hide";
    }
  };

  if (size % 2 !== 0) {
    alert("Size must be an even number");
    return null;
  }

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
      }}
    >
      {gridElements.map((element, index) => (
        <div
          key={index}
          className="grid-items"
          onClick={() => handleClick(index)}
        >
          <div className={`${handleClasses(element, index)}`}>{element}</div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
