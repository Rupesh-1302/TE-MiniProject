import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as MUI from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { postSchema } from "../Schema";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const TextFieldStyling = { marginBottom: "10px" };

function ChildModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm('');

  const onSubmit = (data) => {
    console.log(data);
    props.AddHashTagList(data);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        // hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box component="form" noValidate sx={{ ...style, width: 200 }} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => {
              return (
                <MUI.TextField
                  autoFocus
                  label="Title"
                  placeholder="Enter the Title"
                  required
                  fullWidth
                  inputProps={{ inputMode: "numeric" }}
                  style={TextFieldStyling}
                  {...field}
                  error={errors.title}
                  helperText={errors.title ? errors.title.message : null}
                />
              );
            }}
          />
          <Button onClick={handleClose}>Add</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [val, setVal] = React.useState(false);
  const [hashTagList, setHashTagList] = React.useState([]);
  const AddHashTagList = (data) => {
    console.log(data);
    setHashTagList((prevHashTagList) => {
      return [...prevHashTagList, data];
    });
  };

  const handleChangeVal = (event) => {
    console.log(event.target.value);
    setVal((prevVal) => {
      return !prevVal;
    });
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ resolver: yupResolver(postSchema) });

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                style={{
                  display: "flex",
                  color: "grey",
                  justifyContent: "space-between",
                  margin: "10px 0px",
                }}
              >
                Create a post
                <Button onClick={handleClose}>X</Button>
              </Typography>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => {
                  return (
                    <MUI.TextField
                      autoFocus
                      label="Title"
                      placeholder="Enter the Title"
                      required
                      fullWidth
                      // inputProps={{ inputMode: "numeric" }}
                      style={TextFieldStyling}
                      {...field}
                      error={errors.title}
                      helperText={errors.title ? errors.title.message : null}
                    />
                  );
                }}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => {
                  return (
                    <MUI.TextField
                      id="outlined-multiline-flexible"
                      multiline
                      rows={4}
                      label="Description"
                      placeholder="Enter the Description"
                      required
                      fullWidth
                      style={TextFieldStyling}
                      {...field}
                      error={errors.description}
                      helperText={
                        errors.description ? errors.description.message : null
                      }
                    />
                  );
                }}
              />
              <Controller
                name="image"
                control={control}
                render={({ field }) => {
                  return (
                    <MUI.TextField
                      label="Image URL"
                      required
                      fullWidth
                      placeholder="Enter the Image URL"
                      style={TextFieldStyling}
                      {...field}
                      error={errors.title}
                      helperText={errors.title ? errors.title.message : null}
                    />
                  );
                }}
              />
              <Controller
                name="product"
                control={control}
                render={({ field }) => {
                  return (
                    <FormGroup onChange={handleChangeVal} {...field}>
                      <FormControlLabel
                        control={<Checkbox value={val} />}
                        label="Product"
                      />
                    </FormGroup>
                  );
                }}
              />

              {val === true && (
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => {
                    return (
                      <MUI.FormControl
                        fullWidth
                        style={TextFieldStyling}
                        {...field}
                      >
                        <MUI.InputLabel htmlFor="outlined-adornment-amount">
                          Amount
                        </MUI.InputLabel>
                        <MUI.OutlinedInput
                          id="outlined-adornment-amount"
                          startAdornment={
                            <MUI.InputAdornment position="start">
                              ₹
                            </MUI.InputAdornment>
                          }
                          label="Amount"
                          type="numeric"
                          name="productAmount"
                          error={errors.productAmount}
                          helperText={
                            errors.productAmount
                              ? errors.productAmount.message
                              : null
                          }
                        />
                      </MUI.FormControl>
                    );
                  }}
                />
              )}

              <Controller
                name="image"
                control={control}
                render={({ field }) => {
                  return <ChildModal AddHashTagList={AddHashTagList} />;
                }}
              />

              <Button variant="contained" style={{ textAlign: "right" }}>
                Post
              </Button>
            </form>
            <Button
              onClick={() => {
                console.log(hashTagList);
              }}
            >
              Print
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
