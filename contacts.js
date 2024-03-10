import { nanoid } from "nanoid";

import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = (contacts) =>
	fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
	const contactsList = await fs.readFile(contactsPath);

	return JSON.parse(contactsList);
}

export async function getContactById(contactId) {
	const contacts = await listContacts();
	const result = contacts.find((item) => item.id === contactId);

	return result || null;
}

export async function removeContact(contactId) {
	const contacts = await listContacts();
	const contactIndex = contacts.findIndex((item) => item.id === contactId);
	if (contactIndex === -1) {
		return null;
	}
	const [deletedContact] = contacts.splice(contactIndex, 1);
	await updateContacts(contacts);

	return deletedContact;
}

export async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};

	contacts.push(newContact);
	await updateContacts(contacts);

	return newContact;
}
