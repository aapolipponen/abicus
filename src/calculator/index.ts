import Decimal from "decimal.js";
import { ok } from "neverthrow";

import evaluate from "./internal/evaluator";
import tokenise from "./internal/tokeniser";

export type { Token, TokenId } from "./internal/tokeniser";
export { tokenise, evaluate };

export type AngleUnit = "deg" | "rad";

export function calculate(expression: string, ans: Decimal, ind: Decimal, angleUnit: AngleUnit) {
	// This could be a one-liner with neverthrow's `andThen` but we want to
	// jump out of neverthrow-land for React anyhow soon

	const tokens = tokenise(expression);
	if (tokens.isErr()) return tokens;

	const result = evaluate(tokens.value, ans, ind, angleUnit);
	if (result.isErr()) return result;

	return ok(result.value);
}
