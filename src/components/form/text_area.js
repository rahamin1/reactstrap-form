import React from 'react';
import { Input, FormGroup, Col, Label } from 'reactstrap';
import PropTypes from 'prop-types';

const TextArea = (props) => (
	<FormGroup>
		<Col {...props.colWidth}>
			<Label>{props.title}</Label>
			<Input type="textarea"
				style={props.resize ? null : { resize: 'none' }}
				name={props.name}
				rows={props.rows}
				value={props.content}
				onChange={props.controlFunc}
				placeholder={props.placeholder} />
		</Col>
	</FormGroup>
);

TextArea.propTypes = {
	title: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	resize: PropTypes.bool,
	placeholder: PropTypes.string,
	controlFunc: PropTypes.func.isRequired,
	colWidth: PropTypes.object.isRequired
};

export default TextArea;
