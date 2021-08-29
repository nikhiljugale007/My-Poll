import React from "react";
import { Box, Container, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header.jsx";
import Create from "./Create.jsx";
import View from "./View.jsx";
import Admin from "./Admin.jsx";
import Results from "./Results.jsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));

function App() {
	return (
		<div className="App">
			<Container
				maxWidth="xl"
				style={{
					paddingLeft: 0,
					paddingRight: 0,
					backgroundColor: "#fff",
					minHeight: "100vh",
				}}
			>
				<Header />
				<main>
					<Switch>
						<Route path="/" component={Create} exact />
						<Route path="/view/:id" component={View} />
						<Route path="/result/:id" component={Results} />
						<Route path="/admin" component={Admin} />
					</Switch>
				</main>
			</Container>
		</div>
	);
}

export default App;
