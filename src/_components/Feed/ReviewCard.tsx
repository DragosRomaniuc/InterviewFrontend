/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Review, ReviewTheme } from '_domain/Feed/Review';
import ReviewIcon from 'assets/review.png';
import { ThemeList } from './ThemeList';
import { feedService } from '_services/feed.service';
import { Theme } from '_domain/Feed/Theme';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    padding: 20,
    marginTop: 25,
    border: '1px solid #70B8FF',
    borderRadius: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(10deg)',
  },
}));

interface ReviewCardProps {
  readonly review: Review;
  readonly selectedThemes: Theme[];
}

export const ReviewCard = ({ review, selectedThemes }: ReviewCardProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [fetchedThemes, setThemes] = useState<
    {
      sentiment: number;
      name: string;
    }[]
  >([]);

  const fetchThemes = async (items: ReviewTheme[]) => {
    const themes: Theme[] = await Promise.all(
      items.map((item) => feedService.getThemeById(item.theme_id))
    );

    const themesWithSentiments = items.map((item) => ({
      sentiment: item.sentiment,
      name: themes.find((th) => item.theme_id === th.id).name,
    }));

    const filteredThemes = themesWithSentiments.filter((item) =>
      selectedThemes.map((_theme) => _theme.name).includes(item.name)
    );

    setShowCard(filteredThemes.length > 0);

    setThemes(themesWithSentiments);
  };

  useEffect(() => {
    fetchThemes(review.themes);
  }, [selectedThemes]);
  // const [people, setPeople] = React.useState<Character[]>();
  // const [loading, setLoading] = React.useState<boolean>(false);

  const handleExpandClick = async () => {
    setExpanded(!expanded);
  };

  if (!review || !showCard) return <></>;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={ReviewIcon} />}
        title={`Review Created At: ${moment(review.created_at).format(
          'DD-MM-YYYY HH:MM'
        )}`}
      />
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {review.comment}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Typography>Details about themes</Typography>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ThemeList themes={fetchedThemes} />
        </CardContent>
      </Collapse>
    </Card>
  );
};
