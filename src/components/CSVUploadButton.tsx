import React, { useRef } from "react";
import { Fab } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { CSVReader } from "react-papaparse";
import { useAppDispatch } from "state/store";
import { importPatientData } from "state/patientFormSlice";
import { formatPatientDataForImport } from "utils/formUtils";

type CSVUploadButtonProps = {
  fabClassName?: string;
};

const CSVUploadButton: React.FC<CSVUploadButtonProps> = ({ fabClassName }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const buttonRef = useRef<null | CSVReader>(null);

  const handleOnDrop = (data: any[]) => {
    const [columnData, ...dataValues] = data;

    if (!columnData) {
      return;
    }

    const columnDataKeys = columnData.data as string[];
    const values = dataValues.map((item) => item.data as string[]);
    const patientData = values.map((item) => {
      const patient: { [dataKey: string]: string } = {};
      columnDataKeys.forEach((dataKey, index) => {
        patient[dataKey] = item[index];
      });
      return patient;
    });
    const patients = patientData.map(formatPatientDataForImport);
    dispatch(importPatientData(patients));
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
