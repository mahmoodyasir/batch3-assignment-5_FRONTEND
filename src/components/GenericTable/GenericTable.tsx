import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Typography,
    TableBody,
} from "@mui/material";

type Props = {
    columns: Record<string, { width: number }>;
    data: JSX.Element[];
};

function GenericTable(props: Props) {
    const { columns, data } = props;

    return (
        <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-1 rounded-lg mx-2">
            <TableContainer className="bg-white rounded-lg">
                <Table className="w-full">
                    {/* Table Head with Gradient */}
                    <TableHead>
                        <TableRow className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white">
                            {Object.entries(columns).map(([column, col_vals], index) => (
                                <TableCell key={index} sx={{ width: col_vals.width }}>
                                    <Typography className="font-semibold text-center">
                                        {column}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {/* Table Body */}
                    <TableBody>{data}</TableBody>

                </Table>
            </TableContainer>
        </div>
    );
}

export default GenericTable;
