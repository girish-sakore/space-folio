import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SuccessAnimation({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center max-w-md mx-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        >
          <CheckCircleIcon className="text-teal-500 text-6xl mb-4" />
        </motion.div>
        
        <motion.h3
          className="text-2xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Thank You!
        </motion.h3>
        
        <motion.p
          className="text-slate-300 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          We've received your project details and will get back to you within 24 hours with a custom proposal.
        </motion.p>
        
        <motion.button
          className="btn-primary"
          onClick={onComplete}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Done
        </motion.button>
      </motion.div>
    </motion.div>
  );
}