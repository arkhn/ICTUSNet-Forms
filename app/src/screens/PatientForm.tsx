import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "state/store";
import {
  PatientData,
  setPatientEntriesThunk,
  editPatientEntryThunk,
} from "state/patientFormSlice";
import { useTranslation } from "react-i18next";
import { SubmitHandler } from "react-hook-form";
import { FormBuilder } from "@arkhn/ui";
import patientFormInputProperties from "utils/patientFormInputProperties";
import { Container, Button } from "@material-ui/core";

const PatientForm: React.FC<{}> = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const location = useLocation<{ patient: PatientData; creation: boolean }>();
  const { patient, creation } = location.state;

  const onSubmit: SubmitHandler<PatientData> = (data) => {
    if (creation) {
      dispatch(setPatientEntriesThunk([{ ...data, id: patient.id }]));
    } else {
      dispatch(editPatientEntryThunk({ ...data, id: patient.id }));
    }
    history.push("/avc_viewer");
  };

  return (
    <Container maxWidth="sm">
      <FormBuilder<PatientData>
        submit={onSubmit}
        title={t("patientForm")}
        defaultValues={patient}
        formId="patient-form"
        mode={"onChange"}
        properties={patientFormInputProperties(t)}
      />
      <Button type="submit" form="patient-form" fullWidth>
        {t("submit")}
      </Button>
    </Container>
  );
};

export default PatientForm;
