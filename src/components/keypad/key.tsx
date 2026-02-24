import { ReactNode, MouseEvent } from "react";
import { match } from "ts-pattern";

import { useCalculator } from "#/state";

/*****************************************************************************/

export type RawKeyProps<O extends string = never> = Omit<
	{
		label: ReactNode;
		onClick: () => void;
		tint?: "key-base" | "red" | "blue-light" | "blue-mid" | "blue-dark";
		className?: any;
	},
	O
>;

export function RawKey({ onClick: propsOnClick, tint = "key-base", label, className }: RawKeyProps) {
	const { buffer } = useCalculator();

	function onMouseDown(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		buffer.ref.current?.focus();
	}

	return (
		<button
			x={[
				"h-12 key",
				"rounded-sm border border-border text-2xl",
				[
					"active:scale-[0.97]",
					match(tint)
						.with("key-base", () => "bg-key-base text-grey-800")
						.with("blue-dark", () => "bg-blue-dark text-white")
						.with("blue-mid", () => "bg-blue-mid text-grey-800")
						.with("blue-light", () => "bg-blue-operator text-grey-800")
						.with("red", () => "bg-red text-white")
						.exhaustive(),
				],
				className,
			]}
			onClick={propsOnClick}
			onMouseDown={onMouseDown}
		>
			{label}
		</button>
	);
}

/*****************************************************************************/

type BasicKeyProps = RawKeyProps<"onClick" | "label"> & { input: string; label?: ReactNode };

export function BasicKey({ input, label = input, className, ...props }: BasicKeyProps) {
	const { buffer } = useCalculator();

	function onClick() {
		buffer.input.key(input);
	}

	return <RawKey label={label} onClick={onClick} className={className} {...props} />;
}

/*****************************************************************************/

type FunctionKeyProps = RawKeyProps<"onClick" | "label"> & { name: string };

export function FunctionKey({ name, ...props }: FunctionKeyProps) {
	const { buffer } = useCalculator();

	function onClick() {
		buffer.input.func(name);
	}

	return <RawKey label={name} onClick={onClick} {...props} />;
}

/*****************************************************************************/

type OperatorKeyProps = RawKeyProps<"onClick" | "label"> & { symbol: string };

export function OperatorKey({ symbol, className, ...props }: OperatorKeyProps) {
	const { buffer } = useCalculator();

	function onClick() {
		buffer.input.oper(symbol);
	}

	return <RawKey label={symbol} onClick={onClick} className={className} {...props} />;
}
