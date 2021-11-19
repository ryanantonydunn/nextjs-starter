import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ButtonVariant } from './index';
import styles from './index.module.css';

export default {
	title: 'atoms/button',
	component: Button,
	argTypes: {
		variant: {
			description: 'Controls the style of button',
			defaultValue: 'primary',
			control: {
				type: 'select',
				options: ['primary', 'secondary'],
			},
		},
		children: {
			name: 'text',
			type: { name: 'string', required: false },
			defaultValue: 'Button',
			control: {
				type: 'text',
			},
		},
		disabled: {},
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
	return (
		<div className={styles.storybookBg}>
			<Button {...args} />
		</div>
	);
};

export const Primary = Template.bind({});
Primary.args = { variant: ButtonVariant.Primary };

export const Secondary = Template.bind({});
Secondary.args = { variant: ButtonVariant.Secondary };

export const Disabled = Template.bind({});
Disabled.args = { variant: ButtonVariant.Primary, disabled: true };
