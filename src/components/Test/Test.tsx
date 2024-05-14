import { useState } from "react";

import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Box,
  Grid,
  styled,
} from "@mui/material";

const data = [
  { name: "Item A", price: 125 },
  { name: "Item B", price: 230 },
  { name: "Item C", price: 295 },
  { name: "Item D", price: 245 },
  { name: "Item E", price: 900 },
  { name: "Item F", price: 875 },
  { name: "Item G", price: 235 },
  { name: "Item H", price: 400 },
];

const Colors = {
  background: "#121212",
  cardBackground: "#212121",
  primary: "#03dac6",
  text: "#ffffff",
  mutedText: "rgba(255,255,255,0.7)",
};

const Test = () => {
  const [filter, setFilter] = useState<string>("");
  const [showCheapest, setShowCheapest] = useState<boolean>(true);
  const sorted = data.sort((a, b) => a.price - b.price);

  const filtered = sorted.filter(
    ({ name }) => !filter || name.toLowerCase().includes(filter.toLowerCase())
  );

  const itemsToRender = showCheapest ? filtered.slice(0, 5) : filtered;

  const onButtonClick = () => {
    setShowCheapest(!showCheapest);
  };

  return (
    <Container style={{ background: Colors.background }}>
      <Box mt={2} mb={2}>
        <Typography variant="h4" gutterBottom style={{ color: Colors.primary }}>
          Space01 Test
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Search"
              variant="outlined"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                background: Colors.cardBackground,
                color: Colors.text,
              }}
              InputProps={{
                style: {
                  color: Colors.text,
                },
              }}
              InputLabelProps={{
                style: {
                  color: Colors.mutedText,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{
                background: Colors.primary,
                color: Colors.background,
                fontWeight: "bold",
              }}
              onClick={onButtonClick}
            >
              {showCheapest ? "Show all" : "Show cheapest"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mb={2}>
        {itemsToRender.length === 0 ? (
          <Typography variant="body1" style={{ color: Colors.primary }}>
            No items found
          </Typography>
        ) : (
          <List>
            {itemsToRender.map((item, index) => (
              <ListItem
                key={index}
                style={{ background: Colors.cardBackground }}
              >
                <ListItemText
                  primary={item.name}
                  secondary={`Price: £${item.price}`}
                  style={{ color: Colors.text }}
                  secondaryTypographyProps={{ color: Colors.mutedText }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

const CustomTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${Colors.primary};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${Colors.primary};
    }
  }
`;

export default Test;
