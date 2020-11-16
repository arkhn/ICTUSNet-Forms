import React, { useState } from "react";
import clsx from "clsx";
import {
  ButtonGroup,
  Button,
  ClickAwayListener,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { ArrowDropDown, Publish } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  fab: {
    width: "auto",
    height: 48,
    minWidth: 48,
    minHeight: "auto",
    borderRadius: 24,
    overflow: "hidden",
    color: "white",
  },
  button: {
    color: "white",
  },
}));

type CSVExportButtonProps = {
  fabClassName?: string;
  disabled?: boolean;
  onClickExport?: (buttonIndex: number) => void;
  buttonOptions: string[];
};

const CSVExportButton: React.FC<CSVExportButtonProps> = ({
  fabClassName,
  disabled,
  onClickExport,
  buttonOptions,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const handleClick = () => {
    onClickExport && onClickExport(selectedIndex);
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <ButtonGroup
        className={clsx(fabClassName, classes.fab)}
        variant="contained"
        color="secondary"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          onClick={handleClick}
          disabled={disabled}
          className={classes.button}
        >
          <Publish />
          {t(buttonOptions[selectedIndex])}
        </Button>
        <Button
          size="small"
          aria-controls={isOpen ? "split-button-menu" : undefined}
          aria-expanded={isOpen ? "true" : undefined}
          aria-label="select export type"
          aria-haspopup="menu"
          onClick={handleToggle}
          className={classes.button}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                <MenuList id="split-button-menu">
                  {buttonOptions.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {t(option)}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default CSVExportButton;
