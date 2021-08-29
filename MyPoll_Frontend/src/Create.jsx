import React from "react";
import { Box, Container, TextField, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
	App: {},
}));

function Create() {
	const baseApiURL = "https://my-poll-backend.herokuapp.com/mypolls/";
	const [question, setQuestion] = React.useState({
		title: "",
		options: [],
		totalVotes: 0,
	});
	const [isCreated, setIsCreated] = React.useState(false);
	const [option, setOption] = React.useState([]);
	const [newOption, setNewOption] = React.useState("");
	const [pollId, setPollId] = React.useState();

	const addToOption = () => {
		var newArr = [...question.options, { optionValue: newOption, count: 0 }];
		setOption(newArr);
		setQuestion((previous) => ({
			...previous,
			options: newArr,
		}));
		setNewOption("");
	};
	const deleteOption = (index) => {
		alert("Deleted " + question.options[index].optionValue);
		var array = [...question.options];
		array.splice(index, 1);
		setQuestion((previous) => ({
			...previous,
			options: array,
		}));
	};

	const headers = {
		"Content-Type": "application/json",
	};
	const createPoll = () => {
		axios
			.post(baseApiURL, question, {
				headers: headers,
			})
			.then((reponse) => {
				console.log(reponse);
				setPollId(reponse.data._id);
				setIsCreated(true);
			})
			.catch((error) => {
				console.log(error);
				setIsCreated(false);
			});
	};

	const questionChange = (e) => {
		setQuestion((previous) => ({
			...previous,
			title: e.target.value,
		}));
	};
	function showAlert() {
		navigator.clipboard.writeText("https://my-poll.netlify.app/view/" + pollId);
		Swal.fire({
			position: "top-end",
			icon: "success",
			title: "Link Copied",
			showConfirmButton: false,
			timer: 1500,
		});
	}
	const classes = useStyles();
	return (
		<div className={classes.App}>
			<Container
				maxWidth="xl"
				style={{
					paddingLeft: 0,
					paddingRight: 0,
					backgroundColor: "#fff",
					height: "100vh",
				}}
			>
				{!isCreated ? (
					<Box style={{ backgroundColor: "#F6F4FA" }}>
						<Box
							m={4}
							display="flex"
							flexDirection="column"
							alignItems="center"
						>
							<Box
								m={2}
								style={{
									minWidth: "50%",
									marginBottom: "0",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<h1 fontWeight={900}>Create POll</h1>
								<h5>Complete below feilds to create poll</h5>

								<Box style={{ margin: "0" }} m={2}>
									<hr />
								</Box>

								<h3>Poll Question</h3>

								<TextField
									variant="outlined"
									placeholder="What's your favourite TV show"
									fullWidth
									style={{
										backgroundColor: "#fff",
										outline: "none",
										boxShadow: "10px 10px 10px rgb(0 0 0/0.2)",
										padding: "10px",
									}}
									onChange={(e) => questionChange(e)}
								/>
							</Box>
							{/* <Box width="50%" m={2}>
							<hr />
						</Box> */}
							{question.options.map((item, index) => {
								return (
									<Box width="50%" m={2} key={index}>
										<h4>Option {index + 1}</h4>
										<Box
											style={{
												display: "flex",
												flexDirection: "row",
												justifyContent: "center",
											}}
										>
											<TextField
												variant="outlined"
												value={item.optionValue}
												placeholder="F.R.I.E.N.D.S"
												fullWidth
												style={{
													backgroundColor: "#fff",
													minWidth: "200px",
													padding: "10px",
													boxShadow: "10px 10px 10px rgb(0 0 0/0.2)",
												}}
											/>
											<Button
												variant="contained"
												onClick={() => deleteOption(index)}
												style={{
													backgroundColor: "#faf4f6",
													color: "#000",
												}}
											>
												Dele
											</Button>
										</Box>
									</Box>
								);
							})}
							<Box width="50%" m={2}>
								<hr />
							</Box>
							<Box width="50%" m={2}>
								<Box style={{ display: "flex", flexDirection: "row" }}>
									<TextField
										variant="outlined"
										placeholder="Add Option"
										value={newOption}
										onChange={(e) => setNewOption(e.target.value)}
										fullWidth
										style={{
											backgroundColor: "#fff",
											padding: "10px",
											boxShadow: "10px 10px 10px rgb(0 0 0/0.2)",
										}}
									/>
								</Box>
							</Box>
							<Box width="50%" m={2}>
								<Button
									variant="contained"
									onClick={addToOption}
									style={{
										backgroundColor: "#070B38",
										color: "#fff",
										padding: "15px",
									}}
								>
									Add Another Option +
								</Button>
							</Box>
							<Box width="50%" m={2}>
								<hr />
							</Box>
							<Box width="50%" m={2}>
								<Button
									variant="contained"
									style={{
										backgroundColor: "#69D390",
										color: "#fff",
										padding: "15px",
									}}
									onClick={createPoll}
								>
									Create Poll
								</Button>
							</Box>
						</Box>
					</Box>
				) : (
					<Box
						style={{
							backgroundColor: "#F6F4FA",
							boxShadow: "10px 10px 10px rgb(0 0 0/0.2)",
						}}
					>
						<Box
							m={4}
							display="flex"
							flexDirection="column"
							alignItems="center"
						>
							<Box fontWeight={900} fontSize={30}>
								Your Poll is created ...
							</Box>
							<Box marginTop={1} fontWeight={500} fontSize={15}>
								Access your poll through below
							</Box>
							{/* <Box width="50%" m={2}>
								<Box marginTop={2} marginBottom={1} fontWeight={700}>
									User Link
								</Box>
								<TextField
									variant="outlined"
									placeholder="What's your favourite TV show"
									fullWidth
									style={{
										backgroundColor: "#fff",
										outline: "none",
									}}
									value={baseHostedURL + pollId}
								/>
							</Box> */}
							<Box width="50%" m={2}>
								<h4
									style={{
										border: "2px solid",
										padding: "10px",
										borderRadius: "5px",
									}}
								>
									{"https://my-poll.netlify.app/view/" + pollId}
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
							{/* <Box width="50%" m={2}>
								<Box marginTop={2} marginBottom={1} fontWeight={700}>
									Admin Link
								</Box>
								<TextField
									variant="outlined"
									placeholder="What's your favourite TV show"
									fullWidth
									style={{
										backgroundColor: "#fff",
										outline: "none",
									}}
									value={baseHostedURL + pollId}
								/>
							</Box> */}
						</Box>
					</Box>
				)}
			</Container>
		</div>
	);
}

export default Create;
