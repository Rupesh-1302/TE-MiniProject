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
import foodImage from "../assets/slashio-photography-plwBDw9x5cE-unsplash.jpg";
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

export default function AuctionPost() {
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
    <Card sx={{ maxWidth: 600, width: 600 }}>
      <CardHeader
        disableTypography={true}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
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
            Rupesh Agarwal
          </Typography>
        }
        subheader={
          <Typography varient="subtitle1">September 14, 2016</Typography>
        }
      />
      <CardMedia
        component="img"
        height="500"
        image={foodImage}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          <Typography varient="h6">
            Venue : b/678 abjhncsnkjshkj kjniknskl slkjlsm
          </Typography>
          <Typography varient="h6">Time : 12:30 pm</Typography>
          <Typography varient="h6">Base Price : 50,000/- rs</Typography>
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
