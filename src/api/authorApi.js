import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveAuthor(author) {
  return fetch(baseUrl + (author.id || ""), {
    method: author.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(author),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAuthor(authorId) {
  return fetch(baseUrl + authorId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

export function getAuthorById(Id) {
  return (
    fetch(baseUrl + "?id=" + Id)
      //when the async call is complete : 'then'is called
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok.");
        return response.json().then((author) => {
          if (author.length !== 1) throw new Error("Author not found: " + Id);
          return author[0]; // should only find one author for a given Id, so return it.
        });
      })
      .catch(handleError)
  );
}
