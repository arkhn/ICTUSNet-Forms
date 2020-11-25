import React from "react";
import {
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  SelectProps,
  FormHelperText,
  FormControl,
} from "@material-ui/core";
import { PatientData } from "state/patientFormSlice";
import { useTranslation } from "react-i18next";

type MultiSelectInputProps = SelectProps & {
  title?: string;
  inputRef?: (ref: any) => void;
  name?: keyof PatientData;
  error?: boolean;
  helperText?: string;
  options: { id: string; label: string }[];
  onChangeValues: (newValues: string[]) => void;
  defaultSelectedValue?: string;
  value: string[];
};

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  title,
  options,
  name,
  onChangeValues,
  defaultSelectedValue,
  helperText,
  ...selectInputProps
}) => {
  const { t } = useTranslation();
  const _onChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const values = event.target.value as string[];
    if (!defaultSelectedValue) {
      return onChangeValues(values);
    }
    const currentValue = selectInputProps.value;
    const noneInCurrentValues = currentValue.some(
      (value) => value === defaultSelectedValue
    );
    const noneInNewValues = values.some(
      (value) => value === defaultSelectedValue
    );
    if (values.length === 0 || (!noneInCurrentValues && noneInNewValues)) {
      onChangeValues([defaultSelectedValue]);
    } else {
      onChangeValues(values.filter((value) => value !== defaultSelectedValue));
    }
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <FormControl style={{ minWidth: 120, maxWidth: 600 }}>
          <Select
            multiple
            fullWidth
            multiline
            name={name}
            {...selectInputProps}
            onChange={_onChange}
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {t(option.label)}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={selectInputProps.error}>
            {helperText}
          </FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default MultiSelectInput;
