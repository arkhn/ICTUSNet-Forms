import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import fileDownload from "js-file-download";
import { jsonToCSV } from "react-papaparse";

import { useAppSelector, useAppDispatch } from "state/store";
import {
  createPatientData,
  getPatientsThunk,
  deletePatientEntryThunk,
} from "state/patientFormSlice";

import {
  convertToIctusFormat,
  formatPatientDataForExport,
} from "utils/formUtils";
import { Container, Fab, makeStyles, Paper } from "@material-ui/core";
import TableViewer from "components/TableViewer";
import CSVUploadButton from "components/CSVUploadButton";
import CSVExportButton from "components/CSVExportButton";
import Dialog from "components/Dialog";

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
  const [patientIdsToDelete, setPatientIdsToDelete] = useState<string[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { data, columns } = useAppSelector((state) => ({
    data: state.patientForm.patients,
    columns: state.patientForm.patientColumnData,
  }));

  const onAddPatientClick = () => {
    const newPatient = createPatientData(uuid());
    history.push(`/patient_form`, { patient: newPatient, creation: true });
  };

  const onEditPatient = (patientId: string) => {
    const patient = data.find((item) => item.id === patientId);
    patient && history.push(`/patient_form`, { patient, creation: false });
  };

  const openDialog = (patientId?: string) => {
    if (patientId) {
      setPatientIdsToDelete([patientId]);
    } else {
      setPatientIdsToDelete(selectedRowIds);
    }
    setDialogOpen(true);
  };

  const onDelete = () => {
    dispatch(deletePatientEntryThunk(patientIdsToDelete));
    setSelectedRowIds(
      selectedRowIds.filter((id) => !patientIdsToDelete.includes(id))
    );
    setPatientIdsToDelete([]);
    setDialogOpen(false);
  };

  const exportToCsv = (optionIndex: number) => {
    const selectedPatients = data.filter((item) =>
      selectedRowIds.some((id) => id === item.id)
    );
    let dataToExport: string[][] = [];
    switch (optionIndex) {
      case 0:
        dataToExport = selectedPatients
          .map(formatPatientDataForExport())
          .map((data) => [convertToIctusFormat(data)]);
        break;
      case 1:
        dataToExport = selectedPatients
          .map(formatPatientDataForExport("pseudonymized"))
          .map((data) => [convertToIctusFormat(data)]);
        break;
      case 2:
        dataToExport = selectedPatients
          .map(formatPatientDataForExport("enhanced pseudonymized"))
          .map((data) => [convertToIctusFormat(data)]);
        break;

      default:
        break;
    }
    const csv = jsonToCSV(dataToExport);
    fileDownload(csv, "patientForms.csv");
  };

  useEffect(() => {
    dispatch(getPatientsThunk());
  }, [dispatch]);

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
            onClick={() => openDialog()}
          >
            <Delete />
          </Fab>
        </div>
      </div>
      <Paper style={{ height: 700 }}>
        <TableViewer
          data={data}
          columns={columns}
          onClickDelete={openDialog}
          onClickEdit={onEditPatient}
          onRowSelect={setSelectedRowIds}
          selectedRowIds={selectedRowIds}
        />
      </Paper>
      <Dialog
        open={isDialogOpen}
        title={t("deletePatientsTitle")}
        agreeButtonTitle={t("yes")}
        refuseButtonTitle={t("no")}
        content={t("deletePatientsQuestion")}
        onClose={() => setDialogOpen(false)}
        onAgree={onDelete}
      />
    </Container>
  );
};

export default AVCTableViewer;
