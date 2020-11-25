import { PatientData, createPatientData } from "../state/patientFormSlice";
import {
  PatientSex,
  Comorbilities,
  RiskFactors,
  AntiplateletType,
  AnticoagulationType,
  AVCDiagnostic,
  ImagingType,
  AffectedVesselType,
  ReperfusionTreatmentType,
  ThrombolyticTreatmentType,
  StentType,
} from "./enums";
import { v4 as uuid } from "uuid";

type Codes<T extends string = string> = { [code: string]: T };

const patientSexCodes: Codes<PatientSex> = {
  "248153007": PatientSex.male,
  "248152002": PatientSex.female,
  "82334004": PatientSex.undetermined,
};

const comorbilityCodes: Codes<Comorbilities> = {
  "275526006": Comorbilities.cerebrovascularAccident,
  "399211009": Comorbilities.myocardialInfarction,
  "260413007": Comorbilities.none,
};

const riskFactorCodes: Codes<RiskFactors> = {
  "49436004": RiskFactors.atrialFibrillation,
  "38341003": RiskFactors.hypertension,
  "73211009": RiskFactors.diabetesMellitus,
  "266918002": RiskFactors.tobaccoSmokingConsumption,
  "370992007": RiskFactors.dyslipidemia,
  "260413007": RiskFactors.none,
};

const anticoaguationTypeCodes: Codes<AnticoagulationType> = {
  B01AA07: AnticoagulationType.acenocumarol,
  B01AA03: AnticoagulationType.warfarin,
  B01AB01: AnticoagulationType.heparin_iv,
  B01AB: AnticoagulationType.heparin_group,
  B01AE07: AnticoagulationType.dabigatran,
  B01AF01: AnticoagulationType.rivaroxaban,
  B01AF02: AnticoagulationType.apixaban,
  B01AF03: AnticoagulationType.edoxaban,
};

const antiplateletTherapyCodes: Codes<AntiplateletType> = {
  B01AC05: AntiplateletType.ticoplidine,
  B01AC06: AntiplateletType.acetylsalicylic_acid,
  B01AC07: AntiplateletType.dipyridamol,
  B01AC24: AntiplateletType.ticagrelor,
  B01AC04: AntiplateletType.clopidogrel,
};

const diagnosticCodes: Codes<AVCDiagnostic> = {
  "1386000": AVCDiagnostic.intracranialHemorrhage,
  "422504002": AVCDiagnostic.ischemicStroke,
};

const imagingTypeCodes: Codes<ImagingType> = {
  "34227000": ImagingType.brainCT,
  "433111008": ImagingType.brainPerfusionCT,
  "29567006": ImagingType.brainMRIAndBrainStem,
  "419059006": ImagingType.cerebralMRIPerfusionStudy,
  "426099006": ImagingType.cerebralVesselsCT,
  "241664002": ImagingType.cerebralVesselsMRI,
  "431648005": ImagingType.transcranialDopplerUltrasonography,
  "394719009": ImagingType.carotidArteryDopplerAssessment,
  "129118002": ImagingType.arteriography,
  "262008008": ImagingType.notPerformed,
};

const vesselCodes: Codes<AffectedVesselType> = {
  "260413007": AffectedVesselType.none,
  "261665006": AffectedVesselType.unknown,
  "38917008": AffectedVesselType.rightInternalCarotidArtery,
  "58379002": AffectedVesselType.leftInternalCarotidArtery,
  TICA_R: AffectedVesselType.rightTerminalPortionOfInternalCarotidArtery,
  M1_R: AffectedVesselType.rightMiddleCerebralArteryM1Segment,
  M2_R: AffectedVesselType.rightMiddleCerebralArteryM2Segment,
  TICA_L: AffectedVesselType.leftTerminalPortionOfInternalCarotidArtery,
  M1_L: AffectedVesselType.leftMiddleCerebralArteryM1Segment,
  M2_L: AffectedVesselType.leftMiddleCerebralArteryM2Segment,
  "369299002": AffectedVesselType.leftAnteriorCerebralArtery,
  "369298005": AffectedVesselType.rightAnteriorCerebralArtery,
  "369300005": AffectedVesselType.rightPosteriorCerebralArtery,
  "369301009": AffectedVesselType.leftPosteriorCerebralArtery,
  "369354007": AffectedVesselType.rightVertebralArtery,
  "369355008": AffectedVesselType.leftVertebralArtery,
  "59011009": AffectedVesselType.basilarArtery,
};

const reperfusionTreatmentCodes: Codes<ReperfusionTreatmentType> = {
  "472191000119101":
    ReperfusionTreatmentType.cerebralArteryThrombolysisByIntravenousInfusion,
  "21710002": ReperfusionTreatmentType.intracranialThrombectomy,
  "230934004": ReperfusionTreatmentType.intracranialVesselThrombolysis,
};

