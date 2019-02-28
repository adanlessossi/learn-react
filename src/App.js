import React, { Component } from "react";
import Radium, { StyleRoot } from "radium";
import Person from "./Person/Person";
import "./App.css";

class App extends Component {
	state = {
		persons: [
			{ id: "lkd", name: "Ben", age: 43 },
			{ id: "uea", name: "Mike", age: 33 },
			{ id: "3fi", name: "Omar", age: 39 }
		],
		showPerson: false
	};

	togglePersonHandler = () => {
		const show = this.state.showPerson;
		this.setState({ showPerson: !show });
	};

	deletePersonHandler = personIndex => {
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({ persons: persons });
	};

	nameChangeHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex(p => {
			return p.id === id;
		});
		const person = { ...this.state.persons[personIndex] };

		person.name = event.target.value;

		const persons = [...this.state.persons];
		persons[personIndex] = person;
		this.setState({
			persons: persons
		});
	};

	render() {
		const style = {
			backgroundColor: "green",
			color: "white",
			font: "inherit",
			border: "1px solid blue",
			padding: "8px",
			cursor: "pointer",
			":hover": {
				backgroundColor: "lightgreen",
				color: "black"
			}
		};

		let persons = null;
		if (this.state.showPerson) {
			persons = (
				<div>
					{this.state.persons.map((person, index) => {
						return (
							<Person
								key={person.id}
								click={() => this.deletePersonHandler(index)}
								changed={event => this.nameChangeHandler(event, person.id)}
								name={person.name}
								age={person.age}
							/>
						);
					})}
				</div>
			);
			style.backgroundColor = "red";
			style[":hover"] = {
				backgroundColor: "salmon",
				color: "black"
			};
		}

		const classes = [];
		if (this.state.persons.length <= 2) {
			classes.push("red");
		}
		if (this.state.persons.length <= 1) {
			classes.push("bold");
		}

		return (
			<StyleRoot>
				<div className="App">
					<h1>Welcome</h1>
					<p className={classes.join(" ")}>It's really works!</p>
					<button style={style} onClick={this.togglePersonHandler}>
						Switch Names
					</button>
					{persons}
				</div>
			</StyleRoot>
		);
	}
	//return React.createElement("div", { className: "App" }, React.createElement( "h1", null, "Working Raw!!!" ));
}

export default Radium(App);
