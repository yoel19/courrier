import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getIncomingMails(query) {
    await fakeNetwork(`getIncomingMails:${query}`);
    let incomingMails = await localforage.getItem("incomingMails");
    if (!incomingMails) incomingMails = [];
    if (query) {
        incomingMails = matchSorter(incomingMails, query, { keys: ["first", "last"] });
    }
    return incomingMails.sort(sortBy("last", "createdAt"));
}

export async function createIncomingMail() {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let incomingMail = { id, createdAt: Date.now() };
    let incomingMails = await getIncomingMails();
    incomingMails.unshift(incomingMail);
    await set(incomingMails);
    return incomingMail;
}

export async function getIncomingMail(id) {
    await fakeNetwork(`incomingMail:${id}`);
    let incomingMails = await localforage.getItem("incomingMails");
    let incomingMail = incomingMails.find(incomingMail => incomingMail.id === id);
    return incomingMail ?? null;
}

export async function updateIncomingMail(id, updates) {
    await fakeNetwork();
    let incomingMails = await localforage.getItem("incomingMails");
    let incomingMail = incomingMails.find(incomingMail => incomingMail.id === id);
    if (!incomingMail) throw new Error("No incomingMail found for", id);
    Object.assign(incomingMail, updates);
    await set(incomingMails);
    return incomingMail;
}

export async function deleteIncomingMail(id) {
    let incomingMails = await localforage.getItem("incomingMails");
    let index = incomingMails.findIndex(incomingMail => incomingMail.id === id);
    if (index > -1) {
        incomingMails.splice(index, 1);
        await set(incomingMails);
        return true;
    }
    return false;
}

function set(incomingMails) {
    return localforage.setItem("incomingMails", incomingMails);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise(res => {
        setTimeout(res, Math.random() * 800);
    });
}