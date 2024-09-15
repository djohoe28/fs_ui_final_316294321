/**
 * ResetButton component.
 *
 * @description This component displays a reset button with a given text and an onClick event handler.
 * @param {Object} props - The props for the component.
 * @param {Function} props.onClick - The event handler for the button click.
 * @param {string} props.text - The text to display on the button.
 * @return {JSX.Element} The ResetButton component.
 */
const ResetButton = ({ onClick, text }) => <button type="reset" onClick={onClick}>{text}</button>;

export default ResetButton;
