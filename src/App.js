import styled from "styled-components";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";

const Div = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledBox1 = styled.div`
  background: ${({ color }) => color.currentColor};
  width: 100px;
  height: 100px;
`;
const StyledBox2 = styled.div`
  background: ${({ color }) => color.currentColor};
  width: 100px;
  height: 100px;
`;
const StyledBox3 = styled.div`
  background: ${({ color }) => color.currentColor};
  width: 100px;
  height: 100px;
`;
const StyledButton = styled.button`
  width: 50px;
  height: 25px;
`;

export default function App() {
  const [color1, setColor1] = useState({
    currentColor: "lightgrey"
  });
  const [color2, setColor2] = useState({
    currentColor: "lightgrey"
  });
  const [color3, setColor3] = useState({
    currentColor: "lightgrey"
  });

  const trafficColor = ["red", "yellow", "green"];
  const [trys, setTrys] = useState(0);

  function randomNumber() {
    return Math.floor(Math.random() * 3);
  }

  //local Storage:
  const [record, setRecord] = useLocalStorageState("record", {
    defaultValue: []
  });

  // filtern, aktuelles record mit array im local storage vergleichen, dann
  //werte überschreiben wenn besser

  //speicher auf 5 Einträge begrenzen

  function handleRecord() {
    if (localStorage.record <= 3) {
      setRecord([
        {
          id: uid(),
          currentRecord: trys
        },
        ...record
      ]);
    }
  }

  console.log(localStorage);

  const result =
    color1.currentColor === color2.currentColor &&
    color1.currentColor === color3.currentColor
      ? "you won"
      : "you lost";

  const resultText = `result: ${result}`;

  // Win Condition:
  function checkVictory() {
    if (
      color1.currentColor === color2.currentColor &&
      color1.currentColor === color3.currentColor &&
      color1.currentColor !== "lightgrey"
    ) {
      if (trys > 0) {
        //localStorage ansteuern:
        handleRecord();
        setColor1({ currentColor: "lightgrey" });
        setColor2({ currentColor: "lightgrey" });
        setColor3({ currentColor: "lightgrey" });
        setTrys(0);
      }
    }
  }

  return (
    <>
      <Div>
        <StyledBox1 color={color1} />
        <StyledBox2 color={color2} />
        <StyledBox3 color={color3} />
        <StyledButton
          onClick={() => {
            setColor1({
              currentColor: trafficColor[randomNumber()]
            });
            setColor2({
              currentColor: trafficColor[randomNumber()]
            });
            setColor3({
              currentColor: trafficColor[randomNumber()]
            });
            setTrys(trys + 1);
            checkVictory();
            // handleRecord();
          }}
        >
          Button
        </StyledButton>
        <p>{resultText}</p>
        <p>trys: {trys}</p>
      </Div>
    </>
  );
}
