import { useRef, useState } from "react";

const Board = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const dragStartColumnRef = useRef(null);
  const dragStartItemRef = useRef(null);

  const handleDragStart = (e, item, column) => {
    e.target.style.opacity = "0.3";
    dragStartColumnRef.current = column;
    dragStartItemRef.current = item;
    // console.log(
    //   "dragStartColumnRef",
    //   dragStartColumnRef.current,
    //   "dragStartItemRef",
    //   dragStartItemRef.current
    // );
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    setData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[targetColumn] = [
        ...updatedData[targetColumn],
        dragStartItemRef.current,
      ];
      updatedData[dragStartColumnRef.current] = [
        ...updatedData[dragStartColumnRef.current].filter(
          (item) => item !== dragStartItemRef.current
        ),
      ];
      return updatedData;
    });
  };

  return (
    <div className="board-wrapper">
      {Object.keys(data).map((key, index) => {
        return (
          <div
            onDrop={(e) => handleDrop(e, key)}
            onDragOver={(e) => e.preventDefault()}
            key={index}
            className="table"
          >
            <h2 className="title">{key}</h2>
            <div className="table-row">
              {data[key].length > 0 &&
                data[key].map((item, itemIndex) => {
                  return (
                    <tr
                      draggable
                      onDragStart={(e) => handleDragStart(e, item, key)}
                      onDragEnd={(e) => handleDragEnd(e)}
                      className=""
                      key={itemIndex}
                    >
                      <td>{item}</td>
                    </tr>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Board;
