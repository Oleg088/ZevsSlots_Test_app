import { motion } from "framer-motion";

const Confetti = () => {
  const confettiCount = 70;
  const colors = ["#ffbb04", "#fffb04", "#49a5ff", "#0354ff", "#ffffff", "#ff6b6b", "#4ecdc4"];
  const shapes = ["square", "circle", "triangle"];

  const confettiPieces = Array.from({ length: confettiCount }, (_, i) => {
    const randomScale = 0.7 + Math.random() * 0.6;
    const randomX = (Math.random() - 0.5) * 300;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = 8 + Math.random() * 12;
    return {
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2.5 + Math.random() * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 900,
      initialScale: randomScale,
      randomX: randomX,
      shape: shape,
      size: size,
    };
  });

  return (
    <div className="confetti-container">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className={`confetti-piece confetti-${piece.shape}`}
          style={{
            backgroundColor: piece.shape === "triangle" ? "transparent" : piece.color,
            borderBottomColor: piece.shape === "triangle" ? piece.color : "transparent",
            left: `${piece.left}%`,
            width: piece.shape === "triangle" ? "0" : `${piece.size}px`,
            height: piece.shape === "triangle" ? "0" : `${piece.size}px`,
            borderLeftWidth: piece.shape === "triangle" ? `${piece.size / 2}px` : "0",
            borderRightWidth: piece.shape === "triangle" ? `${piece.size / 2}px` : "0",
            borderBottomWidth: piece.shape === "triangle" ? `${piece.size}px` : "0",
          }}
          initial={{
            y: -150,
            x: 0,
            rotate: piece.rotation,
            opacity: 1,
            scale: piece.initialScale,
          }}
          animate={{
            y: "150vh",
            x: piece.randomX,
            rotate: piece.rotation + piece.rotationSpeed,
            opacity: [1, 1, 1, 0.6, 0],
            scale: [piece.initialScale, piece.initialScale * 0.9, piece.initialScale * 0.7, piece.initialScale * 0.5],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;

