/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from 'react-redux';

import React, { useState, useEffect } from 'react';

import {
  Chip,
  Container,
  Grid,
  IconButton,
  makeStyles,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Theme } from '_domain/Feed/Theme';
import { Review, ReviewTheme } from '_domain/Feed/Review';
import { CustomList } from '_components/Feed/CustomList';
import { feedService } from '_services/feed.service';

export const HomePage = () => {
  const user = useSelector((state: any) => state.authentication.user);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<Theme[]>([]);

  const getAllReviews = async () => {
    const reviews = await feedService.getReviews();
    setReviews(reviews);
    console.log(reviews);
  };

  const getAllThemes = async () => {
    const themes = await feedService.getThemes();
    setThemes(themes);
  };

  const getReviewById = async (id: number) => {
    return await feedService.getReviewById(id);
  };

  useEffect(() => {
    getAllReviews();
    getAllThemes();
  }, []);

  const handleAutoComplete = (newValue) => {
    setSelectedThemes(newValue);
    console.log('asd', newValue);
  };

  return (
    <div>
      <Container>
        <Grid
          container
          justify="space-around"
          item
          sm
          xs={12}
          alignContent="center"
          alignItems="center"
        >
          <Autocomplete
            multiple
            id="fixed-tags-demo"
            onChange={(event, newValue) => handleAutoComplete(newValue)}
            options={themes}
            getOptionLabel={(option: any) => option['name']!}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  key={index}
                  label={option['name']}
                  {...getTagProps({ index })}
                />
              ))
            }
            style={{ minWidth: '50vw' }}
            renderInput={(params) => (
              <form>
                <TextField
                  {...params}
                  id="filled-basic"
                  label="Filter by theme"
                  variant="outlined"
                  placeholder={`Filter by theme`}
                />
              </form>
            )}
          />
        </Grid>

        <CustomList
          loading={false}
          reviews={reviews || []}
          selectedThemes={selectedThemes}
        />
      </Container>
    </div>
  );
};

export default HomePage;
