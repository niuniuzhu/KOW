export class Token {
	value?: number;
	type: string;
}

export enum TokenizerStates {
	Started = 1,
	ParsingNumber = 2,
	ParsingFunction = 3,
	Finished = 4,
	ParsingContext = 5,
	Error = 6,
	ParsingBracket = 7
}
enum KnownStringComponents {
	Delimiter = 1,
	Digit = 2,
	Bracket = 3,
	Other = 4,
	ContextBracket = 5
}

var tokenStateMachine: any = {};
tokenStateMachine[TokenizerStates.Started] = {
	1: TokenizerStates.Started,
	2: TokenizerStates.ParsingNumber,
	3: TokenizerStates.ParsingBracket,
	4: TokenizerStates.ParsingFunction,
	5: TokenizerStates.ParsingContext
};
tokenStateMachine[TokenizerStates.ParsingNumber] = {
	1: TokenizerStates.Finished,
	2: TokenizerStates.ParsingNumber,
	3: TokenizerStates.Finished,
	4: TokenizerStates.Finished,
	5: TokenizerStates.Error
};
tokenStateMachine[TokenizerStates.ParsingFunction] = {
	1: TokenizerStates.Finished,
	2: TokenizerStates.ParsingFunction,
	3: TokenizerStates.Finished,
	4: TokenizerStates.ParsingFunction,
	5: TokenizerStates.Error
};
tokenStateMachine[TokenizerStates.ParsingBracket] = {
	1: TokenizerStates.Finished,
	2: TokenizerStates.Finished,
	3: TokenizerStates.Finished,
	4: TokenizerStates.Finished,
	5: TokenizerStates.Finished
};
tokenStateMachine[TokenizerStates.ParsingContext] = {
	1: TokenizerStates.Finished,
	2: TokenizerStates.ParsingContext,
	3: TokenizerStates.Finished,
	4: TokenizerStates.ParsingContext,
	5: TokenizerStates.ParsingContext
};

export class ExpressionEvaluator {
	static operations = {
		"+": {
			priority: 0,
			function: (a, b) => a! + b!
		},
		"-": {
			priority: 0,
			function: (a, b) => a! - b!
		},
		"*": {
			priority: 1,
			function: (a, b) => a! * b!
		},
		"/": {
			priority: 1,
			function: (a, b) => a! / b!
		},
		"%": {
			priority: 1,
			function: (a, b) => a! % b!
		},
		or: {
			priority: 0,
			function: (a, b) => a || b
		},
		and: {
			priority: 1,
			function: (a, b) => a && b
		},
		"!": {
			priority: 2,
			function: a => !a
		},
		true: {
			priority: 100,
			function: () => true
		},
		false: {
			priority: 100,
			function: () => false
		},
		$$getContextValue: {
			priority: 100,
			function: (contextPropertyName: string, context: any) => {
				var propertyName = contextPropertyName!.substring(
					1,
					contextPropertyName.length - 1
				);
				return context[propertyName];
			}
		}
	};
	private static digits = "0123456789.";
	private static brackets = "()";
	private static contextBrackets = "{}";
	private static delimeters = " ,\r\r\n";

	private context: any = {};

	private isOfMoreOrEqualPriority(currentOp: string, otherOp: string): boolean {
		return (
			ExpressionEvaluator.operations[currentOp].priority <=
			ExpressionEvaluator.operations[otherOp].priority
		);
	}

	classifySymbol(symbol: string): KnownStringComponents {
		if (ExpressionEvaluator.delimeters.indexOf(symbol) !== -1) {
			return KnownStringComponents.Delimiter;
		} else if (ExpressionEvaluator.brackets.indexOf(symbol) !== -1) {
			return KnownStringComponents.Bracket;
		} else if (ExpressionEvaluator.digits.indexOf(symbol) !== -1) {
			return KnownStringComponents.Digit;
		} else if (ExpressionEvaluator.contextBrackets.indexOf(symbol) !== -1) {
			return KnownStringComponents.ContextBracket;
		}
		return KnownStringComponents.Other;
	}

