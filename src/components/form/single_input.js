import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback, Col } from 'reactstrap';

const SingleInput = (props) => (
	<FormGroup>
		<Col {...props.colWidth}>
		<Label for="exampleText">{props.title}</Label>
		<Input
			name={props.name}
			type={props.inputType}
			value={props.content}
			onChange={props.changeFunc}
			onBlur={props.blurFunc}
			onFocus={props.focusFunc}
			placeholder={props.placeholder}
		 	valid={props.valid} />
			<FormFeedback>{props.feedback}</FormFeedback>
		</Col>
	</FormGroup>
);

SingleInput.propTypes = {
	inputType: PropTypes.oneOf(['text', 'number']).isRequired,
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	changeFunc: PropTypes.func.isRequired,
	blurFunc: PropTypes.func.isRequired,
	focusFunc: PropTypes.func.isRequired,
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,
	placeholder: PropTypes.string,
	valid: PropTypes.bool.isRequired,
	colWidth: PropTypes.object.isRequired
};

export default SingleInput;
