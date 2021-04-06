import React, { useRef, useState } from "react";

import {
  Button,
  Fab,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { GetApp } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { CSVReader } from "react-papaparse";

import { useAppDispatch } from "state/store";
import { PatientData, setPatientEntriesThunk } from "state/patientFormSlice";
import { formatPatientDataForImport, parseIctusFormat } from "utils/formUtils";

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBlock: theme.spacing(1),
  },
}));

type CSVUploadButtonProps = {
  fabClassName?: string;
};

const CSVUploadButton: React.FC<CSVUploadButtonProps> = ({ fabClassName }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const buttonRef = useRef<null | CSVReader>(null);
  const [errors, setErrors] = useState<string[] | null>(null);
  const isReportDialogOpen = !!errors;

  const handleOnDrop = (
    rows: { data: string[]; meta: { delimiter: string } }[]
  ) => {
    const errors: string[] = [];

    const patientData = rows.reduce(
      (acc: Record<keyof PatientData, string>[], row, index) => {
        const { data, meta } = row;
        const isRightDelimiter = meta.delimiter === "|";
        try {
          return [
            ...acc,
            parseIctusFormat(isRightDelimiter ? data : data[0].split("|")),
          ];
        } catch (error) {
          errors.push(`Line ${index + 1} : ${error.message}`);
          return acc;
        }
      },
      []
    );
    const patients = patientData.map(formatPatientDataForImport);
    dispatch(setPatientEntriesThunk(patients));

    if (errors.length > 0) {
      setErrors(errors);
    }
  };

  const handleCloseReportDialog = () => {
    setErrors(null);
  };

  const handleOnError = (...params: any) => {};

  const handleOnRemoveFile = (...params: any) => {};

  const handleOpenDialog = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (buttonRef.current) {
      buttonRef.current.open(event);
    }
  };

  return (
    <>
      <CSVReader
        ref={buttonRef}
        onFileLoad={handleOnDrop}
        onError={handleOnError}
        noClick
        noDrag
        config={{}}
        style={{}}
        noProgressBar
        onRemoveFile={handleOnRemoveFile}
      >
        {() => (
          <Fab
            color="secondary"
            variant="extended"
            className={fabClassName}
            onClick={handleOpenDialog}
          >
            <GetApp />
            {t("importCsv")}
          </Fab>
        )}
      </CSVReader>
      <Dialog
        open={isReportDialogOpen}
        scroll="paper"
        onClose={handleCloseReportDialog}
      >
        <DialogTitle>{t("importErrorsHaveOccured")}</DialogTitle>
        <DialogContent dividers>
          {errors &&
            errors.map((error, index) => (
              <Alert key={index} severity="error" className={classes.alert}>
                {error}
              </Alert>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReportDialog}>{t("close")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CSVUploadButton;