const thrombolyticTreatmentCodes: Codes<ThrombolyticTreatmentType> = {
  "387152000": ThrombolyticTreatmentType.alteplase,
  "127967007": ThrombolyticTreatmentType.tenecteplase,
};

const stentCodes: Codes<StentType> = {
  "360046005": StentType.arterialStent,
  "413766009": StentType.carotidStent,
  "705639000": StentType.intracranialvascularStent,
  "260413007": StentType.none,
};

export const formatPatientDataForExport = (
  type: "nominative" | "pseudonymized" | "enhanced pseudonymized" = "nominative"
) => (
  patient: PatientData
): Partial<Record<keyof PatientData, string | number | boolean>> => {
  const formattedPatient: Partial<Record<
    keyof PatientData,
    string | number | boolean
  >> = {};
  const dataKeys = Object.keys(patient);
  const isPositive = Math.random() < 0.5;
  const dateShift = Math.random() * 1000000000 * (isPositive ? 1 : -1);
  for (const dataKey of dataKeys) {
    switch (dataKey) {
      case "sex": {
        const entries = Object.entries(patientSexCodes);
        const value = patient.sex;
        formattedPatient[dataKey] =
          entries.find((entry) => entry[1] === value)?.[0] ?? "";
        break;
      }

      case "comorbilities": {
        const entries = Object.entries(comorbilityCodes);
        const values = patient.comorbilities;
        formattedPatient[dataKey] =
          values
            ?.map(
              (value) => entries.find((entry) => entry[1] === value)?.[0] ?? ""
            )
            .join(" ; ") ?? "";
        break;
      }

      case "riskFactor": {
        const entries = Object.entries(riskFactorCodes);
        const values = patient.riskFactor;
        formattedPatient[dataKey] =
          values
            ?.map(
              (value) => entries.find((entry) => entry[1] === value)?.[0] ?? ""
            )
            .join(" ; ") ?? "";
        break;
      }

      case "anticoagulationType": {
        const entries = Object.entries(anticoaguationTypeCodes);
        const values = patient.anticoagulationType;
        formattedPatient[dataKey] =
          values
            ?.map(
              (value) => entries.find((entry) => entry[1] === value)?.[0] ?? ""
            )
            .join(" ; ") ?? "";
        break;
      }

      case "antiplateletType": {
        const entries = Object.entries(antiplateletTherapyCodes);
        const values = patient.antiplateletType;
        formattedPatient[dataKey] =
          values
            ?.map(
              (value) => entries.find((entry) => entry[1] === value)?.[0] ?? ""
            )
            .join(" ; ") ?? "";
        break;
      }

      case "diagnostic": {
        const entries = Object.entries(diagnosticCodes);
        const value = patient.diagnostic;
        formattedPatient[dataKey] =
          entries.find((entry) => entry[1] === value)?.[0] ?? "";
        break;
      }

      case "followingImaging": {
        const entries = Object.entries(imagingTypeCodes);
        const values = patient.followingImaging;
        formattedPatient[dataKey] =
          values
            ?.map(
              (value) => entries.find((entry) => entry[1] === value)?.[0] ?? ""
            )
            .join(" ; ") ?? "";
        break;
      }

      case "firstImagingType": {
        const entries = Object.entries(imagingTypeCodes);
        const values = patient.firstImagingType;
        formattedPatient[dataKey] =
          values
            ?.map(
              (value) => entries.find((entry) => entry[1] === value)?.[0] ?? ""
            )
            .join(" ; ") ?? "";
        break;
      }

      case "affectedVessels": {
        const entries = Object.entries(vesselCodes);
        const values = patient.affectedVessels;
        formattedPatient[dataKey] =
          values
            ?.map(
              (value) => entries.find((entry) => entry[1] === value)?.[0] ?? ""
            )
            .join(" ; ") ?? "";
        break;
      }
      case "arteriographyAffectedVessel": {
        const entries = Object.entries(vesselCodes);
        const values = patient.arteriographyAffectedVessel;
        formattedPatient[dataKey] =
          values
            ?.map(
              (value) => entries.find((entry) => entry[1] === value)?.[0] ?? ""
            )
            .join(" ; ") ?? "";
        break;
      }

      case "administeredReperfusionTreatment": {
        const entries = Object.entries(reperfusionTreatmentCodes);
        const values = patient.administeredReperfusionTreatment;
        formattedPatient[dataKey] =
          values
            ?.map(
              (value) => entries.find((entry) => entry[1] === value)?.[0] ?? ""
            )
            .join(" ; ") ?? "";
        break;
      }

      case "thrombolyticTreatmentType": {
        const entries = Object.entries(thrombolyticTreatmentCodes);
        const value = patient.thrombolyticTreatmentType;
        formattedPatient[dataKey] =
          entries.find((entry) => entry[1] === value)?.[0] ?? "";
        break;
      }

      case "stent": {
        const entries = Object.entries(stentCodes);
        const value = patient.stent;
        formattedPatient[dataKey] =
          entries.find((entry) => entry[1] === value)?.[0] ?? "";
        break;
      }

      case "symptomsOnsetDate":
      case "hospitalArrivalDate":
      case "IVThrombolysisDate":
      case "deathDate":
      case "OtherEVTCenterDate":
      case "arterialPunctureDate":
      case "firstImagingDate":
      case "followingImagingDate":
      case "revascularizationOrEOPDate": {
        let date = patient[dataKey];
        if (date && type === "enhanced pseudonymized") {
          date = new Date(date.getTime() + dateShift);
        }
        formattedPatient[dataKey] = date?.toISOString() ?? "";
        break;
      }

      default: {
        formattedPatient[dataKey] = patient[dataKey]?.toString() ?? "";
        break;
      }
    }
  }

  if (type !== "nominative") {
    const id = patient.id;
    formattedPatient.firstName = formattedPatient.lastName = id;
    if (type === "enhanced pseudonymized") {
      formattedPatient.IPP = id;
    }
  }

  return formattedPatient;
};

