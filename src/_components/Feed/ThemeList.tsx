/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import HappyIcon from '../../assets/happy.png';
import NeutralIcon from '../../assets/neutral.png';
import SadIcon from '../../assets/sad.png';

interface ThemeListProps {
  themes: {
    sentiment: number;
    name: string;
  }[];
}

export const ThemeList: React.FC<ThemeListProps> = ({ themes }) => {
  const renderSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case -1:
        return <Avatar aria-label="recipe" src={SadIcon} />;
      case 0:
        return <Avatar aria-label="recipe" src={NeutralIcon} />;
      case 1:
        return <Avatar aria-label="recipe" src={HappyIcon} />;
      default:
        return <></>;
    }
  };

  return (
    <Container>
      {}
      {themes.map((theme, index) => (
        <Container key={index}>
          {renderSentimentIcon(theme.sentiment)}
          <Typography key={index}>{theme.name}</Typography>
        </Container>
      ))}
    </Container>
  );
};
