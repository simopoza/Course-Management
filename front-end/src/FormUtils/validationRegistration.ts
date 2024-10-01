// src/validation.ts

export const validateFullName = (fullName: string) => {
	const words = fullName.trim().split(/\s+/);
	return words.length >= 2 && words.every((word) => word.length > 0);
};

export const validateEmail = (email: string) => {
	return /\S+@\S+\.\S+/.test(email);
};

export const validatePassword = (password: string) => {
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	const hasNumber = /\d/.test(password);
	const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
	const isLengthValid = password.length >= 8;

	let errorMessages = [];

	if (!hasUpperCase) errorMessages.push("an uppercase letter");
	if (!hasLowerCase) errorMessages.push("a lowercase letter");
	if (!hasNumber) errorMessages.push("a number");
	if (!hasSpecialChar) errorMessages.push("a special character");
	if (!isLengthValid) errorMessages.push("at least 8 characters long");

	if (errorMessages.length > 0) {
		return `Your password must have ${errorMessages.join(", ")}.`;
	}

	return ""; // No error
};
