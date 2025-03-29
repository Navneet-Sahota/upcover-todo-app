import { Alert, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function DuplicateErrorAlert({ message }: { message?: string }) {
  return (
    <Box minHeight={50} sx={{ display: message ? undefined : "none" }}>
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Alert severity="error">{message}</Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
