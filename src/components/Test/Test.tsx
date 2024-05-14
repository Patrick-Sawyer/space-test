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
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4" gutterBottom>
          Space01 Test
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={onButtonClick}
            >
              {showCheapest ? "Show all" : "Show cheapest"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      {itemsToRender.length === 0 ? (
        <Typography variant="body1">No items found</Typography>
      ) : (
        <List>
          {itemsToRender.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.name}
                secondary={`Price: £${item.price}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Test;
