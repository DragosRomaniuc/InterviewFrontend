/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Container, Grid, LinearProgress, makeStyles } from '@material-ui/core';
import { Review } from '_domain/Feed/Review';
import { ReviewCard } from './ReviewCard';
import { Theme } from '_domain/Feed/Theme';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 10,
  },
  linearProgress: {
    width: '70%',
  },
}));

interface CustomListProps {
  readonly loading: boolean;
  readonly reviews: Review[];
  readonly selectedThemes: Theme[];
}

export const CustomList = ({
  loading,
  reviews,
  selectedThemes,
}: CustomListProps) => {
  const classes = useStyles();

  if (loading)
    return (
      <Grid container justify="center" className={classes.container}>
        <LinearProgress className={classes.linearProgress} />
        <LinearProgress color="primary" className={classes.linearProgress} />
      </Grid>
    );

  return (
    <Container fixed>
      <Grid
        item
        container
        wrap="wrap"
        justify="space-around"
        alignItems="center"
        direction="row"
        // xs={12}
        style={{
          padding: 20,
        }}
      >
        {reviews.map((review: Review, index) => (
          <ReviewCard
            key={index}
            review={review}
            selectedThemes={selectedThemes}
          />
        ))}
      </Grid>
    </Container>
  );
};
