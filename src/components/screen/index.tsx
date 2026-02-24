import { useCalculator } from "#/state";
import { formatResult } from "#/utils/format-result";

import Input from "./input";
import RadDegToggle from "./rad-deg-toggle";
import ErrorIcon from "./error-icon";

const INPUT_ID = "calc-expression";

export default function Screen() {
	const { buffer, memory } = useCalculator();
	const shouldShowOutput = !buffer.isDirty && !buffer.isErr;
	const formattedOutput = formatResult(memory.ans);

	return (
		<div
			x={[
				"relative",
				"min-h-32",
				"text-xl",
				"bg-white",
				"rounded-md overflow-hidden",
				"border border-border shadow-sm",
				"has-focus:border-transparent has-focus:ring-2 has-focus:ring-blue-border",
				"flex flex-col justify-end",
			]}
		>
			<RadDegToggle />
			<ErrorIcon />
			<div x="flex-1 min-h-0" aria-hidden />
			<Input inputId={INPUT_ID} />
			{shouldShowOutput && (
				<div
					x={[
						"flex items-center justify-between",
						"px-4 py-1",
						"border-t border-border",
						"text-2xl",
					]}
				>
					<span x="text-grey-700">=</span>
					<output htmlFor={INPUT_ID}>{formattedOutput}</output>
				</div>
			)}
		</div>
	);
}
