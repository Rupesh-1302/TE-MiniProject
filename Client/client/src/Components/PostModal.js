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
import { Stack, Chip } from "@mui/material";
import { Cancel } from "@mui/icons-material";

axios.defaults.withCredentials = true;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  overflow: "auto",
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const TextFieldStyling = { marginBottom: "10px" };

function ChildModal(props) {
  const [open, setOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = async () => {
    await props.AddHashTagList(keyword);
    handleClose();
  };

  const handleChange = (e) => {
    setKeyword(() => {
      return e.target.value;
    });
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} sx={{ display: "block" }}>
        Add Tags
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box component="form" sx={{ ...style, width: 200 }}>
          <MUI.TextField
            autoFocus
            label="keyword"
            placeholder="Enter Hashtag"
            required
            fullWidth
            style={TextFieldStyling}
            onChange={handleChange}
          />
          <Button type="button" onClick={handleClick}>
            Add
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const TransitionsModal = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  React.useImperativeHandle(ref, () => ({
    handleOpen() {
      setOpen(true);
    },
  }));
  const handleClose = () => {
    reset();
    setVal(false);
    setHashTagList(new Set());
    setOpen(false);
  };

  const [val, setVal] = React.useState(false);
  const [hashTagList, setHashTagList] = React.useState(new Set());
  const AddHashTagList = (data) => {
    setHashTagList((prevHashTagList) => {
      return new Set([...prevHashTagList, data.toLowerCase()]);
    });
  };

  const handleChangeVal = (event) => {
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
    try {
      data.hashTags = [...hashTagList];
      const today = new Date();
      data.timeOfPost = `${today.getHours()}:${today.getMinutes()}  ${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
      console.log(data.timeOfPost);
      const res = await axios.post("http://localhost:8000/posts/new", data);
      if (res.data.error) {
        console.log(res.data.message);
      } else {
        console.log(res.data);
        handleClose();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = (tag) => () => {
    console.log(tag);
    const newHashTagList = [...hashTagList].filter(
      (hashTag) => hashTag !== tag
    );
    setHashTagList(new Set(newHashTagList));
  };

  const hashTags = [...hashTagList].map((hashTag) => {
    return (
      <Chip
        label={`${hashTag}`}
        onDelete={handleDelete(hashTag)}
        key={`${hashTag}`}
      />
    );
  });
  return (
    <>
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
                <Button onClick={handleClose}>
                  <Cancel />
                </Button>
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
                      fullWidth
                      style={TextFieldStyling}
                      {...field}
                      error={Boolean(errors.title)}
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
                      fullWidth
                      style={TextFieldStyling}
                      {...field}
                      error={Boolean(errors.description)}
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
                      fullWidth
                      placeholder="Enter the Image URL"
                      style={TextFieldStyling}
                      {...field}
                      error={Boolean(errors.image)}
                      helperText={errors.image ? errors.image.message : null}
                    />
                  );
                }}
              />
              <Controller
                name="product"
                control={control}
                defaultValue={val}
                render={({ field }) => {
                  return (
                    <FormGroup onChange={handleChangeVal}>
                      <FormControlLabel
                        control={<Checkbox value={val} />}
                        label="Product"
                        {...field}
                      />
                    </FormGroup>
                  );
                }}
              />

              {val === true && (
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => {
                    return (
                      <MUI.FormControl
                        fullWidth
                        style={TextFieldStyling}
                        {...field}
                      >
                        <MUI.InputLabel
                          htmlFor="outlined-adornment-amount"
                          error={Boolean(errors.price)}
                        >
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
                          name="price"
                          error={Boolean(errors.price)}
                        />
                        {errors.price && (
                          <MUI.FormHelperText error id="price-error">
                            {errors.price.message}
                          </MUI.FormHelperText>
                        )}
                      </MUI.FormControl>
                    );
                  }}
                />
              )}

              {Boolean(hashTagList) === true ? (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    flexWrap: "wrap",
                    height: "100px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    gap: "7px",
                  }}
                >
                  {hashTags}
                </Stack>
              ) : null}

              <ChildModal AddHashTagList={AddHashTagList} />

              <Button
                variant="contained"
                style={{ textAlign: "right" }}
                type="submit"
              >
                Post
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
});

export default TransitionsModal;
