import React from "react";
import {
	Box,
	Container,
	TextField,
	Button,
	Typography,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		color: "#060B39",
	},
}));

function Admin() {
	const classes = useStyles();
	const [question, setQuestion] = React.useState({
		title: "",
		options: [],
	});
	const [option, setOption] = React.useState(["Option1", "Option2"]);
	const [answer, setAnswer] = React.useState("");

	const submitChoice = () => {
		alert(answer);
	};

	const handleChange = (event) => {
		setAnswer(event.target.value);
	};
	return (
		<div className={classes.root}>
			<Container
				maxWidth="xl"
				style={{
					paddingLeft: 0,
					paddingRight: 0,
					backgroundColor: "#fff",
					height: "100vh",
				}}
			>
				<Box style={{ backgroundColor: "#F6F4FA" }}>
					<Box m={4} display="flex" flexDirection="column" alignItems="center">
						<Box width="50%" m={2} style={{ marginBottom: "0" }}>
							<Typography variant="h3" component="h2" gutterBottom fullWidth>
								Select you country
							</Typography>
						</Box>
						<Box width="50%" m={2}>
							<hr />
						</Box>
						<Box width="50%" m={2}>
							<FormControl
								component="fieldset"
								style={{ display: "flex", justifyContent: "flexStart" }}
							>
								<RadioGroup
									aria-label="gender"
									name="gender1"
									value={answer}
									onChange={handleChange}
								>
									{option.map((item, index) => {
										return (
											<Box
												style={{
													display: "flex",
													flexDirection: "row",
													backgroundColor: "#fff",
													width: "100%",
													margin: "5px",
													padding: "10px",
												}}
											>
												<FormControlLabel
													value={item}
													control={<Radio />}
													label={item}
												/>
											</Box>
										);
									})}
								</RadioGroup>
							</FormControl>
						</Box>

						<Box width="50%" m={2}>
							<hr />
						</Box>

						<Box width="50%" m={2}>
							<Button
								variant="contained"
								onClick={submitChoice}
								style={{
									backgroundColor: "#070B38",
									color: "#fff",
									padding: "15px",
								}}
							>
								Submit
							</Button>
						</Box>
					</Box>
				</Box>
			</Container>
		</div>
	);
}

export default Admin;

/* sdfsd
question: "What is your country?"
options:[
    {value:"India",
    count:0    
    },
    {value:"POK",
    count:0    
    },
]
*/
