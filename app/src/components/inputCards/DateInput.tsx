import React from "react";
import { Card, CardContent, Typography, FormControl } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useTranslation } from "react-i18next";

type DateInputProps = {
  name: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
};

const DateInput: React.FC<DateInputProps> = ({ name, ...props }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{t(name)}</Typography>
        <FormControl style={{ minWidth: 120, maxWidth: 600 }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              disableFuture
              fullWidth
              ampm={false}
              variant="inline"
              format="dd/MM/yyyy HH:mm"
              margin="normal"
              id={`${name}-date-picker`}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              {...props}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default DateInput;
