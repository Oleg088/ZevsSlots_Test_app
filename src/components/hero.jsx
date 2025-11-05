import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./header";
import "../styles/hero.css";
import "../styles/slots.css";
import zevsImage from "../assets/backgrounds/zevs.png";
import flasheImage from "../assets/ui/flashe.png";
import Slots from "./slots";

const Hero = () => {
  const [showWinPopup, setShowWinPopup] = useState(false);

  return (
    <div className="hero">
      <Header />
      <div className="zeus-container">
        <img className="zeus-image" src={zevsImage} alt="Zeus character" />
      </div>
      <Slots onWin={() => setShowWinPopup(true)} />
      <AnimatePresence>
        {showWinPopup && (
          <motion.div
            className="win-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <motion.div
              className="win-popup-wrapper"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.3,
              }}
            >
              <motion.div
                className="win-badge"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 600,
                  damping: 25,
                }}
              >
                BET<span className="highlight">AND</span>YOU
              </motion.div>
              <motion.div
                className="win-popup"
                initial={{ scale: 0.8, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 10, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              >
                <motion.div
                  className="win-title"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                >
                  YOU WIN!
                </motion.div>
                <motion.div
                  className="win-percent"
                  initial={{ scale: 0, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                >
                  450%
                </motion.div>
                <motion.div
                  className="win-subtitle"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                >
                  DEPOSIT BONUS
                </motion.div>
                <motion.div
                  className="flashe-container"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
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
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 14px 28px rgba(255, 187, 4, 0.7)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                }}
                onClick={() => setShowWinPopup(false)}
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
