import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/app/hooks"
import { deleteService, getServices } from "../../../ApiGateways/service";
import { setServices } from "../../../Redux/features/serviceSlice";
import { Button, Dialog, DialogActions, DialogTitle, TableCell, TableRow } from "@mui/material";
import { ServiceData } from "../../../utils";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GenericTable from "../../../components/GenericTable/GenericTable";
import ServiceForm from "./ServiceForm";

const ServiceControl = () => {

    const serviceState = useAppSelector((state) => state.serviceState);
    const dispatch = useAppDispatch();

    const initialFormState = {
        name: "",
        description: "",
        price: 0,
        duration: 0,
        isDeleted: false,
    }

    const [formValues, setFormValues] = useState<ServiceData>(initialFormState);
    const [open, setOpen] = useState(false);
    const [deleteServiceData, setDeleteServiceData] = useState({
        open: false,
        id: "",
        index: 0,
    });


    const filter = {
        search: "",
        minPrice: null,
        maxPrice: null,
        minDuration: null,
        maxDuration: null,
        sortBy: ""
    }

    useEffect(() => {
        getServices(filter,
            (data) => {
                dispatch(setServices(data?.data))
            },
            (res) => console.log(res)
        )
    }, []);

    const columns = {
        Name: { width: 50 },
        Description: { width: 250 },
        Price: { width: 100 },
        Duration: { width: 100 },
        Action: { width: 120 },
    };

    const handleDeleteService = (id: string, index: number) => {
        deleteService(id,
            (data) => {
                if (data?.success === true) {
                    const temp = [...serviceState];
                    temp.splice(index, 1);
                    dispatch(setServices(temp));
                }
            },
            (res) => console.log(res)
        )
    };

    const DescriptionWithToggle = ({ text, limit }: { text: string, limit: number }) => {
        const [isExpanded, setIsExpanded] = useState(false);

        const toggleExpansion = () => {
            setIsExpanded(!isExpanded);
        };

        const truncatedText = text.length > limit ? text.slice(0, limit) + '...' : text;

        return (
            <div>
                <span>{isExpanded ? text : truncatedText}</span>
                {text.length > limit && (
                    <Button onClick={toggleExpansion} color="primary" sx={{ textTransform: 'none' }}>
                        {isExpanded ? 'See less' : 'See more'}
                    </Button>
                )}
            </div>
        );
    };

    const createTableRows = (services: ServiceData[]) =>
        services?.map((service: ServiceData, index: number) => (
            <TableRow key={index}>
                <TableCell sx={{ textAlign: "center" }}>{service?.name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                    <DescriptionWithToggle text={service?.description} limit={100} />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{service?.price}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{service?.duration}</TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                    <Button color="info" onClick={() => {
                        setDeleteServiceData({
                            open: false,
                            id: service?._id || '',
                            index: index,
                        });
                        setFormValues(service);
                        setOpen(true);
                    }}>
                        <EditIcon />
                    </Button>
                    <Button
                        color="error"
                        onClick={() => {
                            setDeleteServiceData({
                                open: true,
                                id: service?._id || '',
                                index: index,
                            });
                        }}
                    >
                        <DeleteIcon />
                    </Button>
                </TableCell>
            </TableRow>
        ));

    return (
        <div className="mt-4">

            <div className='px-2 mb-4'>
                <Button onClick={() => { setOpen(true) }} className='bg-green-500 hover:opacity-75 text-white'>Add Service</Button>
            </div>

            <Dialog
                fullWidth
                open={deleteServiceData?.open}
                onClose={() => setDeleteServiceData({ ...deleteServiceData, open: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Do you want to delete this service ? `}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={() => setDeleteServiceData({ ...deleteServiceData, open: false })} variant='outlined' color='error'>No</Button>
                    <Button onClick={() => {
                        handleDeleteService(deleteServiceData?.id, deleteServiceData?.index);
                        setDeleteServiceData({
                            open: false,
                            id: "",
                            index: 0,
                        })

                    }} variant='outlined' color='success'>Yes</Button>
                </DialogActions>
            </Dialog>

            <ServiceForm
                open={open}
                onClose={() => {
                    setOpen(false);
                    setFormValues(initialFormState);
                }}
                updateService={(data) => {
                    const temp = [...serviceState];
                    temp.splice(deleteServiceData?.index, 1);
                    dispatch(setServices([data, ...temp]));
                }}
                createService={(data) => {
                    dispatch(setServices([data, ...serviceState]));
                }}
                formValues={formValues}
                setFormValues={setFormValues}
                initialFormState={initialFormState}
            />

            <div className="">
                <GenericTable
                    columns={columns}
                    data={createTableRows(serviceState)}
                />
            </div>
        </div>
    )
}

export default ServiceControl
