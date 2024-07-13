import React from "react";
import ReactDOM from "react-dom/client";
import { configure } from "mobx";
import App from "./App.jsx";
import "./index.css";

//#region MobX Configuration
/**
 * Configuration for MobX copied {@link https://mobx.js.org/configuration.html#linting-options|directly} from their documentation;
 *
 * This tells MobX to {@link https://forum.wordreference.com/attachments/cover-003_1024x1024-jpg.82315/|"lint"} in a more strict manner.
 *
 * @see also {@link https://github.com/mobxjs/mobx/blob/main/packages/eslint-plugin-mobx/README.md|their ESLint plugin}
 */
function configureMobX() {
	configure({
		enforceActions: "always",
		computedRequiresReaction: true,
		reactionRequiresObservable: true,
		observableRequiresReaction: true,
		disableErrorBoundaries: true,
	});
}
configureMobX(); // Like the `createRoot` call below, this is only called once, before the first render.
//#endregion

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
