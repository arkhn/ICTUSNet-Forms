import React, { useRef } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Fab,
  InputAdornment,
} from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "state/store";
import {
  PatientData,
  setPatientEntry,
  editPatientEntryThunk,
  setPatientEntriesThunk,
} from "state/patientFormSlice";

import DateInput from "components/inputCards/DateInput";
import TextInput from "components/inputCards/TextInput";
import SwitchInput from "components/inputCards/SwitchInput";
import SelectInput from "components/inputCards/SelectInput";
import MultiSelectInput from "components/inputCards/MultiSelectInput";
import {
  IdRegionEnum,
  PatientSex,
  Comorbilities,
  RiskFactors,
  AnticoagulationType,
  AntiplateletType,
  AVCDiagnostic,
  ImagingType,
  AffectedVesselType,
  EVTModalityType,
  StentType,
  ReperfusionTreatmentType,
  ThrombolyticTreatmentType,
  mTICIScore,
} from "utils/enums";
import {
  dateIsValid,
  dateNotInFuture,
  conditionalRequiredDate,
} from "utils/validate";

const PatientForm: React.FC<{}> = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const location = useLocation<{ patient: PatientData; creation: boolean }>();
  const { patient, creation } = location.state;
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    watch,
    trigger,
    control,
  } = useForm<PatientData>({
    defaultValues: patient,
    mode: "all",
  });

  const regionIdRef = useRef<HTMLSelectElement | null>(null);
  const patientSexRef = useRef<HTMLSelectElement | null>(null);
  const comorbilitiesRef = useRef<HTMLSelectElement | null>(null);
  const riskFactorsRef = useRef<HTMLSelectElement | null>(null);
  const anticoagulationTypeRef = useRef<HTMLSelectElement | null>(null);
  const antiplateletTypeRef = useRef<HTMLSelectElement | null>(null);
  const diagnosticRef = useRef<HTMLSelectElement | null>(null);
  const affectedVesselsRef = useRef<HTMLSelectElement | null>(null);
  const thrombolyticTreatmentTypeRef = useRef<HTMLSelectElement | null>(null);
  const administeredReperfusionTreatmentRef = useRef<HTMLSelectElement | null>(
    null
  );
  const firstImagingTypeRef = useRef<HTMLSelectElement | null>(null);
  const followingImagingRef = useRef<HTMLSelectElement | null>(null);
  const arteriographyAffectedVesselRef = useRef<HTMLSelectElement | null>(null);
  const initialmTiciScoreRef = useRef<HTMLSelectElement | null>(null);
  const EVTModalityRef = useRef<HTMLSelectElement | null>(null);
  const stentRef = useRef<HTMLSelectElement | null>(null);
  const finalmTICIScoreRef = useRef<HTMLSelectElement | null>(null);

  if (!patient) {
    history.push("/avc_viewer");
    return null;
  }

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h4">{t("patientForm")}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <TextInput
              title={t("firstName")}
              name="firstName"
              inputRef={register}
              error={undefined !== errors.firstName}
              helperText={errors.firstName && errors.firstName.message}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("lastName")}
              name="lastName"
              inputRef={register}
              error={undefined !== errors.lastName}
              helperText={errors.lastName && errors.lastName.message}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("IPP")}
              name="IPP"
              inputRef={register}
              error={undefined !== errors.IPP}
              helperText={errors.IPP && errors.IPP.message}
            />
          </Grid>

          <Grid item>
            <Controller
              name="regionId"
              control={control}
              onFocus={() => {
                regionIdRef.current?.focus();
              }}
              rules={{ required: { value: true, message: t("requiredField") } }}
              render={({ onChange, value, name }) => (
                <SelectInput
                  title={t(name)}
                  //@ts-ignore
                  inputRef={regionIdRef}
                  value={value ?? ""}
                  defaultValue=""
                  onChange={onChange}
                  error={undefined !== errors.regionId}
                  helperText={errors.regionId && errors.regionId.message}
                  options={Object.keys(IdRegionEnum).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <SwitchInput
              title={t("areaResident")}
              inputRef={register}
              name="areaResident"
              falseLabel={t("no")}
              trueLabel={t("yes")}
              checked={watch().areaResident ?? false}
              onChange={(e, checked) => setValue("areaResident", checked)}
            />
          </Grid>
          <Grid item>
            <Controller
              name="sex"
              control={control}
              onFocus={() => {
                patientSexRef.current?.focus();
              }}
              rules={{ required: { value: true, message: t("requiredField") } }}
              render={({ onChange, value, name }) => (
                <SelectInput
                  title={t(name)}
                  //@ts-ignore
                  inputRef={patientSexRef}
                  value={value ?? ""}
                  defaultValue=""
                  onChange={onChange}
                  error={undefined !== errors.sex}
                  helperText={errors.sex && errors.sex.message}
                  options={Object.keys(PatientSex).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("age")}
              name="age"
              type="number"
              inputRef={register({
                required: { value: true, message: t("requiredField") },
                min: { value: 0, message: t("noNegativeNumber") },
                pattern: {
                  value: /^\d+$/,
                  message: t("noDecimalValue"),
                },
              })}
              error={undefined !== errors.age}
              helperText={errors.age && errors.age.message}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("previousMRS")}
              name="previousMRS"
              type="number"
              inputRef={register({
                min: { value: 0, message: t("noNegativeNumber") },
                max: { value: 5, message: t("noMoreThan", { max: 5 }) },
                pattern: {
                  value: /^\d+$/,
                  message: t("noDecimalValue"),
                },
              })}
              error={undefined !== errors.previousMRS}
              helperText={errors.previousMRS && errors.previousMRS.message}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="comorbilities"
              onFocus={() => {
                comorbilitiesRef.current?.focus();
              }}
              rules={{
                required: { value: true, message: t("requiredField") },
              }}
              render={({ onChange, value, name }) => (
                <MultiSelectInput
                  title={t(name)}
                  value={value ?? []}
                  //@ts-ignore
                  inputRef={comorbilitiesRef}
                  defaultSelectedValue={Comorbilities.none}
                  onChangeValues={onChange}
                  error={undefined !== errors.comorbilities}
                  helperText={
                    errors.comorbilities && errors.comorbilities.message
                  }
                  options={Object.keys(Comorbilities).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="riskFactor"
              onFocus={() => {
                riskFactorsRef.current?.focus();
              }}
              rules={{
                required: { value: true, message: t("requiredField") },
              }}
              render={({ onChange, value, name }) => (
                <MultiSelectInput
                  title={t(name)}
                  value={value ?? []}
                  //@ts-ignore
                  inputRef={riskFactorsRef}
                  defaultSelectedValue={RiskFactors.none}
                  onChangeValues={onChange}
                  error={undefined !== errors.riskFactor}
                  helperText={errors.riskFactor && errors.riskFactor.message}
                  options={Object.keys(RiskFactors).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("diastolicBloodPressure")}
              name="diastolicBloodPressure"
              type="number"
              inputRef={register({
                required: { value: true, message: t("requiredField") },
                min: { value: 0, message: t("noNegativeNumber") },
                pattern: {
                  value: /^\d+$/,
                  message: t("noDecimalValue"),
                },
              })}
              error={undefined !== errors.diastolicBloodPressure}
              helperText={
                errors.diastolicBloodPressure &&
                errors.diastolicBloodPressure.message
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mmHg</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("systolicBloodPressure")}
              name="systolicBloodPressure"
              type="number"
              inputRef={register({
                required: { value: true, message: t("requiredField") },
                min: { value: 0, message: t("noNegativeNumber") },
                pattern: {
                  value: /^\d+$/,
                  message: t("noDecimalValue"),
                },
              })}
              error={undefined !== errors.systolicBloodPressure}
              helperText={
                errors.systolicBloodPressure &&
                errors.systolicBloodPressure.message
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mmHg</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("bloodGlucose")}
              name="bloodGlucose"
              type="number"
              inputRef={register({
                required: { value: true, message: t("requiredField") },
                min: { value: 0, message: t("noNegativeNumber") },
                pattern: {
                  value: /^\d+$/,
                  message: t("noDecimalValue"),
                },
              })}
              error={undefined !== errors.bloodGlucose}
              helperText={errors.bloodGlucose && errors.bloodGlucose.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mg/dl</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("INR")}
              name="INR"
              type="number"
              inputRef={register({
                min: { value: 0, message: t("noNegativeNumber") },
              })}
              error={undefined !== errors.INR}
              helperText={errors.INR && errors.INR.message}
            />
          </Grid>
          <Grid item>
            <SwitchInput
              title={t("priorAnticoagulationTherapy")}
              inputRef={register}
              name="priorAnticoagulationTherapy"
              falseLabel={t("no")}
              trueLabel={t("yes")}
              checked={watch().priorAnticoagulationTherapy ?? false}
              onChange={(e, checked) => {
                setValue("priorAnticoagulationTherapy", checked);
                trigger("anticoagulationType");
                if (!checked) {
                  setValue("anticoagulationType", [], { shouldValidate: true });
                }
              }}
            />
            <Controller
              control={control}
              name="anticoagulationType"
              onFocus={() => {
                anticoagulationTypeRef.current?.focus();
              }}
              rules={{
                validate: {
                  notEmpty: (values: AnticoagulationType[] | null) => {
                    const isValid =
                      !watch().priorAnticoagulationTherapy ||
                      (values && values.length > 0);
                    return isValid || (t("requiredField") as string);
                  },
                },
              }}
              render={({ onChange, value, name }) => (
                <MultiSelectInput
                  disabled={!watch("priorAnticoagulationTherapy")}
                  title={t(name)}
                  value={value ?? []}
                  //@ts-ignore
                  inputRef={anticoagulationTypeRef}
                  onChangeValues={onChange}
                  error={undefined !== errors.anticoagulationType}
                  helperText={
                    errors.anticoagulationType &&
                    errors.anticoagulationType.message
                  }
                  options={Object.keys(AnticoagulationType).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <SwitchInput
              title={t("priorAntiplateletTherapy")}
              inputRef={register}
              name="priorAntiplateletTherapy"
              falseLabel={t("no")}
              trueLabel={t("yes")}
              checked={watch().priorAntiplateletTherapy ?? false}
              onChange={(e, checked) => {
                setValue("priorAntiplateletTherapy", checked);
                trigger("antiplateletType");
                if (!checked) {
                  setValue("antiplateletType", [], { shouldValidate: true });
                }
              }}
            />
            <Controller
              control={control}
              name="antiplateletType"
              onFocus={() => {
                antiplateletTypeRef.current?.focus();
              }}
              rules={{
                validate: {
                  notEmpty: (values: AntiplateletType[] | null) => {
                    const isValid =
                      !watch("priorAntiplateletTherapy") ||
                      (values && values.length > 0);
                    return isValid || (t("requiredField") as string);
                  },
                },
              }}
              render={({ onChange, value, name }) => (
                <MultiSelectInput
                  disabled={!watch("priorAntiplateletTherapy")}
                  title={t(name)}
                  value={value ?? []}
                  //@ts-ignore
                  inputRef={antiplateletTypeRef}
                  onChangeValues={onChange}
                  error={undefined !== errors.antiplateletType}
                  helperText={
                    errors.antiplateletType && errors.antiplateletType.message
                  }
                  options={Object.keys(AntiplateletType).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="symptomsOnsetDate"
              render={({ ...props }) => (
                <DateInput
                  {...props}
                  error={undefined !== errors.symptomsOnsetDate}
                  helperText={
                    errors.symptomsOnsetDate && errors.symptomsOnsetDate.message
                  }
                />
              )}
              rules={{
                validate: {
                  dateIsValid: dateIsValid(t),
                  dateIsNotInFuture: dateNotInFuture(t),
                },
              }}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="hospitalArrivalDate"
              render={({ ...props }) => (
                <DateInput
                  {...props}
                  error={undefined !== errors.hospitalArrivalDate}
                  helperText={
                    errors.hospitalArrivalDate &&
                    errors.hospitalArrivalDate.message
                  }
                />
              )}
              rules={{
                validate: {
                  dateIsValid: dateIsValid(t),
                  dateIsNotInFuture: dateNotInFuture(t),
                },
              }}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("initialNIHSS")}
              name="initialNIHSS"
              type="number"
              inputRef={register({
                min: { value: 0, message: t("noNegativeNumber") },
                max: { value: 42, message: t("noMoreThan", { max: 42 }) },
                pattern: {
                  value: /^\d+$/,
                  message: t("noDecimalValue"),
                },
              })}
              error={undefined !== errors.initialNIHSS}
              helperText={errors.initialNIHSS && errors.initialNIHSS.message}
            />
          </Grid>
          <Grid item>
            <Controller
              name="diagnostic"
              control={control}
              onFocus={() => {
                diagnosticRef.current?.focus();
              }}
              rules={{ required: { value: true, message: t("requiredField") } }}
              render={({ onChange, value, name }) => (
                <SelectInput
                  title={t(name)}
                  //@ts-ignore
                  inputRef={diagnosticRef}
                  value={value ?? ""}
                  defaultValue=""
                  onChange={onChange}
                  error={undefined !== errors.diagnostic}
                  helperText={errors.diagnostic && errors.diagnostic.message}
                  options={Object.keys(AVCDiagnostic).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="firstImagingType"
              onFocus={() => {
                firstImagingTypeRef.current?.focus();
              }}
              rules={{
                required: { value: true, message: t("requiredField") },
              }}
              render={({ onChange, value, name }) => (
                <MultiSelectInput
                  title={t(name)}
                  value={value ?? []}
                  //@ts-ignore
                  inputRef={firstImagingTypeRef}
                  defaultSelectedValue={ImagingType.notPerformed}
                  onChangeValues={(...props) => {
                    onChange(...props);
                    trigger("firstImagingDate");
                  }}
                  error={undefined !== errors.firstImagingType}
                  helperText={
                    errors.firstImagingType && errors.firstImagingType.message
                  }
                  options={Object.keys(ImagingType).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="firstImagingDate"
              render={({ ...props }) => (
                <DateInput
                  {...props}
                  disabled={watch("firstImagingType")?.includes(
                    ImagingType.notPerformed
                  )}
                  error={undefined !== errors.firstImagingDate}
                  helperText={
                    errors.firstImagingDate && errors.firstImagingDate.message
                  }
                />
              )}
              rules={{
                validate: {
                  dateIsValid: dateIsValid(t),
                  dateIsNotInFuture: dateNotInFuture(t),
                  conditionalRequiredDate: (props) =>
                    conditionalRequiredDate(
                      t,
                      watch("firstImagingType")?.includes(
                        ImagingType.notPerformed
                      ) ?? true
                    )(props),
                },
              }}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("firstImagingASPECTSScore")}
              name="firstImagingASPECTSScore"
              type="number"
              disabled={watch("firstImagingType")?.includes(
                ImagingType.notPerformed
              )}
              inputRef={register({
                min: { value: 0, message: t("noNegativeNumber") },
                max: { value: 10, message: t("noMoreThan", { max: 10 }) },
                pattern: {
                  value: /^\d+$/,
                  message: t("noDecimalValue"),
                },
              })}
              error={undefined !== errors.firstImagingASPECTSScore}
              helperText={
                errors.firstImagingASPECTSScore &&
                errors.firstImagingASPECTSScore.message
              }
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="affectedVessels"
              onFocus={() => {
                affectedVesselsRef.current?.focus();
              }}
              rules={{
                required: { value: true, message: t("requiredField") },
              }}
              render={({ onChange, value, name }) => (
                <MultiSelectInput
                  title={t(name)}
                  value={value ?? []}
                  //@ts-ignore
                  inputRef={affectedVesselsRef}
                  defaultSelectedValue={AffectedVesselType.none}
                  onChangeValues={onChange}
                  error={undefined !== errors.affectedVessels}
                  helperText={
                    errors.affectedVessels && errors.affectedVessels.message
                  }
                  options={Object.keys(AffectedVesselType).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="administeredReperfusionTreatment"
              onFocus={() => {
                administeredReperfusionTreatmentRef.current?.focus();
              }}
              rules={{
                required: { value: true, message: t("requiredField") },
              }}
              render={({ onChange, value, name }) => (
                <MultiSelectInput
                  title={t(name)}
                  value={value ?? []}
                  //@ts-ignore
                  inputRef={administeredReperfusionTreatmentRef}
                  onChangeValues={(args) => {
                    onChange(args);
                    trigger("thrombolyticTreatmentType");
                  }}
                  error={undefined !== errors.administeredReperfusionTreatment}
                  helperText={
                    errors.administeredReperfusionTreatment &&
                    errors.administeredReperfusionTreatment.message
                  }
                  options={Object.keys(ReperfusionTreatmentType).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="IVThrombolysisDate"
              render={({ ...props }) => (
                <DateInput
                  {...props}
                  error={undefined !== errors.IVThrombolysisDate}
                  helperText={
                    errors.IVThrombolysisDate &&
                    errors.IVThrombolysisDate.message
                  }
                />
              )}
              rules={{
                validate: {
                  dateIsValid: dateIsValid(t),
                  dateIsNotInFuture: dateNotInFuture(t),
                },
              }}
            />
          </Grid>
          <Grid item>
            <Controller
              name="thrombolyticTreatmentType"
              control={control}
              onFocus={() => {
                thrombolyticTreatmentTypeRef.current?.focus();
              }}
              rules={{
                validate: {
                  required: (value: ThrombolyticTreatmentType | null) =>
                    (undefined || null) !== value ||
                    !watch("administeredReperfusionTreatment")?.some(
                      (type) =>
                        type ===
                        ReperfusionTreatmentType.cerebralArteryThrombolysisByIntravenousInfusion
                    ) ||
                    (t("requiredField") as string),
                },
              }}
              render={({ onChange, value, name }) => (
                <SelectInput
                  title={t(name)}
                  //@ts-ignore
                  inputRef={thrombolyticTreatmentTypeRef}
                  value={value ?? ""}
                  defaultValue=""
                  onChange={onChange}
                  error={undefined !== errors.thrombolyticTreatmentType}
                  helperText={
                    errors.thrombolyticTreatmentType &&
                    errors.thrombolyticTreatmentType.message
                  }
                  options={Object.keys(ThrombolyticTreatmentType).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <SwitchInput
              title={t("EVTTransfert")}
              inputRef={register}
              name="EVTTransfert"
              falseLabel={t("no")}
              trueLabel={t("yes")}
              checked={watch().EVTTransfert ?? false}
              onChange={(e, checked) => setValue("EVTTransfert", checked)}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="OtherEVTCenterDate"
              render={({ ...props }) => (
                <DateInput
                  {...props}
                  disabled={!watch().EVTTransfert}
                  error={undefined !== errors.OtherEVTCenterDate}
                  helperText={
                    errors.OtherEVTCenterDate &&
                    errors.OtherEVTCenterDate.message
                  }
                />
              )}
              rules={{
                validate: {
                  dateIsValid: dateIsValid(t),
                  dateIsNotInFuture: dateNotInFuture(t),
                },
              }}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="followingImaging"
              onFocus={() => {
                followingImagingRef.current?.focus();
              }}
              rules={{
                required: { value: true, message: t("requiredField") },
              }}
              render={({ onChange, value, name }) => (
                <MultiSelectInput
                  title={t(name)}
                  value={value ?? []}
                  //@ts-ignore
                  inputRef={followingImagingRef}
                  defaultSelectedValue={ImagingType.notPerformed}
                  onChangeValues={(args) => {
                    onChange(args);
                    trigger("followingImagingDate");
                  }}
                  error={undefined !== errors.followingImaging}
                  helperText={
                    errors.followingImaging && errors.followingImaging.message
                  }
                  options={Object.keys(ImagingType).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="followingImagingDate"
              render={({ ...props }) => (
                <DateInput
                  {...props}
                  disabled={watch("followingImaging")?.includes(
                    ImagingType.notPerformed
                  )}
                  error={undefined !== errors.followingImagingDate}
                  helperText={
                    errors.followingImagingDate &&
                    errors.followingImagingDate.message
                  }
                />
              )}
              rules={{
                validate: {
                  dateIsValid: dateIsValid(t),
                  dateIsNotInFuture: dateNotInFuture(t),
                  conditionalRequiredDate: (props) =>
                    conditionalRequiredDate(
                      t,
                      watch("followingImaging")?.includes(
                        ImagingType.notPerformed
                      ) ?? true
                    )(props),
                },
              }}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("followingImagingASPECTSScore")}
              name="followingImagingASPECTSScore"
              type="number"
              disabled={watch("followingImaging")?.includes(
                ImagingType.notPerformed
              )}
              inputRef={register({
                min: { value: 0, message: t("noNegativeNumber") },
                max: { value: 10, message: t("noMoreThan", { max: 10 }) },
                pattern: {
                  value: /^\d+$/,
                  message: t("noDecimalValue"),
                },
              })}
              error={undefined !== errors.followingImagingASPECTSScore}
              helperText={
                errors.followingImagingASPECTSScore &&
                errors.followingImagingASPECTSScore.message
              }
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("NIHSSPrearteriography")}
              name="NIHSSPrearteriography"
              type="number"
              inputRef={register({
                min: { value: 0, message: t("noNegativeNumber") },
                max: { value: 42, message: t("noMoreThan", { max: 42 }) },
                pattern: {
                  value: /^\d+$/,
                  message: t("noDecimalValue"),
                },
              })}
              error={undefined !== errors.NIHSSPrearteriography}
              helperText={
                errors.NIHSSPrearteriography &&
                errors.NIHSSPrearteriography.message
              }
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="arterialPunctureDate"
              render={({ ...props }) => (
                <DateInput
                  {...props}
                  error={undefined !== errors.arterialPunctureDate}
                  helperText={
                    errors.arterialPunctureDate &&
                    errors.arterialPunctureDate.message
                  }
                />
              )}
              rules={{
                validate: {
                  dateIsValid: dateIsValid(t),
                  dateIsNotInFuture: dateNotInFuture(t),
                },
              }}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="arteriographyAffectedVessel"
              onFocus={() => {
                arteriographyAffectedVesselRef.current?.focus();
              }}
              rules={{
                required: { value: true, message: t("requiredField") },
              }}
              render={({ onChange, value, name }) => (
                <MultiSelectInput
                  title={t(name)}
                  value={value ?? []}
                  //@ts-ignore
                  inputRef={arteriographyAffectedVesselRef}
                  defaultSelectedValue={AffectedVesselType.none}
                  onChangeValues={(args) => {
                    onChange(args);
                    trigger("followingImagingDate");
                  }}
                  error={undefined !== errors.arteriographyAffectedVessel}
                  helperText={
                    errors.arteriographyAffectedVessel &&
                    errors.arteriographyAffectedVessel.message
                  }
                  options={Object.keys(AffectedVesselType).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="initialmTiciScore"
              control={control}
              onFocus={() => {
                initialmTiciScoreRef.current?.focus();
              }}
              rules={{ required: { value: true, message: t("requiredField") } }}
              render={({ onChange, value, name }) => (
                <SelectInput
                  title={t(name)}
                  //@ts-ignore
                  inputRef={initialmTiciScoreRef}
                  value={value ?? ""}
                  defaultValue=""
                  onChange={onChange}
                  error={undefined !== errors.initialmTiciScore}
                  helperText={
                    errors.initialmTiciScore && errors.initialmTiciScore.message
                  }
                  options={Object.values(mTICIScore).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="EVTModality"
              control={control}
              onFocus={() => {
                EVTModalityRef.current?.focus();
              }}
              rules={{ required: { value: true, message: t("requiredField") } }}
              render={({ onChange, value, name }) => (
                <SelectInput
                  title={t(name)}
                  //@ts-ignore
                  inputRef={EVTModalityRef}
                  value={value ?? ""}
                  defaultValue=""
                  onChange={onChange}
                  error={undefined !== errors.EVTModality}
                  helperText={errors.EVTModality && errors.EVTModality.message}
                  options={Object.keys(EVTModalityType).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("deviceModel")}
              name="deviceModel"
              type="text"
              inputRef={register()}
              error={undefined !== errors.deviceModel}
              helperText={errors.deviceModel && errors.deviceModel.message}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("numberOfPasses")}
              name="numberOfPasses"
              type="number"
              inputRef={register({
                min: { value: 0, message: t("noNegativeNumber") },
                pattern: {
                  value: /^\d+$/,
                  message: t("noDecimalValue"),
                },
              })}
              error={undefined !== errors.numberOfPasses}
              helperText={
                errors.numberOfPasses && errors.numberOfPasses.message
              }
            />
          </Grid>
          <Grid item>
            <SwitchInput
              title={t("balloonUse")}
              inputRef={register}
              name="balloonUse"
              falseLabel={t("no")}
              trueLabel={t("yes")}
              checked={watch().balloonUse ?? false}
              onChange={(e, checked) => setValue("balloonUse", checked)}
            />
          </Grid>
          <Grid item>
            <Controller
              name="stent"
              control={control}
              onFocus={() => {
                stentRef.current?.focus();
              }}
              rules={{ required: { value: true, message: t("requiredField") } }}
              render={({ onChange, value, name }) => (
                <SelectInput
                  title={t(name)}
                  //@ts-ignore
                  inputRef={stentRef}
                  value={value ?? ""}
                  defaultValue=""
                  onChange={onChange}
                  error={undefined !== errors.stent}
                  helperText={errors.stent && errors.stent.message}
                  options={Object.keys(StentType).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <SwitchInput
              title={t("newTerritoriesEmbolization")}
              inputRef={register}
              name="newTerritoriesEmbolization"
              falseLabel={t("no")}
              trueLabel={t("yes")}
              checked={watch().newTerritoriesEmbolization ?? false}
              onChange={(e, checked) =>
                setValue("newTerritoriesEmbolization", checked)
              }
            />
          </Grid>
          <Grid item>
            <Controller
              name="finalmTICIScore"
              control={control}
              onFocus={() => {
                finalmTICIScoreRef.current?.focus();
              }}
              rules={{ required: { value: true, message: t("requiredField") } }}
              render={({ onChange, value, name }) => (
                <SelectInput
                  title={t(name)}
                  //@ts-ignore
                  inputRef={finalmTICIScoreRef}
                  value={value ?? ""}
                  defaultValue=""
                  onChange={onChange}
                  error={undefined !== errors.finalmTICIScore}
                  helperText={
                    errors.finalmTICIScore && errors.finalmTICIScore.message
                  }
                  options={Object.values(mTICIScore).map((id) => ({
                    id,
                    label: id,
                  }))}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="revascularizationOrEOPDate"
              render={({ ...props }) => (
                <DateInput
                  {...props}
                  error={undefined !== errors.revascularizationOrEOPDate}
                  helperText={
                    errors.revascularizationOrEOPDate &&
                    errors.revascularizationOrEOPDate.message
                  }
                />
              )}
              rules={{
                validate: {
                  dateIsValid: dateIsValid(t),
                  dateIsNotInFuture: dateNotInFuture(t),
                },
              }}
            />
          </Grid>
          <Grid item>
            <SwitchInput
              title={t("neuroImagingUnder36Hrs")}
              inputRef={register}
              name="neuroImagingUnder36Hrs"
              falseLabel={t("no")}
              trueLabel={t("yes")}
              checked={watch().neuroImagingUnder36Hrs ?? false}
              onChange={(e, checked) =>
                setValue("neuroImagingUnder36Hrs", checked)
              }
            />
          </Grid>
          <Grid item>
            <SwitchInput
              title={t("sich")}
              inputRef={register}
              name="sich"
              falseLabel={t("no")}
              trueLabel={t("yes")}
              checked={watch().sich ?? false}
              onChange={(e, checked) => setValue("sich", checked)}
            />
          </Grid>
          <Grid item>
            <TextInput
              title={t("threeMonthsMRS")}
              name="threeMonthsMRS"
              type="number"
              onChange={(event) => {
                setValue("threeMonthsMRS", parseInt(event.target.value));
                trigger("deathDate");
              }}
              inputRef={register({
                required: { value: true, message: t("requiredField") },
                min: { value: 0, message: t("noNegativeNumber") },
                max: { value: 8, message: t("noMoreThan", { max: 8 }) },
                pattern: {
                  value: /^\d+$/,
                  message: t("noDecimalValue"),
                },
              })}
              error={undefined !== errors.threeMonthsMRS}
              helperText={
                errors.threeMonthsMRS && errors.threeMonthsMRS.message
              }
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="deathDate"
              render={({ onChange, value, name }) => (
                <DateInput
                  onChange={onChange}
                  value={value}
                  name={name}
                  error={undefined !== errors.deathDate}
                  helperText={errors.deathDate && errors.deathDate.message}
                />
              )}
              rules={{
                validate: {
                  dateIsValid: dateIsValid(t),
                  dateIsNotInFuture: dateNotInFuture(t),
                  conditionalRequiredDate: conditionalRequiredDate(
                    t,
                    watch().threeMonthsMRS?.toString() !== "6"
                  ),
                },
              }}
            />
          </Grid>
          <Grid item>
            <Fab variant="extended" type="submit">
              {t("submit") as string}
            </Fab>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PatientForm;
