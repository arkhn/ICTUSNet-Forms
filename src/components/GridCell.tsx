import React, { ReactNode } from "react";
import clsx from "clsx";
import {
  TableCell,
  makeStyles,
  Theme,
  createStyles,
  Tooltip,
} from "@material-ui/core";
import { GridCellProps } from "react-virtualized";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableCell: {
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
    },
    hover: {
      "&:hover": {
        backgroundColor: theme.palette.grey[300],
        cursor: "pointer",
      },
    },
    selectedTableCell: {
      backgroundColor: theme.palette.secondary.light,
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
    tooltipSpan: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      WebkitLineClamp: 3,
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
    },
    tableCellContent: {
      overflowX: "hidden",
      textOverflow: "ellipsis",
      width: "100%",
    },
  })
);

type CustomGridCellProps = GridCellProps & {
  className?: string;
  tooltipEnterDelay?: number;
  value: string | number;
  onCellClick?: () => void;
  onMouseOver?: () => void;
  endAdornment?: ReactNode;
  hover?: boolean;
};

const GridCell: React.FC<CustomGridCellProps> = ({
  style,
  tooltipEnterDelay = 500,
  value,
  onCellClick,
  endAdornment,
  onMouseOver,
  className,
  hover = true,
}) => {
  const classes = useStyles();
  return (
    <TableCell
      style={style}
      className={clsx(classes.tableCell, className)}
      component="div"
      onClick={onCellClick}
      onMouseOver={onMouseOver}
    >
      <Tooltip
        arrow
        enterDelay={tooltipEnterDelay}
        title={<span className={classes.tooltipSpan}>{value}</span>}
      >
        <span className={classes.tableCellContent}>{value}</span>
      </Tooltip>
      {endAdornment}
    </TableCell>
  );
};

export default GridCell;
