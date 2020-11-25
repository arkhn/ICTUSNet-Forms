import React, { useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import fileDownload from "js-file-download";
import { jsonToCSV } from "react-papaparse";

import { useAppSelector, useAppDispatch } from "state/store";
import {
  createPatientData,
  deletePatientEntry,
  PatientData,
} from "state/patientFormSlice";

import { formatPatientDataForExport } from "utils/formUtils";
import { Container, Fab, makeStyles, Paper } from "@material-ui/core";
import TableViewer from "components/TableViewer";
import CSVUploadButton from "components/CSVUploadButton";
import CSVExportButton from "components/CSVExportButton";

import { Add, Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  redFab: {
    backgroundColor: "#FF7A7B",
    "&:hover": {
      backgroundColor: "#c8494f",
    },
  },
  fab: {
    margin: theme.spacing(2),
    color: "white",
  },
  fabContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const exportOptions = [
  "nominativeExport",
  "pseudonymizedExport",
  "pseudonymizedExportMore",
];

const AVCTableViewer: React.FC<{}> = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const { data, columns } = useAppSelector((state) => ({
    data: state.patientForm.patients,
    columns: state.patientForm.patientColumnData,
  }));

  const onAddPatientClick = () => {
    const newPatient = createPatientData(uuid());
    history.push(`/patient_form`, newPatient);
  };

  const onEditPatient = (patientId: string) => {
    const patient = data.find((item) => item.id === patientId);
    patient && history.push(`/patient_form`, patient);
  };

  const onDeletePatient = (patientId: string) => {
    dispatch(deletePatientEntry([patientId]));
    setSelectedRowIds(selectedRowIds.filter((id) => id !== patientId));
  };

  const onDeleteSelection = () => {
    dispatch(deletePatientEntry(selectedRowIds));
    setSelectedRowIds([]);
  };

  const exportToCsv = (optionIndex: number) => {
    const columns = Object.keys(data[0]).filter((key) => key !== "id");
    const selectedPatients = data.filter((item) =>
      selectedRowIds.some((id) => id === item.id)
    );
    let dataToExport: Partial<
      Record<keyof PatientData, string | number | boolean>
    >[] = [];
    switch (optionIndex) {
      case 0:
        dataToExport = selectedPatients.map(formatPatientDataForExport());
        break;
      case 1:
        dataToExport = selectedPatients.map(
          formatPatientDataForExport("pseudonymized")
        );
        break;
      case 2:
        dataToExport = selectedPatients.map(
          formatPatientDataForExport("enhanced pseudonymized")
        );
        break;

      default:
        break;
    }
    const csv = jsonToCSV(dataToExport, { columns });
    fileDownload(csv, "patientForms.csv");
  };

  return (
    <Container maxWidth="xl">
      <div className={classes.fabContainer}>
        <div className={classes.fabContainer}>
          <CSVUploadButton fabClassName={classes.fab} />
          <Fab
            color="secondary"
            variant="extended"
            className={classes.fab}
            onClick={onAddPatientClick}
          >
            <Add />
            {t("addPatient")}
          </Fab>
        </div>
        <div>
          <CSVExportButton
            disabled={selectedRowIds.length === 0}
            fabClassName={classes.fab}
            buttonOptions={exportOptions}
            onClickExport={exportToCsv}
          />
          <Fab
            className={clsx(classes.fab, classes.redFab)}
            disabled={selectedRowIds.length === 0}
            onClick={onDeleteSelection}
          >
            <Delete />
          </Fab>
        </div>
      </div>
      <Paper style={{ height: 700 }}>
        <TableViewer
          data={data}
          columns={columns}
          onClickDelete={onDeletePatient}
          onClickEdit={onEditPatient}
          onRowSelect={setSelectedRowIds}
          selectedRowIds={selectedRowIds}
        />
      </Paper>
    </Container>
  );
};

export default AVCTableViewer;