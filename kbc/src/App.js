import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Question1 from "./components/Question1";
import { Data } from "./components/Data";

function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");
  const data = Data();

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1,000" },
        { id: 6, amount: "$ 2,000" },
        { id: 7, amount: "$ 4,000" },
        { id: 8, amount: "$ 8,000" },
        { id: 9, amount: "$ 16,000" },
        { id: 10, amount: "$ 32,000" },
        { id: 11, amount: "$ 64,000" },
        { id: 12, amount: "$ 125,000" },
        { id: 13, amount: "$ 250,000" },
        { id: 14, amount: "$ 500,000" },
        { id: 15, amount: "$ 1,000,000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    if (questionNumber > 1) {
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
    }
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {questionNumber > 15 ? (
              <h1 className="congratsText" style={{  position: 'relative',
                top: 0,   
                bottom: 0,
                left: 0,
                right: 0,
                margin: 'auto',color:'red'}} >Congratulations, you are a billionaire now!</h1>
            ) : (
              timeOut ? (
                <h1 className="endText">You earned: {earned}</h1>
              ) : (
                <>
                  <div className="top">
                    <div className="timer">
                      <Timer
                        setTimeOut={setTimeOut}
                        questionNumber={questionNumber}
                      />
                    </div>
                  </div>
                  <div className="bottom">
                    <Question1
                      data={data}
                      questionNumber={questionNumber}
                      setQuestionNumber={setQuestionNumber}
                      setTimeOut={setTimeOut}
                    />
                  </div>
                </>
              )
            )}
          </div>
          {questionNumber<=15?<div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  key={m.id}
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>:''}
        </>
      )}
    </div>
  );
}

export default App;
