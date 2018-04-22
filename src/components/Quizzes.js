import React from "react";
// import Modal from "react-modal";

class Quizzes extends React.Component {
	render_quiz(quiz, key) {
		let local_image = false,
			// font_size_name =
			// 	typeof quiz.name === "undefined"
			// 		? "25px"
			// 		: quiz.name.length >= "15"
			// 			? "34px"
			// 			: "36px",
			image_id =
				typeof quiz.image === "undefined"
					? "https://drive.google.com/open?id=1QwSSN4kXEERbydtgpomfuqw9-RSw4PfH" // Kasala is default image obviously
					: quiz.image.substring(0, 5) === "/img/"
						? (local_image = true)
						: `https://drive.google.com/uc?export=view&id=${new URL(
								quiz.image,
						  ).searchParams.get("id")}`;

		
		return (
			<div className="col-4 no-padding" key={key}>
				<a
					href={quiz.link}
					target="_blank"
				>
					<img
						src={
							local_image
								? process.env.PUBLIC_URL + quiz.image
								: image_id
						}
						className="img-fluid"
						alt={quiz.name}
						// style={{ display: "block", maxWidth: "100%"}}
					/>
				</a>
			</div>
		);
	}

	render() {
		console.log(this.props.list);

		return (
			<div className="row">
				{Object.keys(this.props.list).map(key =>
					this.render_quiz(this.props.list[key], key),
				)}
				<div className="col-lg-4 col-sm-12" style={{ height: "100%" }}>
					<h1
						className="orange josefinSlab text-center"
						style={{ height: "100%", padding: "70px" }}
					>
						That's all Folks!
					</h1>
				</div>
			</div>
		);
	}
}

export default Quizzes;
