import React from "react";
import { Box, Divider, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, TextField } from "@mui/material";
import { ChevronRight, Loop, Search } from "@mui/icons-material";
import { useQueryParams } from "../hooks/QueryParamsContext";
import { databases, DB, DBTest } from "../lib/appwrite";
import { Query } from "appwrite";
import { pad } from "../lib/utils";

export default function SideMenu() {
  const {queryParams, updateQueryParams} = useQueryParams();

  const [search, setSearch] = React.useState("");
  const [tests, setTests] = React.useState<DBTest[]>();

  React.useEffect(() => {
    databases.listDocuments(DB.ID, DB.TESTS)
    .then((v) => setTests(v.documents as DBTest[]))
    .catch((e) => console.error(e));
  }, []);

  return (
    <Paper elevation={1} sx={{
      padding: 2,
      width: 300,
      maxHeight: '95vh',
      flex: '0 0 auto',
      position: 'sticky',
      top: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      <h2>Interaktív tesztek</h2>
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="filled"
        label="Keresés"
        sx={{ borderRadius: 1, overflow: 'hidden' }}
        slotProps={{
          input: {
            disableUnderline: true,
            endAdornment: <InputAdornment position="end"><Search /></InputAdornment>,
          },
        }}
      />
      <List sx={{overflowY: 'auto', flex: 1, position: 'relative'}}>
        {tests ? (
          [...new Set(tests.map((test) => [test.profession_id, test.profession])).values()].map(([pid, pname]) => (
            <div style={{display: 'contents'}} key={pid}>
              <ListSubheader sx={{
                backgroundColor: 'inherit',
                lineHeight: 1.2,
                paddingBottom: 1,
                paddingTop: 2,
              }}>
                ({pid})<br/>{pname}
              </ListSubheader>
              {tests.filter((test) => test.profession_id === pid).map((test) => (
                <ListItemButton
                  key={test.$id}
                  selected={queryParams.t === test.$id}
                  onClick={() => {updateQueryParams({ t: test.$id, q: "" })}}
                >
                  <ListItemIcon>
                    <ChevronRight />
                  </ListItemIcon>
                  <ListItemText primary={`${test.year}/${pad(test.month, 2)}`} />
                </ListItemButton>
              ))}
            </div>
          ))
        ) : (
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Loop sx={{animation: 'spin 1s linear infinite reverse'}} />
            <p>Tesztek betöltése...</p>
          </Box>
        )}
      </List>
      <Divider />
      <footer style={{
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
      }}>
          <p style={{color: 'gray'}}>© 2025 Minden jog fenntartva</p>
          <p style={{color: 'gray'}}>Készítette: <a href="https://github.com/varma02">varma02@Github</a></p>
      </footer>
    </Paper>
  );
}