import React, { Component } from 'react';
import { Form, FormGroup, Button,
	Container, Col, Alert } from 'reactstrap';
import SingleInput from './single_input';
import Select from './select';
import TextArea from './text_area';
import CheckboxOrRadioGroup from './checkbox_or_radio_group';

export default class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {

// textInput = SingleInput Component
// Search for "text" in this file for all Select handling
			textInput: '',
			textInputValid: true,

// category Selection = Select Component
// Search for "category" in this file for all Select handling
			categoryOptions: [ "Art", "Classic", "Fiction", "Biography"],
			categorySelection: "",

// description = TextArea Component
			description: '',

// category Selection = CheckboxOrRadioGroup
// (type checkbox) Component
// Search for "checkbox" in this file for all checkbox handling
			checkBoxSelections: ['Box1', 'Box2', 'Box3', 'Box4',
					'Box5', 'Box6', 'Box7', 'Box8'],
			selectedCheckBoxes: ['Box2', 'Box4'],

// category Selection = CheckboxOrRadioGroup
// (type radiogroup) Component
// Search for "radiogroup" in this file for all radiogroup handling
			radioGroupOptions: ['Yes', 'No'],
			radioGroupSelection: ['Yes'],

			inputInProcess: true,
			formIsValid: true
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);

		this.handleTextInputFocus = this.handleTextInputFocus.bind(this);
		this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleTextInputBlur = this.handleTextInputBlur.bind(this);
		this.textInputValidity = this.textInputValidity.bind(this);

		this.handleCategorySelect = this.handleCategorySelect.bind(this);

		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

		this.handleCheckBoxSelection = this.handleCheckBoxSelection.bind(this);
		this.handleRadioGroupSelection = this.handleRadioGroupSelection.bind(this);

	}

	// textInput functions

	handleTextInputFocus() {
		this.setState( { textInputValid: true,
		 		inputInProcess: true });
	}

	handleTextInputChange(e) {
		this.setState( { inputInProcess: true });
		this.setState({ textInput: e.target.value }, () => {
		});
	}

	handleTextInputBlur() {
		this.textInputValidity();
	}

	textInputValidity() {
		const valid = (this.state.textInput !== false) &&
			(this.state.textInput.replace(/\s/g, '').length !== 0);

		this.setState(() => ({ textInputValid: valid }));
		return valid;
	}

	handleCategorySelect(e) {
		this.setState({ categorySelection: e.target.value });
	}

	handleDescriptionChange(e) {
		this.setState({ description: e.target.value });
	}

	handleCheckBoxSelection(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		if (this.state.selectedCheckBoxes.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.selectedCheckBoxes.filter(s => s !== newSelection);
		} else {
			newSelectionArray = [...this.state.selectedCheckBoxes, newSelection];
		}
		this.setState({ selectedCheckBoxes: newSelectionArray });
	}
	handleRadioGroupSelection(e) {
		this.setState({ radioGroupSelection: [e.target.value] });
	}

	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			textInput: '',
			textInputValid: true,
			categorySelection: '',
			description: '',
			selectedCheckBoxes: [],
			radioGroupSelection: [],
			inputInProcess: true
		});
	}

	handleFormSubmit(e) {
		e.preventDefault();

		this.setState(() => {
			return { inputInProcess: false };
		});

		const formPayload = {
			textInput: this.state.textInput,
			categorySelection: this.state.categorySelection,
			description: this.state.description,
			selectedCheckBoxes: this.state.selectedCheckBoxes,
			radioGroupSelection: this.state.radioGroupSelection
		};
		if (!this.formValidity()) {
			this.setState( { formIsValid: false });
			console.log("In Search/handleFormSubmit. " +
			"formValidity returned false. formPayload: ", formPayload);
			return false;
		}

		this.setState( { formIsValid: true });
		console.log("In Search/handleFormSubmit. Submitting now. formPayload: ", formPayload);
	}

	formValidity() {
		return (this.state.categorySelection !== "" &&
			this.textInputValidity());
	}

	render() {

		const colWidth = { xl: "6", md: "8", sm: "10", xs: "12" };

		return (
			<Container style={{ border: "solid 1px black",
				borderRadius: "10px", margin: "30px", padding: "20px" }}>
				<h2>Search Form</h2>
				<Form onSubmit={this.handleFormSubmit}>
					<SingleInput
						inputType={'text'}
						title={'Title for SingleInput field:'}
						name={'textInput'}
						changeFunc={this.handleTextInputChange}
		        blurFunc={this.handleTextInputBlur}
						focusFunc={this.handleTextInputFocus}
						content={this.state.textInput}
						placeholder={''}
					 	valid={this.state.textInputValid}
					 	feedback = {'Text input is required!'}
						colWidth = {colWidth} />

					<Select
						name={'category'}
						placeholder={'Choose category'}
						required={true}
						controlFunc={this.handleCategorySelect}
						options={this.state.categoryOptions}
						selectedOption={this.state.categorySelection}
						colWidth = {colWidth} />

					<TextArea
						title={'Title for TextArea field:'}
						rows={5}
						resize={true}
						content={this.state.description}
						name={'currentPetInfo'}
						controlFunc={this.handleDescriptionChange}
						placeholder={'Write description here...'}
						colWidth = {colWidth} />

					<CheckboxOrRadioGroup
						title={'Checkbox example'}
						setName={'checkbox'}
						type={'checkbox'}
						controlFunc={this.handleCheckBoxSelection}
						options={this.state.checkBoxSelections}
						selectedOptions={this.state.selectedCheckBoxes}
					 	inline={true}
						colWidth = {colWidth} />

					<CheckboxOrRadioGroup
						title={'RadioGroup example'}
						setName={'radiogroup'}
						controlFunc={this.handleRadioGroupSelection}
						type={'radio'}
						options={this.state.radioGroupOptions}
						selectedOptions={this.state.radioGroupSelection}
					 	inline={false}
						colWidth = {colWidth} />

					<FormGroup>
						<Col {...colWidth}>
						<Button color="link"
							onClick={this.handleClearForm}>Clear form
						</Button>
						<Button type="submit" color="Primary">
							Submit
						</Button>
						</Col>
			 		</FormGroup>
				</Form>

				<FormGroup>
					<Col {...colWidth}>
			{ !this.state.formIsValid && !this.state.inputInProcess &&
				<Alert color="danger">
        	Error in form values. Please check and submit again.
      	</Alert>
			}
			{ this.state.formIsValid && !this.state.inputInProcess &&
				<Alert color="info">
        	Submitting the form...
      	</Alert>
			}
		</Col>
	</FormGroup>

	</Container>
		);
	}
}
