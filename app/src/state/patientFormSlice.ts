import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
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
} from "../utils/enums";
import { RootState } from "./store";
import {
  getPatients,
  addPatient,
  deletePatient,
  editPatient,
} from "services/auth";
import { enqueueSnackbar } from "./notifSlice";

type SelectOption<T extends string = string> = { id: T; label: string };

export type PatientData = {
  idEvent: string | null;
  regionId: SelectOption<IdRegionEnum> | null;
  areaResident: boolean | null;
  sex: SelectOption<PatientSex> | null;
  id: string;
  age: number | null;
  previousMRS: number | null;
  comorbilities: SelectOption<Comorbilities>[] | null;
  riskFactor: SelectOption<RiskFactors>[] | null;
  diastolicBloodPressure: number | null;
  systolicBloodPressure: number | null;
  bloodGlucose: number | null;
  INR: number | null;
  priorAnticoagulationTherapy: boolean | null;
  anticoagulationType: SelectOption<AnticoagulationType>[] | null;
  priorAntiplateletTherapy: boolean | null;
  antiplateletType: SelectOption<AntiplateletType>[] | null;
  symptomsOnsetDate: Date | null;
  hospitalArrivalDate: Date | null;
  initialNIHSS: number | null;
  diagnostic: SelectOption<AVCDiagnostic> | null;
  firstImagingType: SelectOption<ImagingType>[] | null;
  firstImagingDate: Date | null;
  firstImagingASPECTSScore: number | null;
  affectedVessels: SelectOption<AffectedVesselType>[] | null;
  administeredReperfusionTreatment:
    | SelectOption<ReperfusionTreatmentType>[]
    | null;
  IVThrombolysisDate: Date | null;
  thrombolyticTreatmentType: SelectOption<ThrombolyticTreatmentType> | null;
  EVTTransfert: boolean | null;
  OtherEVTCenterDate: Date | null;
  followingImaging: SelectOption<ImagingType>[] | null;
  followingImagingDate: Date | null;
  followingImagingASPECTSScore: number | null;
  NIHSSPrearteriography: number | null;
  arterialPunctureDate: Date | null;
  arteriographyAffectedVessel: SelectOption<AffectedVesselType>[] | null;
  initialmTiciScore: SelectOption<mTICIScore> | null;
  EVTModality: SelectOption<EVTModalityType> | null;
  deviceModel: string | null;
  numberOfPasses: number | null;
  balloonUse: boolean | null;
  stent: SelectOption<StentType> | null;
  newTerritoriesEmbolization: boolean | null;
  finalmTICIScore: SelectOption<mTICIScore> | null;
  revascularizationOrEOPDate: Date | null;
  neuroImagingUnder36Hrs: boolean | null;
  sich: boolean | null;
  threeMonthsMRS: number | null;
  deathDate: Date | null;
};

export type PatientColumnData = {
  dataKey: keyof PatientData;
  label: string;
}[];

export type PatientFormState = {
  patients: PatientData[];
  totalPatients?: number;
  patientColumnData: PatientColumnData;
  loading: boolean;
  requestId?: string;
};

