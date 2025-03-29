import { TextField, TextFieldProps } from "@mui/material";
import { motion } from "framer-motion";

type Props = TextFieldProps & {
  hasError?: boolean;
};

export default function AnimatedTextField({ hasError, ...rest }: Props) {
  return (
    <motion.div
      animate={{ x: hasError ? [0, -8, 8, -8, 8, 0] : 0 }}
      transition={{ duration: 0.3 }}
    >
      <TextField {...rest} />
    </motion.div>
  );
}
