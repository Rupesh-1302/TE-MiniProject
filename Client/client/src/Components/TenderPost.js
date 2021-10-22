import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { makeStyles } from "@mui/styles";
import { Menu, MenuItem } from "@mui/material";

const useStyles = makeStyles({
  Heading: {
    fontWeight: 700,
  },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TenderPost({ tender }) {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Card sx={{ maxWidth: 600, width: 600, boxShadow: 3 }}>
      <CardHeader
        disableTypography={true}
        avatar={
          tender.author.profileImage ? (
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="user profile pic"
              src={tender.author.profileImage}
            ></Avatar>
          ) : (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {tender.author.firstName[0].toUpperCase()}
            </Avatar>
          )
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              open={open}
              anchorEl={anchorEl}
              onClose={() => {
                setAnchorEl(null);
              }}
            >
              <MenuItem>Learn More</MenuItem>
            </Menu>
          </>
        }
        title={
          <Typography varient="h4" className={classes.Heading}>
            {tender.author.username}
          </Typography>
        }
        subheader={
          <Typography varient="subtitle1">{tender.timeOfPost}</Typography>
        }
      />
      <CardContent>
        <Typography variant="h6" className={classes.Heading}>
          {tender.title.toUpperCase()}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Typography variant="h6">Max-Bid : {tender.maxBid}</Typography>
          <Typography variant="h6">
            Expire Date : {tender.expireDate}
          </Typography>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="save">
          <BookmarkIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{tender.desc}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
