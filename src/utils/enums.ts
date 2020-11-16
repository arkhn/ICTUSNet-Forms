export enum IdRegionEnum {
  "FR-OCCEWEST" = "FR-OCCEWEST",
  "FR-OCCEAST" = "FR-OCCEAST",
  "PT-RN" = "PT-RN",
  "ES-AR" = "ES-AR",
  "ES-NC" = "ES-NC",
  "ES-IB" = "ES-IB",
  "ES-CT" = "ES-CT",
}

export enum PatientSex {
  "male" = "male",
  "female" = "female",
  "undetermined" = "undetermined",
}

export enum Comorbilities {
  "cerebrovascularAccident" = "cerebrovascularAccident",
  "myocardialInfarction" = "myocardialInfarction",
  "none" = "none",
}

export enum RiskFactors {
  "atrialFibrillation" = "atrialFibrillation",
  "hypertension" = "hypertension",
  "diabetesMellitus" = "diabetesMellitus",
  "tobaccoSmokingConsumption" = "tobaccoSmokingConsumption",
  "dyslipidemia" = "dyslipidemia",
  "none" = "none",
}

export enum AnticoagulationType {
  "acenocumarol" = "acenocumarol",
  "warfarin" = "warfarin",
  "heparin_iv" = "heparin_iv",
  "heparin_group" = "heparin_group",
  "dabigatran" = "dabigatran",
  "rivaroxaban" = "rivaroxaban",
  "apixaban" = "apixaban",
  "edoxaban" = "edoxaban",
}

export enum AntiplateletType {
  "ticoplidine" = "ticoplidine",
  "acetylsalicylic_acid" = "acetylsalicylic_acid",
  "dipyridamol" = "dipyridamol",
  "ticagrelor" = "ticagrelor",
  "clopidogrel" = "clopidogrel",
}

export enum AVCDiagnostic {
  "intracranialHemorrhage" = "intracranialHemorrhage",
  "ischemicStroke" = "ischemicStroke",
}

export enum ImagingType {
  "brainCT" = "brainCT",
  "brainPerfusionCT" = "brainPerfusionCT",
  "brainMRIAndBrainStem" = "brainMRIAndBrainStem",
  "cerebralMRIPerfusionStudy" = "cerebralMRIPerfusionStudy",
  "cerebralVesselsCT" = "cerebralVesselsCT",
  "cerebralVesselsMRI" = "cerebralVesselsMRI",
  "transcranialDopplerUltrasonography" = "transcranialDopplerUltrasonography",
  "carotidArteryDopplerAssessment" = "carotidArteryDopplerAssessment",
  "arteriography" = "arteriography",
  "notPerformed" = "notPerformed",
}

export enum AffectedVesselType {
  "none" = "none",
  "unknown" = "unknown",
  "rightInternalCarotidArtery" = "rightInternalCarotidArtery",
  "rightTerminalPortionOfInternalCarotidArtery" = "rightTerminalPortionOfInternalCarotidArtery",
  "rightMiddleCerebralArteryM1Segment" = "rightMiddleCerebralArteryM1Segment",
  "rightMiddleCerebralArteryM2Segment" = "rightMiddleCerebralArteryM2Segment",
  "rightAnteriorCerebralArtery" = "rightAnteriorCerebralArtery",
  "rightPosteriorCerebralArtery" = "rightPosteriorCerebralArtery",
  "rightVertebralArtery" = "rightVertebralArtery",
  "leftInternalCarotidArtery" = "leftInternalCarotidArtery",
  "leftTerminalPortionOfInternalCarotidArtery" = "leftTerminalPortionOfInternalCarotidArtery",
  "leftMiddleCerebralArteryM1Segment" = "leftMiddleCerebralArteryM1Segment",
  "leftMiddleCerebralArteryM2Segment" = "leftMiddleCerebralArteryM2Segment",
  "leftAnteriorCerebralArtery" = "leftAnteriorCerebralArtery",
  "leftPosteriorCerebralArtery" = "leftPosteriorCerebralArtery",
  "leftVertebralArtery" = "leftVertebralArtery",
  "basilarArtery" = "basilarArtery",
}

export enum EVTModalityType {
  "mechanicalThrombectomy" = "mechanicalThrombectomy",
  "pharmacological" = "pharmacological",
  "both" = "both",
}

export enum StentType {
  "arterialStent" = "arterialStent",
  "carotidStent" = "carotidStent",
  "intracranialvascularStent" = "intracranialvascularStent",
  "none" = "none",
}

export enum ReperfusionTreatmentType {
  "cerebralArteryThrombolysisByIntravenousInfusion" = "cerebralArteryThrombolysisByIntravenousInfusion",
  "intracranialThrombectomy" = "intracranialThrombectomy",
  "intracranialVesselThrombolysis" = "intracranialVesselThrombolysis",
}

export enum ThrombolyticTreatmentType {
  "alteplase" = "alteplase",
  "tenecteplase" = "tenecteplase",
}

export enum mTICIScore {
  "_0" = "0",
  "_1" = "1",
  "2a" = "2a",
  "2b" = "2b",
  "2c" = "2c",
  "_3" = "3",
  "NA" = "NA",
}