const initialState: PatientFormState = {
  loading: false,
  patients: [],
  patientColumnData: [
    {
      dataKey: "idEvent",
      label: "idEvent",
    },
    {
      dataKey: "regionId",
      label: "regionId",
    },
    {
      dataKey: "areaResident",
      label: "areaResident",
    },
    {
      dataKey: "sex",
      label: "sex",
    },
    {
      dataKey: "age",
      label: "age",
    },
    {
      dataKey: "previousMRS",
      label: "previousMRS",
    },
    {
      dataKey: "comorbilities",
      label: "comorbilities",
    },
    { dataKey: "riskFactor", label: "riskFactor" },
    { dataKey: "diastolicBloodPressure", label: "diastolicBloodPressure" },
    { dataKey: "systolicBloodPressure", label: "systolicBloodPressure" },
    { dataKey: "bloodGlucose", label: "bloodGlucose" },
    { dataKey: "INR", label: "INR" },
    {
      dataKey: "priorAnticoagulationTherapy",
      label: "priorAnticoagulationTherapy",
    },
    { dataKey: "anticoagulationType", label: "anticoagulationType" },
    { dataKey: "priorAntiplateletTherapy", label: "priorAntiplateletTherapy" },
    { dataKey: "antiplateletType", label: "antiplateletType" },
    {
      dataKey: "symptomsOnsetDate",
      label: "symptomsOnsetDate",
    },
    { dataKey: "hospitalArrivalDate", label: "hospitalArrivalDate" },
    { dataKey: "initialNIHSS", label: "initialNIHSS" },
    { dataKey: "diagnostic", label: "diagnostic" },
    { dataKey: "firstImagingType", label: "firstImagingType" },
    { dataKey: "firstImagingDate", label: "firstImagingDate" },
    { dataKey: "firstImagingASPECTSScore", label: "firstImagingASPECTSScore" },
    { dataKey: "affectedVessels", label: "affectedVessels" },
    {
      dataKey: "administeredReperfusionTreatment",
      label: "administeredReperfusionTreatment",
    },
    {
      dataKey: "IVThrombolysisDate",
      label: "IVThrombolysisDate",
    },
    {
      dataKey: "thrombolyticTreatmentType",
      label: "thrombolyticTreatmentType",
    },
    {
      dataKey: "EVTTransfert",
      label: "EVTTransfert",
    },
    {
      dataKey: "OtherEVTCenterDate",
      label: "OtherEVTCenterDate",
    },
    {
      dataKey: "followingImaging",
      label: "followingImaging",
    },
    {
      dataKey: "followingImagingDate",
      label: "followingImagingDate",
    },
    {
      dataKey: "followingImagingASPECTSScore",
      label: "followingImagingASPECTSScore",
    },
    {
      dataKey: "NIHSSPrearteriography",
      label: "NIHSSPrearteriography",
    },
    {
      dataKey: "arterialPunctureDate",
      label: "arterialPunctureDate",
    },
    {
      dataKey: "arteriographyAffectedVessel",
      label: "arteriographyAffectedVessel",
    },
    {
      dataKey: "initialmTiciScore",
      label: "initialmTiciScore",
    },
    { dataKey: "EVTModality", label: "EVTModality" },
    { dataKey: "deviceModel", label: "deviceModel" },
    { dataKey: "numberOfPasses", label: "numberOfPasses" },
    { dataKey: "balloonUse", label: "balloonUse" },
    { dataKey: "stent", label: "stent" },
    {
      dataKey: "newTerritoriesEmbolization",
      label: "newTerritoriesEmbolization",
    },
    {
      dataKey: "finalmTICIScore",
      label: "finalmTICIScore",
    },
    {
      dataKey: "revascularizationOrEOPDate",
      label: "revascularizationOrEOPDate",
    },
    {
      dataKey: "neuroImagingUnder36Hrs",
      label: "neuroImagingUnder36Hrs",
    },
    {
      dataKey: "sich",
      label: "sich",
    },
    {
      dataKey: "threeMonthsMRS",
      label: "threeMonthsMRS",
    },
    {
      dataKey: "deathDate",
      label: "deathDate",
    },
  ],
};

export const createPatientData = (patientId: string): PatientData => ({
  id: patientId,
  idEvent: null,
  areaResident: null,
  regionId: null,
  sex: null,
  age: null,
  symptomsOnsetDate: null,
  previousMRS: null,
  comorbilities: null,
  riskFactor: null,
  diastolicBloodPressure: null,
  systolicBloodPressure: null,
  bloodGlucose: null,
  INR: null,
  priorAnticoagulationTherapy: null,
  anticoagulationType: null,
  priorAntiplateletTherapy: null,
  antiplateletType: null,
  hospitalArrivalDate: null,
  initialNIHSS: null,
  diagnostic: null,
  firstImagingType: null,
  firstImagingDate: null,
  firstImagingASPECTSScore: null,
  affectedVessels: null,
  administeredReperfusionTreatment: null,
  IVThrombolysisDate: null,
  EVTTransfert: null,
  thrombolyticTreatmentType: null,
  OtherEVTCenterDate: null,
  followingImaging: null,
  followingImagingDate: null,
  followingImagingASPECTSScore: null,
  NIHSSPrearteriography: null,
  arterialPunctureDate: null,
  arteriographyAffectedVessel: null,
  initialmTiciScore: null,
  finalmTICIScore: null,
  EVTModality: null,
  deviceModel: null,
  numberOfPasses: null,
  balloonUse: null,
  stent: null,
  newTerritoriesEmbolization: null,
  revascularizationOrEOPDate: null,
  neuroImagingUnder36Hrs: null,
  sich: null,
  threeMonthsMRS: null,
  deathDate: null,
});

