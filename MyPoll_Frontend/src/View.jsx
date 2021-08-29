import React from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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

function View() {
	const classes = useStyles();
	const { id } = useParams();
	const [question, setQuestion] = React.useState({
		title: "This Poll no longer exist",
		options: [],
	});
	const [answer, setAnswer] = React.useState("");
	const history = useHistory();

	React.useEffect(() => {
		// alert(id);
		const getPollUrl = `https://my-poll-backend.herokuapp.com/mypolls/${id}`;
		axios.get(getPollUrl).then((response) => {
			console.log(response);
			setQuestion(response.data);
		});

		var submittedIndex = localStorage.getItem(id);
		if (submittedIndex === null) {
		} else {
			Swal.fire("You have already submitted your vote.");
			var tempRoute = `/result/${id}`;
			history.push(tempRoute);
		}
	}, []);

	const submitChoice = () => {
		if (answer === "") {
			alert("SELECT A ANSWER");
		} else {
			// alert(answer);
			var tempArr = [...question.options];
			console.log(tempArr);
			tempArr[Number(answer)].count = tempArr[Number(answer)].count + 1;
			console.log(tempArr);

			setQuestion((previous) => ({
				...previous,
				options: tempArr,
			}));

			const patchPollUrl = `https://my-poll-backend.herokuapp.com/mypolls/${id}`;
			axios
				.patch(patchPollUrl, question)
				.then((response) => {
					console.log(response);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		Swal.fire({
			title: "Your response has been recorded",
			text: "Click on below button to view result",
			icon: "success",
			showCancelButton: false,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "View Result",
		}).then((result) => {
			if (result.isConfirmed) {
				localStorage.setItem(id, Number(answer));
				var tempRoute = `/result/${id}`;
				history.push(tempRoute);
			}
		});
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
						</Box>
						<Box width="50%" m={2}>
							<hr />
						</Box>
						<Box style={{ minWidth: "50%" }} m={2}>
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
									{question.options.map((item, index) => {
										return (
											<Box
												key={index + 1}
												boxShadow={1}
												style={{
													display: "flex",
													flexDirection: "row",
													backgroundColor: "#fff",
													width: "100%",
													margin: "5px",
													padding: "20px",
													boxShadow: "10px 10px 10px rgb(0 0 0/0.2)",
												}}
											>
												<FormControlLabel
													value={index.toString()}
													control={<Radio />}
													label={item.optionValue}
													style={{ fontSize: "30px" }}
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
									backgroundColor: "#69D390",
									color: "#fff",
									padding: "15px",
								}}
							>
								Submit Your Vote
							</Button>
						</Box>
					</Box>
				</Box>
			</Container>
		</div>
	);
}

export default View;

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
