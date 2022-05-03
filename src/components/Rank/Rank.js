import React, { useEffect, useState } from "react";

const Rank = ({ name, entries }) => {
  const [emoji, setEmoji] = useState();
  useEffect(() => {
    generateEmoji(entries);
  }, [entries]);

  const generateEmoji = (entries) => {
    fetch(
      `https://57ewjskgl7.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`
    )
      .then((resp) => resp.json)
      .then((data) => {
        setEmoji(data.rankEmoji);
      })
      .catch(console.log);
  };
  return (
    <div>
      <div className="white f3">
        {`${name}, your current entry count is...`}
      </div>
      <div className="white f1">{entries}</div>
      <div className="white f3">Rank Badge: {emoji}</div>
    </div>
  );
};

export default Rank;