export const formatPatientDataForImport = (patientData: {
  [dataKey: string]: string;
}): PatientData => {
  const patient = createPatientData(uuid());
  for (const dataKey in patientData) {
    const dataKeyValue = patientData[dataKey];
    if (dataKeyValue.toString() !== "99" || dataKey === "age") {
      switch (dataKey as keyof PatientData) {
        case "sex": {
          const value = patientSexCodes[dataKeyValue] ?? null;
          patient.sex = value;
          break;
        }

        case "comorbilities": {
          const values = dataKeyValue.split(" ; ");
          patient.comorbilities = values
            .map((value) => comorbilityCodes[value])
            .filter((value) => undefined !== value);
          break;
        }

        case "riskFactor": {
          const values = dataKeyValue.split(" ; ");
          patient.riskFactor = values
            .map((value) => riskFactorCodes[value])
            .filter((value) => undefined !== value);
          break;
        }

        case "anticoagulationType": {
          const values = dataKeyValue.split(" ; ");
          patient.anticoagulationType = values
            .map((value) => anticoaguationTypeCodes[value])
            .filter((value) => undefined !== value);
          break;
        }

        case "antiplateletType": {
          const values = dataKeyValue.split(" ; ");
          patient.antiplateletType = values
            .map((value) => antiplateletTherapyCodes[value])
            .filter((value) => undefined !== value);
          break;
        }

        case "diagnostic": {
          const value = diagnosticCodes[dataKeyValue] ?? null;
          patient.diagnostic = value;
          break;
        }

        case "followingImaging": {
          const values = dataKeyValue.split(" ; ");
          patient.followingImaging = values
            .map((value) => imagingTypeCodes[value])
            .filter((value) => undefined !== value);
          break;
        }

        case "firstImagingType": {
          const values = dataKeyValue.split(" ; ");
          patient.firstImagingType = values
            .map((value) => imagingTypeCodes[value])
            .filter((value) => undefined !== value);
          break;
        }

        case "affectedVessels": {
          const values = dataKeyValue.split(" ; ");
          patient.affectedVessels = values
            .map((value) => vesselCodes[value])
            .filter((value) => undefined !== value);
          break;
        }
        case "arteriographyAffectedVessel": {
          const values = dataKeyValue.split(" ; ");
          patient.arteriographyAffectedVessel = values
            .map((value) => vesselCodes[value])
            .filter((value) => undefined !== value);
          break;
        }

        case "administeredReperfusionTreatment": {
          const values = dataKeyValue.split(" ; ");
          patient.administeredReperfusionTreatment = values
            .map((value) => reperfusionTreatmentCodes[value])
            .filter((value) => undefined !== value);
          break;
        }

        case "thrombolyticTreatmentType": {
          const value = thrombolyticTreatmentCodes[dataKeyValue] ?? null;
          patient.thrombolyticTreatmentType = value;
          break;
        }

        case "stent": {
          const value = stentCodes[dataKeyValue] ?? null;
          patient.stent = value;
          break;
        }

        case "symptomsOnsetDate":
        case "hospitalArrivalDate":
        case "IVThrombolysisDate":
        case "deathDate":
        case "OtherEVTCenterDate":
        case "arterialPunctureDate":
        case "firstImagingDate":
        case "followingImagingDate":
        case "revascularizationOrEOPDate": {
          const date = new Date(dataKeyValue);
          //@ts-ignore
          patient[dataKey] = isNaN(date) ? null : date;
          break;
        }

        default: {
          try {
            //@ts-ignore
            patient[dataKey] = JSON.parse(dataKeyValue);
          } catch (error) {
            //@ts-ignore
            patient[dataKey] = "" === dataKeyValue ? null : dataKeyValue;
          }
          break;
        }
      }
    }
  }

  return patient;
};