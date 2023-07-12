import type {Meta, StoryObj} from '@storybook/react';
import {EditableSpan} from "../components/EditableSpan/EditableSpan";

const meta:  Meta<typeof EditableSpan> = {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  tags: ['autodocs'],
  argTypes: {
    oldTitle: {
    },
    callBack: {
      description: "title changed",
    }
  },
}

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
  args: {

},
};

