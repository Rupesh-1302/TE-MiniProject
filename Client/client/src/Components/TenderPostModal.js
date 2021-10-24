import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as MUI from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { tenderPostSchema } from "../Schema";
import { Stack, Chip } from "@mui/material";
import TextField from "@mui/material/TextField";
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

const TenderPostModal = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [hashTagList, setHashTagList] = React.useState(new Set());

  React.useImperativeHandle(ref, () => ({
    handleOpen() {
      setOpen(true);
    },
  }));
  const handleClose = () => {
    setHashTagList(new Set());
    setOpen(false);
  };

  const AddHashTagList = (data) => {
    setHashTagList((prevHashTagList) => {
      return new Set([...prevHashTagList, data.toLowerCase()]);
    });
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ resolver: yupResolver(tenderPostSchema) });

  const onSubmit = async (data) => {
    try {
      data.hashTags = [...hashTagList];
      const today = new Date();
      data.timeOfPost = `${today.getHours()}:${today.getMinutes()}  ${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
      data.tenderDate = `${data.expireDate.getDate()}-${data.expireDate.getMonth()}-${data.expireDate.getFullYear()}  ${data.expireDate.getHours()}:${data.expireDate.getMinutes()}`;
      console.log(data);
      const res = await axios.post("http://localhost:8000/tenders/new", data);
      if (res.data.error) {
        throw new Error(res.data.message);
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
        sx={TextFieldStyling}
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
                Tender post
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
                name="maxBid"
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
                        error={Boolean(errors.maxbid)}
                      >
                        MaxBid
                      </MUI.InputLabel>
                      <MUI.OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={
                          <MUI.InputAdornment position="start">
                            ₹
                          </MUI.InputAdornment>
                        }
                        label="Max Bid"
                        type="numeric"
                        name="maxbid"
                        error={Boolean(errors.maxbid)}
                      />
                      {errors.maxbid && (
                        <MUI.FormHelperText error id="price-error">
                          {errors.maxbid.message}
                        </MUI.FormHelperText>
                      )}
                    </MUI.FormControl>
                  );
                }}
              />

              <Controller
                name="expireDate"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id="datetime-local"
                      label="Expire Date"
                      type="datetime-local"
                      placeholder="dd-mm-yyyy hh:mm"
                      sx={{ width: 250 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...field}
                    />
                  );
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  flexWrap: "wrap",
                  height: "50px",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {hashTags}
              </Stack>

              <ChildModal AddHashTagList={AddHashTagList} />

              <Button variant="contained" type="submit">
                Post
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
});

export default TenderPostModal;
