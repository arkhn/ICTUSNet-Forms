import React from "react";
import { PatientData } from "state/patientFormSlice";
import { TFunction } from "i18next";
import { FormInputProperty } from "@arkhn/ui";
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
  ReperfusionTreatmentType,
  ThrombolyticTreatmentType,
  mTICIScore,
  EVTModalityType,
  StentType,
} from "./enums";
import {
  requiredMultiSelect,
  dateIsValid,
  dateNotInFuture,
  conditionalRequiredDate,
} from "./validate";
import { InputAdornment } from "@material-ui/core";

const patientFormInputProperties = (t: TFunction) => (
  data: PatientData
): FormInputProperty<PatientData>[] => {
  return [
    { type: "text", name: "firstName", label: t("firstName") },
    { type: "text", name: "lastName", label: t("lastName") },
    { type: "text", name: "IPP", label: t("IPP") },
    {
      type: "select",
      name: "regionId",
      label: t("regionId"),
      validationRules: {
        required: { value: true, message: t("requiredField") },
      },
      selectOptions: Object.keys(IdRegionEnum).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "switch",
      name: "areaResident",
      label: t("areaResident"),
      trueLabel: t("yes"),
      falseLabel: t("no"),
    },
    {
      type: "select",
      name: "sex",
      label: t("sex"),
      validationRules: {
        required: { value: true, message: t("requiredField") },
      },
      selectOptions: Object.keys(PatientSex).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "number",
      name: "age",
      label: t("age"),
      validationRules: {
        required: { value: true, message: t("requiredField") },
        min: { value: 0, message: t("noNegativeNumber") },
        pattern: {
          value: /^\d+$/,
          message: t("noDecimalValue"),
        },
      },
    },
    {
      type: "number",
      name: "previousMRS",
      label: t("previousMRS"),
      validationRules: {
        min: { value: 0, message: t("noNegativeNumber") },
        max: { value: 5, message: t("noMoreThan", { max: 5 }) },
        pattern: {
          value: /^\d+$/,
          message: t("noDecimalValue"),
        },
      },
    },
    {
      type: "multiSelect",
      name: "comorbilities",
      label: t("comorbilities"),
      validationRules: {
        validate: requiredMultiSelect(t),
      },
      noneValueId: Comorbilities.none,
      selectOptions: Object.keys(Comorbilities).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "multiSelect",
      name: "riskFactor",
      label: t("riskFactor"),
      validationRules: {
        validate: requiredMultiSelect(t),
      },
      noneValueId: RiskFactors.none,
      selectOptions: Object.keys(RiskFactors).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "number",
      name: "diastolicBloodPressure",
      label: t("diastolicBloodPressure"),
      validationRules: {
        required: { value: true, message: t("requiredField") },
        min: { value: 0, message: t("noNegativeNumber") },
        pattern: {
          value: /^\d+$/,
          message: t("noDecimalValue"),
        },
      },
      endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
    },
    {
      type: "number",
      name: "systolicBloodPressure",
      label: t("systolicBloodPressure"),
      validationRules: {
        required: { value: true, message: t("requiredField") },
        min: { value: 0, message: t("noNegativeNumber") },
        pattern: {
          value: /^\d+$/,
          message: t("noDecimalValue"),
        },
      },
      endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
    },
    {
      type: "number",
      name: "bloodGlucose",
      label: t("bloodGlucose"),
      validationRules: {
        required: { value: true, message: t("requiredField") },
        min: { value: 0, message: t("noNegativeNumber") },
        pattern: {
          value: /^\d+$/,
          message: t("noDecimalValue"),
        },
      },
      endAdornment: <InputAdornment position="end">mg/dl</InputAdornment>,
    },
    {
      type: "number",
      name: "INR",
      label: t("INR"),
      validationRules: {
        min: { value: 0, message: t("noNegativeNumber") },
      },
    },
    {
      type: "switch",
      name: "priorAnticoagulationTherapy",
      label: t("priorAnticoagulationTherapy"),
      falseLabel: t("no"),
      trueLabel: t("yes"),
      onChangeTriggerInputValidation: "anticoagulationType",
    },
    {
      type: "multiSelect",
      name: "anticoagulationType",
      label: t("anticoagulationType"),
      validationRules: {
        validate: data.priorAnticoagulationTherapy && requiredMultiSelect(t),
      },
      disabled: !data.priorAnticoagulationTherapy,
      selectOptions: Object.keys(AnticoagulationType).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "switch",
      name: "priorAntiplateletTherapy",
      label: t("priorAntiplateletTherapy"),
      falseLabel: t("no"),
      trueLabel: t("yes"),
      onChangeTriggerInputValidation: "antiplateletType",
    },
    {
      type: "multiSelect",
      name: "antiplateletType",
      label: t("antiplateletType"),
      validationRules: {
        validate: data.priorAntiplateletTherapy && requiredMultiSelect(t),
      },
      disabled: !data.priorAntiplateletTherapy,
      selectOptions: Object.keys(AntiplateletType).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "date",
      name: "symptomsOnsetDate",
      label: t("symptomsOnsetDate"),
      validationRules: {
        validate: {
          dateIsValid: dateIsValid(t),
          dateIsNotInFuture: dateNotInFuture(t),
        },
      },
    },
    {
      type: "date",
      name: "hospitalArrivalDate",
      label: t("hospitalArrivalDate"),
      validationRules: {
        validate: {
          dateIsValid: dateIsValid(t),
          dateIsNotInFuture: dateNotInFuture(t),
        },
      },
    },
    {
      type: "number",
      name: "initialNIHSS",
      label: t("initialNIHSS"),
      validationRules: {
        min: { value: 0, message: t("noNegativeNumber") },
        max: { value: 42, message: t("noMoreThan", { max: 42 }) },
        pattern: {
          value: /^\d+$/,
          message: t("noDecimalValue"),
        },
      },
    },
    {
      type: "select",
      name: "diagnostic",
      label: t("diagnostic"),
      validationRules: {
        required: { value: true, message: t("requiredField") },
      },
      selectOptions: Object.keys(AVCDiagnostic).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "multiSelect",
      name: "firstImagingType",
      label: t("firstImagingType"),
      validationRules: {
        validate: requiredMultiSelect(t),
      },
      noneValueId: ImagingType.notPerformed,
      onChangeTriggerInputValidation: "firstImagingDate",
      selectOptions: Object.keys(ImagingType).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "date",
      name: "firstImagingDate",
      label: t("firstImagingDate"),
      disabled:
        !data.firstImagingType ||
        data.firstImagingType.some(
          (item) => item.id === ImagingType.notPerformed
        ),
      validationRules: {
        validate: {
          dateIsValid: dateIsValid(t),
          dateIsNotInFuture: dateNotInFuture(t),
          conditionalRequiredDate: (props: any) =>
            conditionalRequiredDate(
              t,
              data.firstImagingType?.some(
                (item) => item.id === ImagingType.notPerformed
              ) ?? true
            )(props),
        },
      },
    },
    {
      type: "number",
      name: "firstImagingASPECTSScore",
      label: t("firstImagingASPECTSScore"),
      disabled:
        data.firstImagingType?.some(
          (item) => item.id === ImagingType.notPerformed
        ) ?? true,
      validationRules: {
        min: { value: 0, message: t("noNegativeNumber") },
        max: { value: 10, message: t("noMoreThan", { max: 10 }) },
        pattern: {
          value: /^\d+$/,
          message: t("noDecimalValue"),
        },
      },
    },
    {
      type: "multiSelect",
      name: "affectedVessels",
      label: t("affectedVessels"),
      validationRules: {
        validate: requiredMultiSelect(t),
      },
      noneValueId: AffectedVesselType.none,
      selectOptions: Object.keys(AffectedVesselType).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "multiSelect",
      name: "administeredReperfusionTreatment",
      label: t("administeredReperfusionTreatment"),
      validationRules: {
        validate: requiredMultiSelect(t),
      },
      onChangeTriggerInputValidation: "thrombolyticTreatmentType",
      selectOptions: Object.keys(ReperfusionTreatmentType).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "date",
      name: "IVThrombolysisDate",
      label: t("IVThrombolysisDate"),
      validationRules: {
        validate: {
          dateIsValid: dateIsValid(t),
          dateIsNotInFuture: dateNotInFuture(t),
        },
      },
    },
    {
      type: "select",
      name: "thrombolyticTreatmentType",
      label: t("thrombolyticTreatmentType"),
      validationRules: {
        validate: {
          required: (value: ThrombolyticTreatmentType | null) =>
            (undefined || null) !== value ||
            !data.administeredReperfusionTreatment?.some(
              (item) =>
                item.id ===
                ReperfusionTreatmentType.cerebralArteryThrombolysisByIntravenousInfusion
            ) ||
            (t("requiredField") as string),
        },
      },
      selectOptions: Object.keys(ThrombolyticTreatmentType).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "switch",
      name: "EVTTransfert",
      label: t("EVTTransfert"),
      falseLabel: t("no"),
      trueLabel: t("yes"),
    },
    {
      type: "date",
      name: "OtherEVTCenterDate",
      label: t("OtherEVTCenterDate"),
      disabled: !data.EVTTransfert,
      validationRules: {
        validate: {
          dateIsValid: dateIsValid(t),
          dateIsNotInFuture: dateNotInFuture(t),
        },
      },
    },
    {
      type: "multiSelect",
      name: "followingImaging",
      label: t("followingImaging"),
      validationRules: {
        validate: requiredMultiSelect(t),
      },
      noneValueId: ImagingType.notPerformed,
      onChangeTriggerInputValidation: "followingImagingDate",
      selectOptions: Object.keys(ImagingType).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "date",
      name: "followingImagingDate",
      label: t("followingImagingDate"),
      disabled:
        !data.followingImaging ||
        data.followingImaging.some(
          (item) => item.id === ImagingType.notPerformed
        ),
      validationRules: {
        validate: {
          dateIsValid: dateIsValid(t),
          dateIsNotInFuture: dateNotInFuture(t),
          conditionalRequiredDate: (props: any) =>
            conditionalRequiredDate(
              t,
              data.followingImaging?.some(
                (item) => item.id === ImagingType.notPerformed
              ) ?? true
            )(props),
        },
      },
    },
    {
      type: "number",
      name: "followingImagingASPECTSScore",
      label: t("followingImagingASPECTSScore"),
      disabled:
        data.followingImaging?.some(
          (item) => item.id === ImagingType.notPerformed
        ) ?? true,
      validationRules: {
        min: { value: 0, message: t("noNegativeNumber") },
        max: { value: 10, message: t("noMoreThan", { max: 10 }) },
        pattern: {
          value: /^\d+$/,
          message: t("noDecimalValue"),
        },
      },
    },
    {
      type: "number",
      name: "NIHSSPrearteriography",
      label: t("NIHSSPrearteriography"),
      validationRules: {
        min: { value: 0, message: t("noNegativeNumber") },
        max: { value: 42, message: t("noMoreThan", { max: 42 }) },
        pattern: {
          value: /^\d+$/,
          message: t("noDecimalValue"),
        },
      },
    },
    {
      type: "date",
      name: "arterialPunctureDate",
      label: t("arterialPunctureDate"),
      validationRules: {
        validate: {
          dateIsValid: dateIsValid(t),
          dateIsNotInFuture: dateNotInFuture(t),
        },
      },
    },
    {
      type: "multiSelect",
      name: "arteriographyAffectedVessel",
      label: t("arteriographyAffectedVessel"),
      validationRules: {
        validate: requiredMultiSelect(t),
      },
      noneValueId: AffectedVesselType.none,
      selectOptions: Object.keys(AffectedVesselType).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "select",
      name: "initialmTiciScore",
      label: t("initialmTiciScore"),
      validationRules: {
        required: { value: true, message: t("requiredField") },
      },
      selectOptions: Object.values(mTICIScore).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "select",
      name: "EVTModality",
      label: t("EVTModality"),
      validationRules: {
        required: { value: true, message: t("requiredField") },
      },
      selectOptions: Object.values(EVTModalityType).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "text",
      name: "deviceModel",
      label: t("deviceModel"),
    },
    {
      type: "number",
      name: "numberOfPasses",
      label: t("numberOfPasses"),
      validationRules: {
        min: { value: 0, message: t("noNegativeNumber") },
        pattern: {
          value: /^\d+$/,
          message: t("noDecimalValue"),
        },
      },
    },
    {
      type: "switch",
      name: "balloonUse",
      label: t("balloonUse"),
      falseLabel: t("no"),
      trueLabel: t("yes"),
    },
    {
      type: "select",
      name: "stent",
      label: t("stent"),
      validationRules: {
        required: { value: true, message: t("requiredField") },
      },
      selectOptions: Object.values(StentType).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "switch",
      name: "newTerritoriesEmbolization",
      label: t("newTerritoriesEmbolization"),
      falseLabel: t("no"),
      trueLabel: t("yes"),
    },
    {
      type: "select",
      name: "finalmTICIScore",
      label: t("finalmTICIScore"),
      validationRules: {
        required: { value: true, message: t("requiredField") },
      },
      selectOptions: Object.values(mTICIScore).map((id) => ({
        id,
        label: t(id),
      })),
    },
    {
      type: "date",
      name: "revascularizationOrEOPDate",
      label: t("revascularizationOrEOPDate"),
      validationRules: {
        validate: {
          dateIsValid: dateIsValid(t),
          dateIsNotInFuture: dateNotInFuture(t),
        },
      },
    },
    {
      type: "switch",
      name: "neuroImagingUnder36Hrs",
      label: t("neuroImagingUnder36Hrs"),
      falseLabel: t("no"),
      trueLabel: t("yes"),
    },
    {
      type: "switch",
      name: "sich",
      label: t("sich"),
      falseLabel: t("no"),
      trueLabel: t("yes"),
    },
    {
      type: "number",
      name: "threeMonthsMRS",
      label: t("threeMonthsMRS"),
      onChangeTriggerInputValidation: "deathDate",
      validationRules: {
        required: { value: true, message: t("requiredField") },
        min: { value: 0, message: t("noNegativeNumber") },
        max: { value: 8, message: t("noMoreThan", { max: 8 }) },
        pattern: {
          value: /^\d+$/,
          message: t("noDecimalValue"),
        },
      },
    },
    {
      type: "date",
      name: "deathDate",
      label: t("deathDate"),
      validationRules: {
        validate: {
          dateIsValid: dateIsValid(t),
          dateIsNotInFuture: dateNotInFuture(t),
          conditionalRequiredDate: conditionalRequiredDate(
            t,
            data.threeMonthsMRS?.toString() !== "6"
          ),
        },
      },
    },
  ];
};

export default patientFormInputProperties;
