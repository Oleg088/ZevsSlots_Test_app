import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./header";
import "../styles/hero.css";
import "../styles/slots.css";
import zevsImage from "../assets/backgrounds/zevs.png";
import flasheImage from "../assets/ui/flashe.png";
import Slots from "./slots";
import Confetti from "./Confetti";

const Hero = () => {
  const [showWinPopup, setShowWinPopup] = useState(false);

  const handleWin = useCallback(() => {
    setShowWinPopup(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setShowWinPopup(false);
  }, []);

  return (
    <div className="hero">
      <Header />
      <div className="zeus-container">
        <motion.img
          className="zeus-image"
          src={zevsImage}
          alt="Zeus character"
          animate={{
            y: [0, -6, 0],
            filter: [
              "brightness(1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))",
              "brightness(1.05) drop-shadow(0 0 25px rgba(255, 215, 0, 0.4))",
              "brightness(1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))",
            ],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
            filter: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </div>
      <Slots onWin={handleWin} />
      <AnimatePresence>
        {showWinPopup && (
          <motion.div
            className="win-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Confetti />
            <motion.div
              className="win-popup-wrapper"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.8,
              }}
            >
              <motion.div
                className="win-badge"
                initial={{ scale: 0.9, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                  delay: 0.1,
                }}
              >
                BET<span className="highlight">AND</span>YOU
              </motion.div>
              <motion.div
                className="win-popup"
                initial={{ scale: 0.85, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 10, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: 0.15,
                }}
              >
                <motion.div
                  className="win-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.25,
                  }}
                >
                  YOU WIN!
                </motion.div>
                <motion.div
                  className="win-percent"
                  initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                    delay: 0.3,
                  }}
                >
                  450%
                </motion.div>
                <motion.div
                  className="win-subtitle"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.35,
                  }}
                >
                  DEPOSIT BONUS
                </motion.div>
                <motion.div
                  className="flashe-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.4,
                  }}
                >
                  <motion.img
                    src={flasheImage}
                    alt="flash effect"
                    className="flashe-effect"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
              <motion.button
                className="cta-button"
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 14px 28px rgba(255, 187, 4, 0.7)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                  delay: 0.45,
                }}
                onClick={handleClosePopup}
              >
                CLAIM NOW
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
