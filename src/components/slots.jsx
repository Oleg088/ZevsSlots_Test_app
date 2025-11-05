import "../styles/slots.css";
import { useCallback, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import borderFrame from "../assets/frames/border_frame.svg";
import slotsBackground from "../assets/frames/slots-background.png";
import slotsButton from "../assets/ui/spin_button.png";
import blue from "../assets/icons/blue.svg";
import corona from "../assets/icons/corona.svg";
import gool from "../assets/icons/gool.svg";
import green from "../assets/icons/green.svg";
import orange from "../assets/icons/orange.svg";
import prize from "../assets/icons/prize.svg";
import purple from "../assets/icons/purple.svg";
import wildWin from "../assets/icons/wild_win.svg";
import yellow from "../assets/icons/yellow.svg";
import zoore from "../assets/icons/zoore.svg";
import divider from "../assets/frames/divider.svg";

const Slots = ({ onWin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentPosition, setCurrentPosition] = useState("0%");
  const [isStopping, setIsStopping] = useState(false);
  const randomOffsetRef = useRef(0);

  const symbols = useMemo(
    () => [
      blue,
      corona,
      gool,
      green,
      orange,
      prize,
      purple,
      wildWin,
      yellow,
      zoore,
    ],
    []
  );

  const generateRandomGrid = useCallback(() => {
    const columns = 6;
    const rowsPerColumn = 15;
    const grid = [];

    for (let col = 0; col < columns; col++) {
      const shuffled = [...symbols].sort(() => Math.random() - 0.5);

      for (let row = 0; row < rowsPerColumn; row++) {
        grid.push(shuffled[row % symbols.length]);
      }
    }

    return grid;
  }, [symbols]);

  const [grid, setGrid] = useState(() => generateRandomGrid());
  const spinStartPositionRef = useRef(0);
  const spinAnimationKeyframesRef = useRef([]);

  const onSpin = useCallback(() => {
    if (isSpinning) return;

    setGrid(generateRandomGrid());
    setIsStopping(false);

    spinStartPositionRef.current = parseFloat(currentPosition) || 0;

    const maxRowsToScroll = 3;
    const totalRows = 15;
    const maxOffset = -(maxRowsToScroll / totalRows) * 100;
    const minOffset = -(2 / totalRows) * 100;

    randomOffsetRef.current =
      Math.random() * (maxOffset - minOffset) + minOffset;

    const startPos = spinStartPositionRef.current;
    const rowHeight = 100 / totalRows;
    const scrollDistance = -(rowHeight * 2);
    const midPos = startPos + scrollDistance;
    const endPos = midPos + scrollDistance;
    spinAnimationKeyframesRef.current = [
      `${startPos}%`,
      `${midPos}%`,
      `${endPos}%`,
    ];

    setIsSpinning(true);

    const SPIN_DURATION_MS = 3000;
    const STOP_ANIMATION_MS = 500;

    window.setTimeout(() => {
      setIsSpinning(false);
      setIsStopping(true);
      const finalPosition = `${randomOffsetRef.current}%`;

      setTimeout(() => {
        setCurrentPosition(finalPosition);
      }, 50);

      window.setTimeout(() => {
        setIsStopping(false);
        if (onWin) {
          onWin();
        }
      }, STOP_ANIMATION_MS);
    }, SPIN_DURATION_MS);
  }, [isSpinning, onWin, generateRandomGrid, currentPosition]);

  const isStopped = !isSpinning && !isStopping && currentPosition !== "0%";

  return (
    <div>
      <div className="bonus-container">
        <div className="frame-container">
          <img src={borderFrame} alt="Slot Frame" className="frame-border" />
          <div
            className="frame-background"
            style={{ backgroundImage: `url(${slotsBackground})` }}
          ></div>
          <img src={divider} alt="reel dividers" className="reels-dividers" />
          <div className={`reels-viewport ${isSpinning ? "spinning" : ""}`}>
            <motion.div
              className="reels-grid"
              data-stopping={isStopping}
              data-stopped={isStopped}
              initial={{ y: currentPosition }}
              animate={{
                y: isSpinning
                  ? spinAnimationKeyframesRef.current
                  : currentPosition,
                scale: isStopping ? [1, 1.02, 1] : 1,
              }}
              transition={{
                duration: isSpinning ? 1.5 : isStopping ? 0.5 : 0,
                ease: isSpinning
                  ? "linear"
                  : isStopping
                  ? [0.68, -0.55, 0.265, 1.55]
                  : [0.4, 0.0, 0.2, 1],
                repeat: isSpinning ? Infinity : 0,
                repeatType: "loop",
                repeatDelay: 0,
              }}
            >
              {grid.map((iconSrc, idx) => {
                const rowIndex = Math.floor(idx / 6);
                const isVisibleRow = rowIndex < 4;
                return (
                  <motion.div
                    className="symbol"
                    key={idx}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{
                      scale:
                        isStopping && isVisibleRow ? [1, 1.2, 0.9, 1.1, 1] : 1,
                      opacity:
                        isStopping && isVisibleRow ? [1, 0.8, 1, 0.9, 1] : 1,
                      y: isStopping && isVisibleRow ? [0, -4, 3, -2, 0] : 0,
                      rotate:
                        isStopping && isVisibleRow ? [0, -2, 2, -1, 0] : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.68, -0.55, 0.265, 1.55],
                      delay: isStopping && isVisibleRow ? (idx % 6) * 0.04 : 0,
                    }}
                  >
                    <img src={iconSrc} alt={`symbol-${idx}`} />
                  </motion.div>
                );
              })}
              {grid.map((iconSrc, idx) => (
                <div className="symbol" key={`d-${idx}`}>
                  <img src={iconSrc} alt={`symbol-dup-${idx}`} />
                </div>
              ))}
              {grid.map((iconSrc, idx) => (
                <div className="symbol" key={`d2-${idx}`}>
                  <img src={iconSrc} alt={`symbol-dup2-${idx}`} />
                </div>
              ))}
            </motion.div>
          </div>
          <div className="slots-container">
            <p className="slot-text">SPIN TO GET A BONUS</p>
          </div>
          <button className="spin-button" aria-label="Spin" onClick={onSpin}>
            <img src={slotsButton} alt="spin button" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slots;
