import React from "react";
import { Box, Container, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

function Header() {
	const [question, setQuestion] = React.useState("");
	const [option, setOption] = React.useState([]);
	const [newOption, setNewOption] = React.useState("");

	const addToOption = () => {
		var newArr = [...option, newOption];
		setOption(newArr);
		setNewOption("");
	};
	const deleteOption = (index) => {
		alert("Deleted " + option[index]);
		var array = [...option];
		array.splice(index, 1);
		setOption(array);
	};
	return (
		<div className="App">
			<Container
				maxWidth="xl"
				style={{
					paddingLeft: 0,
					paddingRight: 0,
					backgroundColor: "#fff",
				}}
			>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					width={1}
					m={2}
				>
					<Box
						fontWeight="fontWeightBold"
						fontFamily="Monospace"
						fontSize={30}
						width={1}
						textAlign="center"
					>
						⚡Rapid Poll
					</Box>
					<Box
						fontFamily="Monospace"
						fontSize={16}
						m={1}
						width={1}
						textAlign="center"
					>
						Create anonymous polls for free
					</Box>
				</Box>
			</Container>
		</div>
	);
}

export default Header;
