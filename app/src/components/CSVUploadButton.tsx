import React, { useRef } from "react";
import { Fab } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { CSVReader } from "react-papaparse";
import { useAppDispatch } from "state/store";
import { PatientData, setPatientEntriesThunk } from "state/patientFormSlice";
import { formatPatientDataForImport, parseIctusFormat } from "utils/formUtils";

type CSVUploadButtonProps = {
  fabClassName?: string;
};

const CSVUploadButton: React.FC<CSVUploadButtonProps> = ({ fabClassName }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const buttonRef = useRef<null | CSVReader>(null);

  const handleOnDrop = (rows: any[]) => {
    const rowsData = rows.map((item) => item.data as string[]);

    const patientData = rowsData.reduce(
      (acc: Record<keyof PatientData, string>[], row, index) => {
        try {
          return [...acc, parseIctusFormat(row)];
        } catch (error) {
          console.error(`${error} in line ${index + 1} of uploaded csv`);
          return acc;
        }
      },
      []
    );
    const patients = patientData.map(formatPatientDataForImport);
    dispatch(setPatientEntriesThunk(patients));
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
  );
};

export default CSVUploadButton;
