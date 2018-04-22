import React from "react";
// import quizzes from "./quizzes";
// import base from "./base";
import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";
import QCNavbar from "./QCNavbar";
import Quizzes from "./Quizzes";
// import { ProgressBar } from "reprogressbars";
import axios from "axios";

class Home extends React.Component {
	constructor() {
		super();

		// this.sortquizzes = this.sortquizzes.bind(this);

		this.state = {
			quizzes: {},
			loaded: false,
			isLoading: true,
		};
	}

	componentWillMount() {
		const api_key = "AIzaSyB5FLnTEzfV-YrVPf7eUNFkQu9h9VJmGK4",
			sheet_id = "12NHbUqy1RMqQGMzH9_NMQBIsr1IgV17D95BE2iw6nUI",
			range = "A2:G420",
			sheet = "Sheet2",
			url = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/${sheet}!${range}`;
		// https://docs.google.com/spreadsheets/d/1YW-pT3FHxJ51x5F9PoWJTwSWtn0kS2KtC0-7jAkrOYs/edit?usp=sharing
		const final = `${url}?key=${api_key}`;
		console.log(`request at ${final}`);

		axios
			.get(url, {
				params: {
					key: api_key,
				},
			})
			.then(response => {
				// call function here
				this.setState({
					isLoading: false,
					loaded: true,
				});
				console.log(response);

				this.process_google_spreadsheet(response);
			})
			.catch(error => {
				// this.setState({
				// 	clicked_get_from_sheet: true,
				// });
				alert(error, "asdasdasdasd");
			});
	}

	process_google_spreadsheet(sheet) {
		let sheet_data = sheet.data.values; // this is an array
		let new_quizzes = [];

		Object.keys(sheet_data).forEach(i => {
			let new_quiz = {};
			// eslint-disable-next-line
			(new_quiz[`name`] = sheet_data[i][1]),
				(new_quiz[`image`] = sheet_data[i][2]),
				(new_quiz[`link`] = sheet_data[i][3]),
				new_quizzes.unshift(new_quiz);
		});

		this.setState({
			quizzes: new_quizzes,
		});
	}

	render() {
		// this.get_quizzes();
		return (
			<div className="black-bg">
				{/* <ProgressBar
					isLoading={this.state.isLoading}
					// className="fixed-progress-bar"
					color="#f73d1c"
					useBoxShadow="true"
					height="3px"
				/> */}
				<QCNavbar />
				{this.state.loaded ? (
					<React.Fragment>
						<Header heading="Quizzes by The Quiz Club @ NIT Warangal" />
						<Quizzes list={this.state.quizzes} />
						<Footer />
					</React.Fragment>
				) : (
					<Loader message="Loading" />
				)}
			</div>
		);
	}
}

export default Home;