const getPatientsThunk = createAsyncThunk<
  { patients: PatientData[]; totalPatients: number },
  { limit: number; page: number } | undefined,
  { state: RootState }
>("patientForm/getPatients", async (params) => {
  return await getPatients(params);
});

const deletePatientEntryThunk = createAsyncThunk<
  void,
  string[],
  { state: RootState }
>("patientForm/deletePatient", async (patientIds, { dispatch }) => {
  const deletePromises = patientIds.map(deletePatient);
  const deleteResults = await Promise.all(deletePromises);
  if (!deleteResults.includes(false)) {
    dispatch(patientFormSlice.actions.deletePatientEntry(patientIds));
    dispatch(
      enqueueSnackbar({
        message: "patientDeleteSuccess",
        options: { variant: "success" },
      })
    );
  }
});

const setPatientEntriesThunk = createAsyncThunk<
  void,
  PatientData[],
  { state: RootState }
>("patientForm/setPatientEntry", async (patients, { dispatch }) => {
  const addPromises = patients.map(addPatient);
  const addResults = await Promise.all(addPromises);

  if (!addResults.includes(false)) {
    dispatch(getPatientsThunk());
    dispatch(
      enqueueSnackbar({
        message: "patientAddSuccess",
        options: { variant: "success" },
      })
    );
  } else {
    dispatch(
      enqueueSnackbar({
        message: "patientAddFailure",
        options: { variant: "error" },
      })
    );
  }
});

const editPatientEntryThunk = createAsyncThunk<
  void,
  PatientData,
  { state: RootState }
>("patientForm/editPatientEntry", async (patient, { dispatch }) => {
  const editResult = await editPatient(patient);

  if (editResult) {
    dispatch(getPatientsThunk());
    dispatch(
      enqueueSnackbar({
        message: "editSuccess",
        options: { variant: "success" },
      })
    );
  } else {
    dispatch(
      enqueueSnackbar({ message: "editFailure", options: { variant: "error" } })
    );
  }
});

const patientFormSlice = createSlice({
  name: "patientForm",
  initialState,
  reducers: {
    setPatientEntry: (
      state: PatientFormState,
      action: PayloadAction<PatientData>
    ) => {
      const newPatient = action.payload;
      const patientIndex = state.patients.findIndex(
        (patient) => patient.id === newPatient.id
      );
      if (patientIndex === -1) {
        state.patients.push(newPatient);
      } else {
        state.patients[patientIndex] = newPatient;
      }
    },
    importPatientData: (
      state: PatientFormState,
      action: PayloadAction<PatientData[]>
    ) => {
      const newPatients = action.payload;
      state.patients = [...state.patients, ...newPatients];
    },
    deletePatientEntry: (
      state: PatientFormState,
      action: PayloadAction<string[]>
    ) => {
      const patientIds = action.payload;
      state.patients = state.patients.filter(
        (patient, index) => !patientIds.some((id) => id === patient.id)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPatientsThunk.pending, (state, { meta }) => {
      state.loading = true;
      state.requestId = meta.requestId;
    });
    builder.addCase(getPatientsThunk.fulfilled, (state, { payload, meta }) => {
      state.patients = payload.patients;
      state.totalPatients = payload.totalPatients;
      state.loading = state.requestId !== meta.requestId;
    });
  },
});

export const { setPatientEntry } = patientFormSlice.actions;
export {
  getPatientsThunk,
  setPatientEntriesThunk,
  deletePatientEntryThunk,
  editPatientEntryThunk,
};
export default patientFormSlice.reducer;
