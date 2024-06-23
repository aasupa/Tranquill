// src/scenes/GameSelection.jsx
import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WhackAMoleWidget from "./Whackamole/WhackAMoleWidget";

const GameSelection = () => {
  const navigate = useNavigate();

  return (
    <Box padding="2rem">
      <Typography variant="h3" textAlign="center" marginBottom="2rem">
        Select a Game to Play
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea onClick={() => navigate("/whackamole")}>
              <CardContent>
                <Typography variant="h5" textAlign="center">
                  Whack-a-Mole
                </Typography>
                <WhackAMoleWidget />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea onClick={() => navigate("/tictactoe")}>
              <CardContent>
                <Typography variant="h5" textAlign="center">
                  Tic-Tac-Toe
                </Typography>
                {/* Add Tic-Tac-Toe widget here */}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GameSelection;
