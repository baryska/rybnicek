"use client";
import { SwipeableDrawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AdventLocation } from "@/data/adventLocations";
import styles from "./adventDrawer.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  location: AdventLocation | undefined;
}

const AdventLocationDrawer = ({
  open,
  onClose,
  onOpen,
  location,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!location) return null;

  return (
    <SwipeableDrawer
      anchor={isMobile ? "bottom" : "left"}
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      transitionDuration={{ enter: 500, exit: 500 }}
      slotProps={{
        paper: {
          sx: {
            width: isMobile ? "100%" : 500,
            maxHeight: "100%",
            overflowY: "auto",
            padding: 3,
          },
        },
      }}
    >
      <div className={styles.dayNumber}>{location.number}</div>
      <h2 className={styles.title}>{location.name}</h2>
      <div className={styles.description}>
        <p>{location.description}</p>
      </div>
    </SwipeableDrawer>
  );
};

export default AdventLocationDrawer;
