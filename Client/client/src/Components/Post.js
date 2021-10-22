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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { makeStyles } from "@mui/styles";
import { Stack, Chip } from "@mui/material";

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

export default function Post({ post }) {
  console.log(post);
  const [expanded, setExpanded] = React.useState(false);

  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let hashTags = [];

  if (post.Tags) {
    hashTags = [...post.Tags].map((hashTag) => {
      return <Chip label={`#${hashTag}`} key={`${hashTag}`} />;
    });
  }

  return (
    <Card sx={{ maxWidth: 600, width: 600, boxShadow: 3 }}>
      <CardHeader
        disableTypography={true}
        avatar={
          post.author.profileImage ? (
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="user profile pic"
              src={post.author.profileImage}
            ></Avatar>
          ) : (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {post.author.firstName[0].toUpperCase()}
            </Avatar>
          )
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography varient="h4" className={classes.Heading}>
            {post.author.username}
          </Typography>
        }
        subheader={
          <Typography varient="subtitle1">{post.timeOfPost}</Typography>
        }
      />
      <CardMedia
        component="img"
        height="500"
        image={post.imageURL}
        alt="Paella dish"
      />
      <CardContent>
        {Boolean(hashTags) === true ? (
          <Stack direction="row" spacing={1} sx={{ marginBottom: "5px" }}>
            {hashTags}
          </Stack>
        ) : null}
        <Typography variant="h6" className={classes.Heading}>
          {post.title.toUpperCase()}
        </Typography>
        {post.product ? (
          <Typography variant="h6" color="text.secondary">
            Price: {post.price}-/rs
          </Typography>
        ) : null}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
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
          <Typography paragraph>{post.desc}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
