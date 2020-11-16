import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "./fakePatientData.json";
import { v4 as uuid } from "uuid";
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

export type PatientData = {
  firstName: string | null;
  lastName: string | null;
  IPP: string | null;
  regionId: IdRegionEnum | null;
  areaResident: boolean | null;
  sex: PatientSex | null;
  id: string;
  age: number | null;
  previousMRS: number | null;
  comorbilities: Comorbilities[] | null;
  riskFactor: RiskFactors[] | null;
  diastolicBloodPressure: number | null;
  systolicBloodPressure: number | null;
  bloodGlucose: number | null;
  INR: number | null;
  priorAnticoagulationTherapy: boolean | null;
  anticoagulationType: AnticoagulationType[] | null;
  priorAntiplateletTherapy: boolean | null;
  antiplateletType: AntiplateletType[] | null;
  symptomsOnsetDate: Date | null;
  hospitalArrivalDate: Date | null;
  initialNIHSS: number | null;
  diagnostic: AVCDiagnostic | null;
  firstImagingType: ImagingType[] | null;
  firstImagingDate: Date | null;
  firstImagingASPECTSScore: number | null;
  affectedVessels: AffectedVesselType[] | null;
  administeredReperfusionTreatment: ReperfusionTreatmentType[] | null;
  IVThrombolysisDate: Date | null;
  thrombolyticTreatmentType: ThrombolyticTreatmentType | null;
  EVTTransfert: boolean | null;
  OtherEVTCenterDate: Date | null;
  followingImaging: ImagingType[] | null;
  followingImagingDate: Date | null;
  followingImagingASPECTSScore: number | null;
  NIHSSPrearteriography: number | null;
  arterialPunctureDate: Date | null;
  arteriographyAffectedVessel: AffectedVesselType[] | null;
  initialmTiciScore: mTICIScore | null;
  EVTModality: EVTModalityType | null;
  deviceModel: string | null;
  numberOfPasses: number | null;
  balloonUse: boolean | null;
  stent: StentType | null;
  newTerritoriesEmbolization: boolean | null;
  finalmTICIScore: mTICIScore | null;
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
  patientColumnData: PatientColumnData;
};

const initialState: PatientFormState = {
  patients: data.map((item) => ({
    ...item,
    firstName: "Pierre",
    lastName: "Dupont",
    IPP: "123456",
    finalmTICIScore: mTICIScore._0,
    initialmTiciScore: mTICIScore["2c"],
    age: 4,
    sex: PatientSex.male,
    areaResident: true,
    regionId: IdRegionEnum["FR-OCCEWEST"],
    id: uuid(),
    symptomsOnsetDate: new Date(),
    previousMRS: 4,
    comorbilities: [Comorbilities.cerebrovascularAccident],
    riskFactor: [RiskFactors.atrialFibrillation, RiskFactors.dyslipidemia],
    diastolicBloodPressure: 3,
    systolicBloodPressure: 14,
    bloodGlucose: 24,
    INR: 42,
    priorAnticoagulationTherapy: true,
    anticoagulationType: [AnticoagulationType.apixaban],
    priorAntiplateletTherapy: true,
    antiplateletType: [
      AntiplateletType.acetylsalicylic_acid,
      AntiplateletType.clopidogrel,
    ],
    hospitalArrivalDate: new Date(),
    initialNIHSS: 3,
    diagnostic: AVCDiagnostic.intracranialHemorrhage,
    firstImagingType: [ImagingType.notPerformed],
    firstImagingDate: new Date(),
    firstImagingASPECTSScore: 3,
    affectedVessels: [
      AffectedVesselType.leftAnteriorCerebralArtery,
      AffectedVesselType.leftPosteriorCerebralArtery,
    ],
    administeredReperfusionTreatment: [
      ReperfusionTreatmentType.cerebralArteryThrombolysisByIntravenousInfusion,
    ],
    IVThrombolysisDate: new Date(),
    thrombolyticTreatmentType: ThrombolyticTreatmentType.alteplase,
    EVTTransfert: false,
    OtherEVTCenterDate: new Date(),
    followingImaging: [
      ImagingType.arteriography,
      ImagingType.brainMRIAndBrainStem,
      ImagingType.carotidArteryDopplerAssessment,
    ],
    followingImagingDate: new Date(),
    followingImagingASPECTSScore: 4,
    NIHSSPrearteriography: 12,
    arterialPunctureDate: new Date(),
    arteriographyAffectedVessel: [
      AffectedVesselType.leftVertebralArtery,
      AffectedVesselType.rightInternalCarotidArtery,
      AffectedVesselType.rightPosteriorCerebralArtery,
    ],

    EVTModality: EVTModalityType.mechanicalThrombectomy,
    deviceModel: "machin truc",
    numberOfPasses: 4,
    balloonUse: true,
    stent: StentType.none,
    newTerritoriesEmbolization: true,
    revascularizationOrEOPDate: new Date(),
    neuroImagingUnder36Hrs: true,
    sich: false,
    threeMonthsMRS: 6,
    deathDate: new Date(),
  })),
  patientColumnData: [
    {
      dataKey: "firstName",
      label: "firstName",
    },
    {
      dataKey: "lastName",
      label: "lastName",
    },
    {
      dataKey: "IPP",
      label: "IPP",
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
  firstName: null,
  lastName: null,
  IPP: null,
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
});

export const {
  setPatientEntry,
  deletePatientEntry,
  importPatientData,
} = patientFormSlice.actions;
export default patientFormSlice.reducer;
