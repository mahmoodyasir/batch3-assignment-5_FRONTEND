import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { ServiceData } from "../../../utils";
import { editService, insertService } from "../../../ApiGateways/service";


type ServiceFormTDialogType = {
    onClose: () => void;
    updateService: (product: ServiceData) => void;
    createService: (product: ServiceData) => void;
    open: boolean;
    formValues: ServiceData;
    setFormValues: React.Dispatch<React.SetStateAction<ServiceData>>;
    initialFormState: ServiceData;
}


const ServiceForm = (props: ServiceFormTDialogType) => {

    const { onClose, updateService, createService, open, formValues, setFormValues } = props;

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = (event: any) => {

        event.preventDefault();

        if (formValues?._id) {
            editService(formValues?._id, formValues,
                (data) => {
                    updateService(data?.data);
                    handleClose();
                },
                (res) => console.log(res)
            )
        }
        else {
            insertService(formValues,
                (data) => {
                    createService(data?.data);
                    handleClose();
                },
                (res) => console.log(res)
            )
        }
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{formValues?._id ? 'Update The Service' : 'Add New Service'}</DialogTitle>
                <DialogContent>

                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        label="Service Name"
                        name="name"
                        fullWidth
                        value={formValues.name}
                        onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    />


                    <TextField
                        required
                        margin="dense"
                        label="Price"
                        name="price"
                        type="number"
                        fullWidth
                        value={formValues.price}
                        onChange={(e) => setFormValues({ ...formValues, price: Number(e.target.value) })}
                    />


                    <TextField
                        required
                        margin="dense"
                        label="Description"
                        name="description"
                        multiline
                        rows={3}
                        fullWidth
                        value={formValues.description}
                        onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    />


                    <TextField
                        required
                        margin="dense"
                        label="Service Duration"
                        name="duration"
                        type="number"
                        fullWidth
                        value={formValues.duration}
                        onChange={(e) => setFormValues({ ...formValues, duration: Number(e.target.value) })}
                    />

                </DialogContent>


                <DialogActions>
                    <Button variant='outlined' onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button variant='outlined' onClick={handleSubmit} color="primary">
                        {formValues?._id ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ServiceForm
