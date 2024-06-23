import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./WhackAMole.css"; // Ensure this CSS file handles both the widget and full game styles

const WhackAMoleWidget = () => {
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoles(Array(9).fill(false));
      const randomIndex = Math.floor(Math.random() * 9);
      setMoles((prevMoles) => {
        const newMoles = [...prevMoles];
        newMoles[randomIndex] = true;
        return newMoles;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [moles]);

  const handleMoleClick = (index) => {
    if (moles[index]) {
      setScore((prevScore) => prevScore + 1);
      setMoles((prevMoles) => {
        const newMoles = [...prevMoles];
        newMoles[index] = false;
        return newMoles;
      });
    }
  };

  return (
    <Box
      sx={{
        width: 300,
        padding: 2,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
      onClick={() => navigate("/whackamole")} // Navigate to full game on click
    >
      <Typography variant="h6" align="center">Whack-a-Mole</Typography>
      <Typography variant="subtitle1" align="center">Score: {score}</Typography>
      <Box className="grid" sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
        {moles.map((mole, index) => (
          <Box
            key={index}
            className={`mole ${mole ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when mole is clicked
              handleMoleClick(index);
            }}
            sx={{
              width: 50,
              height: 50,
              backgroundColor: mole ? "primary.main" : "grey.300",
              borderRadius: 1,
            }}
          ></Box>
        ))}
      </Box>
    </Box>
  );
};

export default WhackAMoleWidget;
