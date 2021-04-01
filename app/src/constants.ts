import { PatientData } from "state/patientFormSlice";

export const ID_TOKEN_STORAGE_KEY = "ARKHN_ID_TOKEN";
export const TOKEN_DATA_STORAGE_KEY = "ARKHN_TOKEN_DATA";
export const STATE_STORAGE_KEY = "ARKHN_AUTH_STATE";

export const {
  REACT_APP_API_URL: API_URL,
  REACT_APP_AUTH_API_URL: AUTH_API_URL,
} = process.env;

export const ACCES_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";
export const USERNAME_KEY = "username";

export const ICTUS_FORMAT_CSV_COLUMN_KEYS_MAP: (keyof PatientData)[] = [
  "IPP",
  "regionId",
  "areaResident",
  "sex",
  "age",
  "previousMRS",
  "comorbilities",
  "riskFactor",
  "diastolicBloodPressure",
  "systolicBloodPressure",
  "bloodGlucose",
  "INR",
  "priorAnticoagulationTherapy",
  "anticoagulationType",
  "priorAntiplateletTherapy",
  "antiplateletType",
  "symptomsOnsetDate",
  "hospitalArrivalDate",
  "initialNIHSS",
  "diagnostic",
  "firstImagingType",
  "firstImagingDate",
  "firstImagingASPECTSScore",
  "affectedVessels",
  "administeredReperfusionTreatment",
  "IVThrombolysisDate",
  "thrombolyticTreatmentType",
  "EVTTransfert",
  "OtherEVTCenterDate",
  "followingImaging",
  "followingImagingDate",
  "followingImagingASPECTSScore",
  "NIHSSPrearteriography",
  "arterialPunctureDate",
  "arteriographyAffectedVessel",
  "initialmTiciScore",
  "EVTModality",
  "deviceModel",
  "numberOfPasses",
  "balloonUse",
  "stent",
  "newTerritoriesEmbolization",
  "finalmTICIScore",
  "revascularizationOrEOPDate",
  "neuroImagingUnder36Hrs",
  "sich",
  "threeMonthsMRS",
  "deathDate",
];
