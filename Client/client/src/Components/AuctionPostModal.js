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
import { auctionPostSchema, postSchema } from "../Schema";
import TextField from "@mui/material/TextField";
import { Stack, Chip } from "@mui/material";
import { Cancel } from "@mui/icons-material";

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

const AuctionPostModal = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState(new Date());
  const [hashTagList, setHashTagList] = React.useState(new Set());

  React.useImperativeHandle(ref, () => ({
    handleOpen() {
      setOpen(true);
    },
  }));
  const handleClose = () => {
    // setOpen(false);
    // setValue(false);
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
  } = useForm({ resolver: yupResolver(auctionPostSchema) });

  const onSubmit = async (data) => {
    try {
      data.hashTags = [...hashTagList];
      const today = new Date();
      data.timeOfPost = `${today.getHours()}:${today.getMinutes()}  ${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
      data.auctionDate = `${data.date.getDate()}-${data.date.getMonth()}-${data.date.getFullYear()}  ${data.date.getHours()}:${data.date.getMinutes()}`;
      console.log(data.auctionDate);
      const res = await axios.post("http://localhost:8000/auctions/new", data);
      if (res.data.error) {
        throw new Error(res.data.message);
      } else {
        console.log(res.data);
        handleClose();
      }
    } catch (e) {
      console.log(e.message);
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
                Auction post
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
                name="basePrice"
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
                        error={Boolean(errors.basePrice)}
                      >
                        Base price
                      </MUI.InputLabel>
                      <MUI.OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={
                          <MUI.InputAdornment position="start">
                            ₹
                          </MUI.InputAdornment>
                        }
                        label="Base price"
                        type="numeric"
                        name="basePrice"
                        error={Boolean(errors.basePrice)}
                      />
                      {errors.basePrice && (
                        <MUI.FormHelperText error id="price-error">
                          {errors.basePrice.message}
                        </MUI.FormHelperText>
                      )}
                    </MUI.FormControl>
                  );
                }}
              />
              <Controller
                name="date"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id="datetime-local"
                      label="Auction Date & Time"
                      type="datetime-local"
                      placeholder="dd-mm-yyyy hh:mm"
                      sx={{ width: 250, marginY: "10px" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...field}
                    />
                  );
                }}
              />

              <Controller
                name="venue"
                control={control}
                render={({ field }) => {
                  return (
                    <MUI.TextField
                      autoFocus
                      label="Venue"
                      placeholder="Enter the venue"
                      fullWidth
                      style={TextFieldStyling}
                      {...field}
                      error={Boolean(errors.venue)}
                      helperText={errors.venue ? errors.venue.message : null}
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

export default AuctionPostModal;
