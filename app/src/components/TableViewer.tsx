import React, { useState } from "react";
import clsx from "clsx";
import {
  ScrollSync,
  AutoSizer,
  Grid,
  GridCellRenderer,
} from "react-virtualized";
import { makeStyles, TableCell, Checkbox, Fab } from "@material-ui/core";
import { Delete, Create } from "@material-ui/icons";
import { PatientData, PatientColumnData } from "state/patientFormSlice";
import { useTranslation } from "react-i18next";
import GridCell from "./GridCell";

const HEADER_HEIGHT = 68;
const ROW_HEIGHT = 54;
const CHECKBOX_COLUMN_WIDTH = 54;
const COLUMN_WIDTH = 200;
const FAB_GRID_WIDTH = 100;
const LEFT_GRID_WIDTH = 2 * CHECKBOX_COLUMN_WIDTH;

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.background.paper,
  },
  leftSideGridContainer: {
    position: "absolute",
    left: 0,
  },
  gridColumn: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
  },
  hoveredRow: {
    backgroundColor: theme.palette.grey[200],
  },
  selectedRow: {
    backgroundColor: theme.palette.secondary.light,
  },
  tableCell: {
    display: "flex",
    alignItems: "center",
  },
  rightSideCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  centeredFlexContainer: {
    justifyContent: "center",
  },
  grid: {
    "&:focus": {
      outline: "none",
    },
  },
  noScrollBar: {
    overflow: "hidden !important",
  },
  redFab: {
    backgroundColor: "#FF7A7B",
    "&:hover": {
      backgroundColor: "#c8494f",
    },
  },
}));

type TableViewerProps = {
  data: PatientData[];
  columns: PatientColumnData;
  selectedRowIds?: string[];
  onRowSelect?: (rowIds: string[]) => void;
  onClickEdit?: (rowId: string) => void;
  onClickDelete?: (rowId: string) => void;
};