	scanToken(str: string, start: number) {
		var state: TokenizerStates = TokenizerStates.Started;
		var workingState = TokenizerStates.Error;
		var tokenString = "";
		var i = start;
		while (
			i < str.length &&
			(state !== TokenizerStates.Finished && state !== TokenizerStates.Error)
		) {
			var symbolClass = this.classifySymbol(str[i]);
			state = tokenStateMachine[state][symbolClass];
			if (
				state === TokenizerStates.ParsingFunction &&
				ExpressionEvaluator.operations[tokenString] !== undefined
			) {
				state = TokenizerStates.Finished;
			}
			if (
				state === TokenizerStates.ParsingFunction ||
				state === TokenizerStates.ParsingNumber ||
				state === TokenizerStates.ParsingBracket ||
				state === TokenizerStates.ParsingContext
			) {
				workingState = state;
				tokenString += str[i++];
			} else if (state === TokenizerStates.Started) {
				i++;
			}
		}
		if (tokenString === "") {
			workingState = TokenizerStates.Error;
		}
		return {
			workingState,
			tokenString,
			pos: i
		};
	}

	tokenize(expression: string): Array<Token> {
		var tokens: Array<Token> = [];
		for (var i = 0; i < expression.length;) {
			var tokenCandidate = this.scanToken(expression, i);
			if (tokenCandidate.workingState !== TokenizerStates.Error) {
				if (tokenCandidate.workingState === TokenizerStates.ParsingNumber) {
					tokens.push({
						type: "n",
						value:
							tokenCandidate.tokenString.indexOf(".") !== -1
								? parseFloat(tokenCandidate.tokenString)
								: parseInt(tokenCandidate.tokenString)
					});
				} else if (
					tokenCandidate.workingState === TokenizerStates.ParsingContext
				) {
					tokens.push({
						type: "$$getContextValue"
					});
					tokens.push({
						type: "n",
						value: <any>tokenCandidate.tokenString
					});
					tokens.push({
						type: "n",
						value: this.context
					});
				} else {
					tokens.push({
						type: tokenCandidate.tokenString
					});
				}
			}
			i = tokenCandidate.pos;
		}
		return tokens;
	}

	convertToRPN(tokens: Array<Token>): Array<Token> {
		var stack: Array<Token> = [];
		var rpn: Array<Token> = [];
		var currToken;

		var j = 0;
		for (var i = 0; i < tokens.length; i++) {
			if (tokens[i].type === "n") {
				rpn[j++] = tokens[i];
				continue;
			}
			if (tokens[i].type === "(") {
				stack.push(tokens[i]);
				continue;
			}
			if (tokens[i].type === ")") {
				do {
					currToken = stack.pop();
					rpn[j++] = currToken;
				} while (rpn[j - 1].type !== "(");
				j--;
				continue;
			}
			if (
				Object.keys(ExpressionEvaluator.operations).indexOf(tokens[i].type) !==
				-1
			) {
				if (stack.length > 0) {
					do {
						currToken = stack.pop();
						rpn[j++] = currToken;
					} while (
						stack.length > 0 &&
						ExpressionEvaluator.brackets.indexOf(rpn[j - 1].type) === -1 &&
						this.isOfMoreOrEqualPriority(tokens[i].type, rpn[j - 1].type)
					);
					if (
						ExpressionEvaluator.brackets.indexOf(rpn[j - 1].type) !== -1 ||
						!this.isOfMoreOrEqualPriority(tokens[i].type, rpn[j - 1].type)
					) {
						stack.push(currToken);
						j--;
					}
				}
				stack.push(tokens[i]);
				continue;
			}
		}
		while (stack.length > 0) {
			currToken = stack.pop();
			rpn[j++] = currToken;
		}
		return rpn;
	}

	calculateRPN(rpn: Array<Token>): number {
		var operands: Array<Token> = [];

		if (rpn.length === 0) {
			return undefined;
		}

		for (var i = 0; i < rpn.length; i++) {
			if (rpn[i].type === "n") {
				operands.push(rpn[i]);
			} else {
				var func = ExpressionEvaluator.operations[rpn[i].type].function;
				var args = operands
					.splice(operands.length - func.length)
					.map(op => op.value);
				operands.push({
					type: "n",
					value: func(...args)
				});
			}
		}
		var resultToken = operands.shift();
		return resultToken.value;
	}

	evaluate(expression: string, context = {}) {
		this.context = context;
		return this.calculateRPN(this.convertToRPN(this.tokenize(expression)));
	}
}