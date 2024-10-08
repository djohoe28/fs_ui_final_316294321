import { observer } from "mobx-react";

/**
 * This component is used to dereference object values as late as possible.
 *
 * This way, we "postpone" using {@link observer} components in the app, leading to less re-renders.
 *
 * @see https://mobx.js.org/react-optimizations.html#function-props-
 */
const ImageDisplay = observer(function ImageDisplay({ getSrc, getAlt }) {
	return <img src={getSrc()} alt={getAlt()} />;
});

export default ImageDisplay;
