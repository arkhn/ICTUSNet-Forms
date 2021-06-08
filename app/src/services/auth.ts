import { deleteTokens } from "../utils/tokenManager";
import { PatientData } from "state/patientFormSlice";
import {
  formatPatientDataForExport,
  formatPatientDataForImport,
} from "utils/formUtils";
import api from "./api";

export const login = async (
  username: string,
  password: string
): Promise<{ username: string; access: string; refresh: string } | null> => {
  try {
    const authTokenResponse = await api.post<{
      access: string;
      refresh: string;
    }>("token/", { username, password });

    const { access, refresh } = authTokenResponse.data;

    if (access && refresh) {
      return { access, refresh, username };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const logout = () => {
  deleteTokens();
};

export const getPatients = async (params?: { page: number; limit: number }) => {
  let offsetParam = "";
  let limitParam = "";

  if (params) {
    const { limit, page } = params;
    limitParam = `?limit=${limit}`;
    offsetParam = `&offset=${limit * page}`;
  }

  const patientsResponse = await api.get<{
    count: number;
    results: { data: { [dataKey: string]: string }; code: string }[];
  }>(`patients/${limitParam}${offsetParam}`);
  const { count, results } = patientsResponse.data;

  if (count > 0) {
    const patients: PatientData[] = results.map((res) => ({
      ...formatPatientDataForImport(res.data),
      id: res.code,
    }));

    return { patients, totalPatients: count };
  } else {
    return { patients: [], totalPatients: 0 };
  }
};

export const addPatient = async (patient: PatientData): Promise<boolean> => {
  const addPatientResponse = await api.post("patients/", {
    data: formatPatientDataForExport()(patient),
  });

  return addPatientResponse.status === 201;
};

const getPatientUrl = async (patientId: string, params?: string): Promise<string | null> => {
  const patientsResponse = await api.get<{
    count: number;
    next: string | null;
    results: {
      data: { [dataKey: string]: string };
      code: string;
      url: string;
    }[];
  }>(`patients/${params ?? ""}`);
  const { results, next } = patientsResponse.data;
  const patient = results.find((r) => r.code === patientId);
  if (patient) return patient.url;
  if (next) return getPatientUrl(patientId, (new URL(next)).search)
  return null;
};

export const deletePatient = async (patientId: string): Promise<boolean> => {
  const patientUrl = await getPatientUrl(patientId);
  if (patientUrl) {
    await api.delete(patientUrl);
    return true;
  } else {
    return false;
  }
};

export const editPatient = async (patient: PatientData): Promise<boolean> => {
  const patientUrl = await getPatientUrl(patient.id);

  if (patientUrl) {
    try {
      await api.put(patientUrl, {
        data: formatPatientDataForExport()(patient),
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  return false;
};
