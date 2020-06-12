import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from 'axios';

const useStyles = makeStyles({
    form: {
        padding: "10px"
    }
});

export default function TemporaryDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [geocode, setGeocode] = React.useState("");
    const [resultType, setResultType] = React.useState("");
    const [file, setFile] = React.useState(null);

    const fileOnChangeHandler = (event) => {
        setFile(event.target.files[0]);
    };
    const onClickHandler = () => {
        const data = new FormData();
        data.append('file', file);
        axios.post("/upload", data, {
            withCredentials: true
        })
            .then(res => { // then print response status
                console.log(res.statusText);
            });
    };

    const toggleDrawer = open => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);
    };
    const handleQuery = e => {
        setQuery(e.target.value);
    };
    const handleGeocode = e => {
        setGeocode(e.target.value);
    };
    const handleResult = e => {
        setResultType(e.target.value);
    };
    const onFormSubmit = e => {
        e.preventDefault();
        const data = {
            query: query,
            geocode: geocode,
            resultType: resultType,

        };
        console.log(data);

    };
    const handleSubmit = e => {
        props.handleSubmit();
    };

    const list = () => (
        <div className={classes.form} role="presentation">
            <form onSubmit={onFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item>
                        <TextField
                            id="filled-multiline-flexible"
                            label="Query"
                            multiline
                            rowsMax={4}
                            value={query}
                            onChange={handleQuery}
                            type="search"
                            placeholder="A UTF-8, URL-encoded search query of 500 characters maximum, including operators. Queries may additionally be limited by complexity."
                            variant="filled"
                            required
                            helperText="*Required filed"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="filled-multiline-flexible"
                            label="Geocode"
                            multiline
                            rowsMax={4}
                            value={geocode}
                            onChange={handleGeocode}
                            placeholder="latitude,longitude,radius"
                            variant="filled"
                        />
                    </Grid>
                    <Grid item>
                        <FormControl component="fieldset" required>
                            <FormLabel component="legend">Result Type</FormLabel>
                            <RadioGroup
                                aria-label="Result Type"
                                name="gender1"
                                value={resultType}
                                onChange={handleResult}
                            >
                                <FormControlLabel
                                    value="mixed"
                                    control={<Radio />}
                                    label="Popular and Regular"
                                />
                                <FormControlLabel
                                    value="regular"
                                    control={<Radio />}
                                    label="Regular Tweets"
                                />
                                <FormControlLabel
                                    value="popular"
                                    control={<Radio />}
                                    label="Popular Tweets"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="filled-number"
                            label="Number"
                            type="number"
                            InputLabelProps={{
                                shrink: true
                            }}
                            variant="filled"
                            helperText="Max 100"
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>

            </form>
            <hr />
            <div>
                <input type="file" name="file" onChange={fileOnChangeHandler} />
                <Button variant="contained" color="primary" onClick={onClickHandler}>
                    Upload
                </Button>
            </div>
        </div >
    );

    return (
        <div>
            <React.Fragment key="bottom">
                <Button color='inherit' onClick={toggleDrawer(true)}>Search Tweets</Button>
                <Drawer anchor="bottom" open={state} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
