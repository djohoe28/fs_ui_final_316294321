/**
 * SubmitButton component.
 *
 * @description This component displays a submit button with a given text and an onClick event handler.
 * @param {Object} props - The props for the component.
 * @param {Function} props.onClick - The event handler for the button click.
 * @param {string} props.text - The text to display on the button.
 * @return {JSX.Element} The SubmitButton component.
 */
const SubmitButton = ({ onClick, text }) => <button type="submit" onClick={onClick}>{text}</button>;

export default SubmitButton;
