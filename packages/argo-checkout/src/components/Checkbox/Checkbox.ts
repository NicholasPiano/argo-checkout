import {createRemoteComponent} from '../../utilities';

export interface CheckboxProps {
  /**
   * A unique identifier for the field. When no `id` is provided,
   * a globally unique value will be used instead.
   */
  id?: string;

  /**
   * An identifier for the field that is unique within the nearest
   * containing `<Form />` component.
   */
  name?: string;

  /**
   * Whether the checkbox is active. This prop is an alias for `checked`,
   * and can be useful in form libraries that provide a normalized API for
   * dealing with both `boolean` and `string` values. If both `value` and
   * `checked` are provided, `checked` takes precedence.
   */
  value?: boolean;

  /**
   * Whether the checkbox is active.
   */
  checked?: boolean;

  /**
   * Whether the checkbox can be changed.
   */
  disabled?: boolean;

  /**
   * An error label to present with the field.
   */
  error?: string;

  /**
   * A label to use for the field that will be used for buyers using
   * assistive technologies. When provided, any `children` supplied to
   * this component are hidden from being seen for accessibility purposes
   * to prevent duplicate content from being read.
   */
  accessibilityLabel?: string;

  /**
   * A callback that is run whenever the checkbox is changed. This callback
   * is called with a boolean indicating whether the checkbox should now be
   * active or inactive. This component is [controlled](https://reactjs.org/docs/forms.html#controlled-components),
   * so you **must** store this value in state and reflect it back in the
   * `checked` or `value` props.
   */
  onChange?(value: boolean): void;
}

/**
 * Checkboxes are used to give buyers a binary option. They are commonly used to
 * present terms and conditions.
 *
 * Unlike most field components, any children passed to this component will be used
 * as the label for the checkbox.
 */
export const Checkbox = createRemoteComponent<'Checkbox', CheckboxProps>(
  'Checkbox',
);
