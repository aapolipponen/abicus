import { useCalculator } from "#/state";

export default function RadDegToggle() {
	const { angleUnit, degsOn, radsOn } = useCalculator();

	return (
		<div
			role="radiogroup"
			aria-label="Angle unit"
			x={[
				"absolute top-1 left-1 z-10",
				"h-9 w-fit",
				"border border-border",
				"divide-x divide-border",
				"rounded-md overflow-hidden",
				"flex items-center",
			]}
		>
			<button
				role="radio"
				onClick={radsOn}
				aria-checked={angleUnit === "rad"}
				aria-label="Radians"
				x={[
					"text-[15px] key font-medium",
					"h-full px-3",
					"transition-all",
					angleUnit === "rad"
						? "bg-blue-mid text-grey-800 cursor-default"
						: "bg-white text-grey-700 cursor-pointer",
				]}
			>
				Rad
			</button>
			<button
				role="radio"
				onClick={degsOn}
				aria-checked={angleUnit === "deg"}
				aria-label="Degrees"
				x={[
					"text-[15px] key font-medium",
					"h-full px-3",
					"transition-all",
					angleUnit === "deg"
						? "bg-blue-mid text-grey-800 cursor-default"
						: "bg-white text-grey-700 cursor-pointer",
				]}
			>
				Deg
			</button>
		</div>
	);
}
