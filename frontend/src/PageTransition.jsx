import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.5,
        delay:0.2,
      }}
      
    >
      {children}
    </motion.div>
  );
};
export default PageTransition;
