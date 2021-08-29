import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
import LinearProgress from "@material-ui/core/LinearProgress";
import Swal from "sweetalert2";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		color: "#060B39",
	},
}));
var MAX = 100;
const normalise = (value, max) => {
	if (max === 0) {
		return 0;
	} else {
		return (value * 100) / max;
	}
};

const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 10,
		borderRadius: 5,
	},
	colorPrimary: {
		backgroundColor:
			theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
	},
	bar: {
		borderRadius: 5,
		backgroundColor: "#1a90ff",
	},
}))(LinearProgressWithLabel);

function LinearProgressWithLabel(props) {
	return (
		<Box display="flex" alignItems="center">
			<Box width="100%" mr={1}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2" color="textSecondary">{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
}

function Results() {
	const classes = useStyles();
	const { id } = useParams();
	const [max, setMax] = React.useState(100);
	const [answer, setAnswer] = React.useState(-1);
	var [yourVote, setYourVote] = React.useState("");
	var baseURL = "https://my-poll.netlify.app/result/";
	const [question, setQuestion] = React.useState({
		title: "What is your country ?",
		options: [
			{ optionValue: "Option1", count: 0 },
			{ optionValue: "Option2", count: 0 },
		],
		totalVotes: 0,
	});

	const headers = {
		"Content-Type": "application/json",
	};
	React.useEffect(() => {
		//alert(id);
		const getPollUrl = `https://my-poll-backend.herokuapp.com/mypolls/${id}`;
		axios
			.get(getPollUrl, {
				headers: headers,
			})
			.then((response) => {
				console.log(response);
				setQuestion(response.data);
			});

		var submittedIndex = localStorage.getItem(id);
		if (submittedIndex != null) {
			// setAnswer(submittedIndex);
			// console.log(question);
		}
	}, []);

	function showAlert() {
		navigator.clipboard.writeText(baseURL + id);
		Swal.fire({
			position: "top-end",
			icon: "success",
			title: "Link Copied",
			showConfirmButton: false,
			timer: 1500,
		});
	}
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
						<Box
							m={2}
							style={{
								minWidth: "50%",
								marginBottom: "0",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<h1 fontWeight={900}>{question.title}</h1>
							<h4>Total votes: {question.totalVotes}</h4>
						</Box>
						<Box width="50%" m={2}>
							<hr />
						</Box>
						<Box style={{ minWidth: "50%" }} m={2}>
							<FormControl
								component="fieldset"
								style={{ display: "flex", justifyContent: "flexStart" }}
							>
								<RadioGroup aria-label="gender" name="gender1" value={answer}>
									{question.options.map((item, index) => {
										return (
											<Box
												key={index + 1}
												boxShadow={1}
												style={{
													display: "flex",
													flexDirection: "column",
													backgroundColor: "#fff",
													width: "100%",
													margin: "5px",
													padding: "20px",
													boxShadow: "10px 10px 10px rgb(0 0 0/0.2)",
												}}
											>
												<div
													style={{
														display: "flex",
														flexDirection: "row",
														justifyContent: "space-between",
													}}
												>
													<div style={{ display: "flex" }}>
														<FormControlLabel
															value={index.toString()}
															control={<Radio />}
															label=""
														/>
														<h4>{item.optionValue}</h4>
													</div>

													<h4 style={{ marginRight: "10px" }}>
														Votes : {item.count}
													</h4>
												</div>
												<BorderLinearProgress
													value={normalise(item.count, question.totalVotes)}
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
							<h4
								style={{
									border: "2px solid",
									padding: "10px",
									borderRadius: "5px",
									maxWidth: "100%",
								}}
							>
								Result URL = {" " + baseURL + id}
							</h4>
							<Button
								variant="contained"
								onClick={() => {
									showAlert();
								}}
								style={{
									backgroundColor: "#070B38",
									color: "#fff",
									padding: "15px",
								}}
							>
								Copy
							</Button>
						</Box>
					</Box>
				</Box>
			</Container>
		</div>
	);
}

export default Results;

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
