"use client";
import { SwipeableDrawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ForestStation, ForestTask } from "@/data/forestLocations";
import Image from "next/image";
import styles from "./forestDrawer.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  station: ForestStation | undefined;
  collectedLetters: Record<number, string>;
  onLetterSave: (taskNumber: number, letter: string) => void;
}

const ForestLocationDrawer = ({
  open,
  onClose,
  onOpen,
  station,
  collectedLetters,
  onLetterSave,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!station) return null;

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
            width: isMobile ? "100%" : 520,
            maxHeight: isMobile ? "90vh" : "100%",
            overflowY: "auto",
            padding: 3,
            backgroundColor: "white",
          },
        },
      }}
    >
      <div className={styles.stationNumber}>{station.number}</div>
      <h2 className={styles.title}>{station.name}</h2>
      <a
        href={`https://mapy.cz/turisticka?y=${station.position[0]}&x=${station.position[1]}&z=18`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.coordinates}
        style={{ display: "block", textDecoration: "underline", cursor: "pointer" }}
      >
        {station.coordinatesDisplay} ↗
      </a>

      {station.intro && (
        <div className={styles.stationIntro}>{station.intro}</div>
      )}

      {station.tasks.map((task) => (
        <TaskBlock
          key={task.taskNumber}
          task={task}
          selectedLetter={collectedLetters[task.taskNumber] || ""}
          onSelect={(letter) => onLetterSave(task.taskNumber, letter)}
        />
      ))}
    </SwipeableDrawer>
  );
};

function TaskBlock({
  task,
  selectedLetter,
  onSelect,
}: {
  task: ForestTask;
  selectedLetter: string;
  onSelect: (letter: string) => void;
}) {
  return (
    <div className={styles.taskSection}>
      <div className={styles.taskHeader}>
        <div className={styles.taskBadge}>{task.taskNumber}</div>
        <div className={styles.taskLabel}>Úkol č. {task.taskNumber} (písmeno zapiš na pozici {task.taskNumber})</div>
      </div>

      <p className={styles.question}>{task.question}</p>

      {task.hasImage && (
        task.imageUrl ? (
          (Array.isArray(task.imageUrl) ? task.imageUrl : [task.imageUrl]).map((url, i) => (
            <Image
              key={i}
              src={url}
              alt={`Obrázek k úkolu ${task.taskNumber}`}
              width={600}
              height={400}
              className={styles.taskImage}
              style={{ objectFit: 'cover' }}
            />
          ))
        ) : (
          <div className={styles.imagePlaceholder}>
            <div className={styles.imagePlaceholderIcon}>🖼️</div>
            <div className={styles.imagePlaceholderText}>Obrázek bude doplněn</div>
          </div>
        )
      )}

      <div className={styles.optionsContainer}>
        {task.options.map((option, idx) => {
          const isSelected = selectedLetter === option.letter;
          return (
            <div
              key={idx}
              className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ''}`}
              onClick={() => onSelect(option.letter)}
            >
              <div className={`${styles.optionRadio} ${isSelected ? styles.optionRadioSelected : ''}`}>
                {isSelected && <div className={styles.optionRadioDot} />}
              </div>
              <div className={styles.optionText}>
                {idx + 1}. {option.text}
              </div>
              <div className={styles.optionLetter}>({option.letter})</div>
            </div>
          );
        })}
      </div>

      {selectedLetter && (
        <div className={styles.savedConfirm}>
          ✅ Písmeno <strong>{selectedLetter}</strong> uloženo na pozici {task.taskNumber}
        </div>
      )}

      {task.description && (
        <div className={styles.descriptionBlock}>
          <p className={styles.taskDescription}>{task.description}</p>
          {task.descriptionImageUrl && (
            <Image
              src={task.descriptionImageUrl}
              alt={`Obrázek k úkolu ${task.taskNumber}`}
              width={600}
              height={400}
              className={styles.taskImage}
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ForestLocationDrawer;
