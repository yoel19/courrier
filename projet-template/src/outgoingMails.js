import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getOutgoingMails(query) {
    await fakeNetwork(`getOutgoingMails:${query}`);
    let outgoingMails = await localforage.getItem("outgoingMails");
    if (!outgoingMails) outgoingMails = [];
    if (query) {
        outgoingMails = matchSorter(outgoingMails, query, { keys: ["first", "last"] });
    }
    return outgoingMails.sort(sortBy("last", "createdAt"));
}

export async function createOutgoingMail() {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let outgoingMail = { id, createdAt: Date.now() };
    let outgoingMails = await getOutgoingMails();
    outgoingMails.unshift(outgoingMail);
    await set(outgoingMails);
    return outgoingMail;
}

export async function getOutgoingMail(id) {
    await fakeNetwork(`outgoingMail:${id}`);
    let outgoingMails = await localforage.getItem("outgoingMails");
    let outgoingMail = outgoingMails.find(outgoingMail => outgoingMail.id === id);
    return outgoingMail ?? null;
}

export async function updateOutgoingMail(id, updates) {
    await fakeNetwork();
    let outgoingMails = await localforage.getItem("outgoingMails");
    let outgoingMail = outgoingMails.find(outgoingMail => outgoingMail.id === id);
    if (!outgoingMail) throw new Error("No outgoingMail found for", id);
    Object.assign(outgoingMail, updates);
    await set(outgoingMails);
    return outgoingMail;
}

export async function deleteOutgoingMail(id) {
    let outgoingMails = await localforage.getItem("outgoingMails");
    let index = outgoingMails.findIndex(outgoingMail => outgoingMail.id === id);
    if (index > -1) {
        outgoingMails.splice(index, 1);
        await set(outgoingMails);
        return true;
    }
    return false;
}

function set(outgoingMails) {
    return localforage.setItem("outgoingMails", outgoingMails);
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