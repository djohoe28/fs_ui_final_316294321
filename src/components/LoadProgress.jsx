import { observer } from "mobx-react";

/**
 * This component is used to dereference object values as late as possible.
 *
 * This way, we "postpone" using {@link observer} components in the app, leading to less re-renders.
 *
 * @see https://mobx.js.org/react-optimizations.html#function-props-
 */
const LoadProgress = observer(function LoadProgress({ getValue, getMax }) {
	const value = getValue();
	const max = getMax();
	const progress = Math.round(100 * value / max);
	const hidden = value >= max; // HACK: We could use CSS instead, but I figured this'd be more performant.
	return hidden ? <></> : <div className="load-progress">
		<span>{value}/{max}</span>
		<progress value={value} max={max} />
		<span>{progress}%</span>
	</div>;
});

export default LoadProgress;