const TableViewer: React.FC<TableViewerProps> = ({
  data,
  onClickDelete,
  onClickEdit,
  onRowSelect,
  selectedRowIds,
  columns,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  const onCickCheckBox = (selectAll: boolean, rowIndex?: number) => () => {
    if (onRowSelect && selectedRowIds) {
      if (selectAll) {
        let newSelectedRowIndexes: string[] = [];
        if (selectedRowIds.length === 0) {
          newSelectedRowIndexes = data.map((item) => item.id);
        }
        onRowSelect(newSelectedRowIndexes);
      } else {
        if (undefined !== rowIndex) {
          const rowId = data[rowIndex].id;
          const newSelectedRowIndexes = [...selectedRowIds];
          const removeIndex = newSelectedRowIndexes.findIndex(
            (id) => id === rowId
          );
          if (removeIndex > -1) {
            newSelectedRowIndexes.splice(removeIndex, 1);
          } else {
            newSelectedRowIndexes.push(rowId);
          }
          onRowSelect(newSelectedRowIndexes);
        }
      }
    }
  };

  const renderLeftHeaderCell: GridCellRenderer = ({
    style,
    key,
    columnIndex,
  }) => {
    return (
      <TableCell
        key={key}
        padding="checkbox"
        className={clsx(classes.tableCell, classes.centeredFlexContainer)}
        component="div"
        align="left"
        style={style}
      >
        {columnIndex === 0 ? (
          <Checkbox
            checked={data.length > 0 && selectedRowIds?.length === data.length}
            indeterminate={
              selectedRowIds &&
              selectedRowIds.length > 0 &&
              selectedRowIds.length < data.length
            }
            onChange={onCickCheckBox(true)}
          />
        ) : (
          <span>#</span>
        )}
      </TableCell>
    );
  };

  const renderLeftSideCell: GridCellRenderer = ({
    style,
    rowIndex,
    key,
    columnIndex,
  }) => {
    const rowId = data[rowIndex].id;
    const isRowSelected = selectedRowIds?.some((id) => id === rowId);
    return (
      <TableCell
        key={key}
        padding="checkbox"
        component="div"
        className={clsx(classes.tableCell, {
          [classes.selectedRow]: isRowSelected && rowIndex !== hoveredRowIndex,
          [classes.hoveredRow]: rowIndex === hoveredRowIndex,
        })}
        style={style}
        onMouseOver={() => setHoveredRowIndex(rowIndex)}
      >
        {columnIndex === 0 ? (
          <Checkbox
            checked={selectedRowIds?.some((id) => id === rowId)}
            onChange={onCickCheckBox(false, rowIndex)}
          />
        ) : (
          <span>{rowIndex + 1}</span>
        )}
      </TableCell>
    );
  };

  const renderRightSideCell: GridCellRenderer = ({ rowIndex, style, key }) => {
    const rowId = data[rowIndex].id;
    return (
      <div
        key={key}
        className={clsx(classes.rightSideCell)}
        style={style}
        onMouseOver={() => setHoveredRowIndex(rowIndex)}
      >
        {rowIndex === hoveredRowIndex && (
          <>
            <Fab
              size="small"
              color="secondary"
              onClick={() => onClickEdit && onClickEdit(rowId)}
            >
              <Create htmlColor="white" />
            </Fab>
            <Fab
              size="small"
              className={classes.redFab}
              onClick={() => onClickDelete && onClickDelete(rowId)}
            >
              <Delete htmlColor="white" />
            </Fab>
          </>
        )}
      </div>
    );
  };

  const renderHeaderCell: GridCellRenderer = (props) => {
    const { columnIndex } = props;
    const columnLabel = t(columns[columnIndex].label);
    return (
      <GridCell value={columnLabel} className={classes.tableCell} {...props} />
    );
  };

  const renderBodyCell: GridCellRenderer = (props) => {
    const { columnIndex, rowIndex } = props;
    const rowId = data[rowIndex].id;
    const columnKey = columns[columnIndex].dataKey;
    const value = data[rowIndex][columnKey];
    const isRowSelected = selectedRowIds?.some((id) => id === rowId);
    let cellContent: string | number = "";
    switch (typeof value) {
      case "boolean":
        cellContent = value ? (t("yes") as string) : (t("no") as string);
        break;
      case "number":
      case "string":
        cellContent = t(value.toString()) as string;
        break;
      case "object":
        if (null !== value) {
          if (value instanceof Date) {
            cellContent = `${value.getDate()}/${
              value.getMonth() + 1
            }/${value.getFullYear()} ${value.toLocaleTimeString()}`;
          } else if (Array.isArray(value)) {
            cellContent = value
              //@ts-ignore
              .map((val: any) =>
                val.id ? (t(val.id) as string) : (t(val) as string)
              )
              .join(" | ");
          } else if (value.id) {
            cellContent = t(value.id).toString();
          }
        }
        break;
      default:
        break;
    }
    return (
      <GridCell
        value={cellContent}
        className={clsx(classes.tableCell, {
          [classes.selectedRow]: isRowSelected && rowIndex !== hoveredRowIndex,
          [classes.hoveredRow]: rowIndex === hoveredRowIndex,
        })}
        onMouseOver={() => setHoveredRowIndex(rowIndex)}
        onCellClick={onCickCheckBox(false, rowIndex)}
        {...props}
      />
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <ScrollSync>
            {({ onScroll, scrollLeft, scrollTop }) => {
              return (
                <div
                  className={classes.tableContainer}
                  style={{ height, width }}
                >
                  <div
                    //Trick to prevent scroll-lagging between scrollsynced columns
                    style={{
                      zIndex: 100,
                      pointerEvents: "none",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      willChange: "transform",
                    }}
                  />
                  <div
                    className={classes.leftSideGridContainer}
                    style={{ top: 0 }}
                  >
                    <Grid
                      className={clsx(classes.grid)}
                      cellRenderer={renderLeftHeaderCell}
                      columnCount={2}
                      rowCount={1}
                      columnWidth={CHECKBOX_COLUMN_WIDTH}
                      width={LEFT_GRID_WIDTH}
                      rowHeight={HEADER_HEIGHT}
                      height={HEADER_HEIGHT}
                    />
                  </div>
                  <div
                    className={classes.leftSideGridContainer}
                    style={{ top: HEADER_HEIGHT }}
                  >
                    <Grid
                      className={clsx(classes.grid, classes.noScrollBar)}
                      cellRenderer={renderLeftSideCell}
                      width={LEFT_GRID_WIDTH}
                      height={height - HEADER_HEIGHT}
                      columnWidth={CHECKBOX_COLUMN_WIDTH}
                      rowHeight={ROW_HEIGHT}
                      columnCount={2}
                      rowCount={data.length}
                      scrollTop={scrollTop}
                    />
                  </div>
                  <div
                    className={classes.gridColumn}
                    style={{
                      position: "absolute",
                      left: LEFT_GRID_WIDTH,
                    }}
                  >
                    <Grid
                      className={clsx(classes.grid, classes.noScrollBar)}
                      height={HEADER_HEIGHT}
                      width={width - LEFT_GRID_WIDTH}
                      columnWidth={COLUMN_WIDTH}
                      columnCount={columns.length}
                      rowHeight={HEADER_HEIGHT}
                      rowCount={1}
                      scrollLeft={scrollLeft}
                      cellRenderer={renderHeaderCell}
                    />
                    <Grid
                      className={clsx(classes.grid)}
                      height={height - HEADER_HEIGHT}
                      width={width - LEFT_GRID_WIDTH}
                      columnCount={columns.length}
                      columnWidth={COLUMN_WIDTH}
                      rowCount={data.length}
                      rowHeight={ROW_HEIGHT}
                      onScroll={onScroll}
                      scrollTop={scrollTop}
                      cellRenderer={renderBodyCell}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                    }}
                  >
                    <Grid
                      className={clsx(classes.grid, classes.noScrollBar)}
                      height={height - HEADER_HEIGHT}
                      width={FAB_GRID_WIDTH}
                      cellRenderer={renderRightSideCell}
                      columnCount={1}
                      rowCount={data.length}
                      columnWidth={FAB_GRID_WIDTH}
                      rowHeight={ROW_HEIGHT}
                      scrollTop={scrollTop}
                    />
                  </div>
                </div>
              );
            }}
          </ScrollSync>
        );
      }}
    </AutoSizer>
  );
};

export default TableViewer;
