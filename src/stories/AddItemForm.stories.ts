import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        callBack: {
            description: "button clicked",
        }
    },
}


export default meta;
type Story = StoryObj<typeof AddItemForm>;


export const AddItemFormStory: Story = {
    args: {
        // callBack: action("button clicked!")
    },
};
