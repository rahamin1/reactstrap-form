import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label, Col } from 'reactstrap';

const CheckboxOrRadioGroup = (props) => {
	return (
		<FormGroup>
			<Col {...props.colWidth}>
				<Label>{props.title}</Label>
					{props.options.map(option => {
						return (
							<FormGroup check inline={props.inline} key={option}>
							<Label check>
								<Input
									name={props.setName}
									onChange={props.controlFunc}
									value={option}
									checked={props.selectedOptions.indexOf(option) > -1}
									type={props.type} /> {option}
							</Label>
							</FormGroup>
						);
					})}
				</Col>
			</FormGroup>
	);
};

CheckboxOrRadioGroup.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
	setName: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array,
	controlFunc: PropTypes.func.isRequired,
	inline: PropTypes.bool,
	colWidth: PropTypes.object.isRequired
};

export default CheckboxOrRadioGroup;
